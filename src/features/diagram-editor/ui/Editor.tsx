import {
  ReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  useStoreApi,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type Connection,
} from "@xyflow/react";
import { useCallback, useMemo, useRef } from "react";

import { useSelection } from "../hooks/useSelection";
import { useContextMenus } from "../hooks/useContextMenus";
import { useEditorHotkeys } from "../hooks/useEditorHotkeys";
import { useReactFlowDnD } from "../hooks/useReactFlowDnD";
import { useConnections } from "../hooks/useConnections";
import {
  useEditorStore,
  type EditorColor,
  type NominalVoltage,
} from "../store/useEditorStore";
import { nodeTypes } from "../lib/nodeTypes";
import { edgeTypes } from "../lib/edgeTypes";
import NodeContextMenu from "../contextMenus/NodeContextMenu";
import SelectionContextMenu from "../contextMenus/SelectionContextMenu";
import TextNodeContextMenu from "../contextMenus/TextNodeContextMenu";
import SideBar from "./Sidebar";
import { useCopyPaste } from "../hooks/useCopyPaste";
import ColoredConnectionLine from "../customEdges/ColoredConnectionLine";
import { Toaster } from "sonner";
import Spinner from "../../shared/ui/Spinner";
import { RING_META_BY_NODETYPE } from "../lib/ringMeta";

// ✅ добавили
import { useSchemasQuery } from "../../../api/tanstack/schemas";

const MIN_DISTANCE = 150;
const TEMP_CLASS = "temp-proximity";

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// ✅ маленький нормализатор: поддерживаем разные форматы ответа
type AnySchema = {
  id: string;
  name?: string;
  title?: string;
  slug?: string;
  archived?: boolean;
  isArchived?: boolean;
};

function normalizeSchemas(input: any): AnySchema[] {
  if (!input) return [];
  if (Array.isArray(input)) return input as AnySchema[];
  if (Array.isArray(input.items)) return input.items as AnySchema[];
  if (Array.isArray(input.schemas)) return input.schemas as AnySchema[];
  if (Array.isArray(input.data)) return input.data as AnySchema[];
  return [];
}

export default function Editor({ isFetchingSchema = false }: { isFetchingSchema?: boolean }) {
  const store = useStoreApi();
  const { screenToFlowPosition, getInternalNode } = useReactFlow();

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const schema = useEditorStore((s) => s.schema);
  const nodes = useMemo(
    () => (Array.isArray(schema?.nodes) ? (schema.nodes as Node[]) : []),
    [schema]
  );
  const edges = useMemo(
    () => (Array.isArray(schema?.edges) ? (schema.edges as Edge[]) : []),
    [schema]
  );
  const viewport = schema?.viewport;

  const isEditing = useEditorStore((s) => s.isEditing);
  const setNodes = useEditorStore((s) => s.setNodes);
  const setEdges = useEditorStore((s) => s.setEdges);
  const setViewport = useEditorStore((s) => s.setViewport);

  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const deleteNode = useEditorStore((s) => s.deleteNode);
  const deleteSelected = useEditorStore((s) => s.deleteSelected);

  const busColor = useEditorStore((s) => s.busColor);
  const edgeColor = useEditorStore((s) => s.edgeColor);
  const edgeDrawType = useEditorStore((s) => s.edgeDrawType);
  const applyPowerPropagation = useEditorStore((s) => s.applyPowerPropagation);

  const { selection, hasSelection, onSelectionChange } = useSelection();

  useCopyPaste({
    nodes,
    edges,
    selection,
    isEditing,
    setNodes,
    setEdges,
    screenToFlowPosition,
    canvasRef,
    applyPowerPropagation,
  });

  const {
    ctx,
    setCtx,
    selMenu,
    setSelMenu,
    ctxNode,
    closeAll,
    onNodeContextMenu,
    onPaneContextMenu,
  } = useContextMenus(nodes, hasSelection, canvasRef);

  useEditorHotkeys({
    selection,
    deleteSelected,
    closeMenus: closeAll,
    applyPowerPropagation,
  });

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      const next = applyNodeChanges(changes, nodes);
      setNodes(next);
      queueMicrotask(applyPowerPropagation);
    },
    [nodes, setNodes, applyPowerPropagation]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      const next = applyEdgeChanges(changes, edges);
      setEdges(next);
      queueMicrotask(applyPowerPropagation);
    },
    [edges, setEdges, applyPowerPropagation]
  );

  const { onConnect } = useConnections({
    nodes,
    edges,
    setEdges,
    edgeColor,
    edgeDrawType,
    applyPowerPropagation,
  });

  const { onDragOver, onDrop } = useReactFlowDnD({
    screenToFlowPosition,
    nodes,
    setNodes,
    nodeTypes,
    busColor,
    applyPowerPropagation,
  });

  const { data: schemas } = useSchemasQuery(); 

  const availableSchemas = useMemo(() => {
    return (schemas ?? [])
      .filter((s) => !(s.is_archived ?? false) && !s.archived_at)
      .map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
      }));
  }, [schemas]);

  // derived props для меню
  const appliedColor = ((ctxNode?.data as any)?.color ??
    undefined) as EditorColor | undefined;
  const colorDraft = (((ctxNode?.data as any)?.colorDraft ??
    appliedColor ??
    "#4242A0") as EditorColor);
  const canClearColor = Boolean(appliedColor);

  const ctxVoltage = (((ctxNode?.data as any)?.voltage ?? "10") as NominalVoltage);
  const dispatcherName = String(((ctxNode?.data as any)?.dispatcherName ?? ""));
  const equipmentModel = String(((ctxNode?.data as any)?.equipmentModel ?? ""));
  const status = (((ctxNode?.data as any)?.status ?? "on") as "on" | "off" | "alarm");

  const rotation = Number(((ctxNode?.data as any)?.rotation ?? 0)) || 0;
  const normalized = ((rotation % 360) + 360) % 360;

  /**
   * Находим "кандидат на связь" — ближайшую ноду к текущей.
   * Берём absolute позицию из internals (как в демо).
   */
  const getClosestProximityEdge = useCallback(
    (draggedNode: Node) => {
      const state = store.getState();
      const lookup = state.nodeLookup;

      const internalDragged = getInternalNode(draggedNode.id);
      if (!internalDragged) return null;

      const draggedAbs = internalDragged.internals.positionAbsolute;

      let bestNode: any = null;
      let bestDist = Number.MAX_VALUE;

      for (const n of lookup.values()) {
        if (n.id === internalDragged.id) continue;

        const abs = n.internals.positionAbsolute;
        const d = dist(draggedAbs, abs);

        if (d < bestDist && d < MIN_DISTANCE) {
          bestDist = d;
          bestNode = n;
        }
      }

      if (!bestNode) return null;

      const closeNodeIsSource =
        bestNode.internals.positionAbsolute.x < draggedAbs.x;

      const source = closeNodeIsSource ? bestNode.id : draggedNode.id;
      const target = closeNodeIsSource ? draggedNode.id : bestNode.id;

      const id = closeNodeIsSource
        ? `px_${bestNode.id}__${draggedNode.id}`
        : `px_${draggedNode.id}__${bestNode.id}`;

      return { id, source, target };
    },
    [store, getInternalNode]
  );

  const onConnectWrapped = useCallback(
    (params: Connection) => onConnect(params),
    [onConnect]
  );

  const nodeType = String(ctxNode?.type ?? "");
  const ringMeta = RING_META_BY_NODETYPE[nodeType] ?? [];

  const ringColors = (((ctxNode?.data as any)?.ringColors ?? {}) as Record<string, EditorColor | null>);
  const ringDrafts = (((ctxNode?.data as any)?.ringColorDrafts ?? {}) as Record<string, EditorColor>);

  const rings = ringMeta.map((m) => ({
    key: m.key,
    label: m.label,
    applied: ringColors[m.key] ?? null,
    draft: (ringDrafts[m.key] ?? ringColors[m.key] ?? (m.defaultColor as EditorColor)) as EditorColor,
  }));

  const linkedSchemaId = String(((ctxNode?.data as any)?.linkedSchemaId ?? ""));
  const isTriangle = nodeType === "TriangleNode";

  return (
    <div className="w-full h-screen flex">
      <Toaster/>

      <SideBar />

      <div
        ref={canvasRef}
        className="flex-1 relative overflow-hidden"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <ReactFlow
          nodes={nodes}   // ✅ safe
          edges={edges}   // ✅ safe
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectWrapped}
          onSelectionChange={onSelectionChange}
          onNodeContextMenu={onNodeContextMenu}
          onPaneContextMenu={onPaneContextMenu}
          defaultEdgeOptions={{
            type: edgeDrawType === "step" ? "coloredStep" : "coloredStraight",
            data: { width: 4, color: edgeColor },
          }}
          onPaneClick={closeAll}
          onMoveStart={closeAll}
          snapToGrid
          snapGrid={[4, 4]}
          minZoom={0.01}
          maxZoom={5}
          fitView
          defaultViewport={viewport ?? { x: 0, y: 0, zoom: 1 }}
          onMoveEnd={(_, vp) => setViewport(vp)}
          connectionLineComponent={(props) => (
            <ColoredConnectionLine {...props} color={edgeColor} width={4} />
          )}
        >
          {isEditing && <Background variant="lines" gap={21} />}
          <Controls />
        </ReactFlow>

        {isFetchingSchema && (
          <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-[#101828]/45 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-5 shadow-[0_18px_60px_rgba(0,0,0,.35)]">
              <Spinner />
              <div className="text-[11px] text-white/80">Загрузка схемы...</div>
            </div>
          </div>
        )}

        {ctx && ctxNode && ctxNode.type === "TextNode" && isEditing === true && (
          <TextNodeContextMenu
            x={ctx.x}
            y={ctx.y}
            text={String(((ctxNode.data as any)?.text ?? "Текст"))}
            width={Number(((ctxNode.data as any)?.width ?? 140))}
            height={Number(((ctxNode.data as any)?.height ?? 48))}
            fontSize={Number(((ctxNode.data as any)?.fontSize ?? 14))}
            bgColor={String(((ctxNode.data as any)?.bgColor ?? "#4242A0"))}
            textColor={String(((ctxNode.data as any)?.textColor ?? "#FFFFFF"))}
            onChangeText={(v) => updateNodeData(ctx.nodeId, { text: v })}
            onChangeWidth={(v) => updateNodeData(ctx.nodeId, { width: v })}
            onChangeHeight={(v) => updateNodeData(ctx.nodeId, { height: v })}
            onChangeFontSize={(v) => updateNodeData(ctx.nodeId, { fontSize: v })}
            onChangeBgColor={(v) => updateNodeData(ctx.nodeId, { bgColor: v })}
            onChangeTextColor={(v) => updateNodeData(ctx.nodeId, { textColor: v })}
            onDelete={() => {
              deleteNode(ctx.nodeId);
              setCtx(null);
              queueMicrotask(applyPowerPropagation);
            }}
            onRotate90={() => {
              const next = (((normalized + 90) % 360) as 0 | 90 | 180 | 270);
              updateNodeData(ctx.nodeId, { rotation: next });
            }}
            onClose={() => setCtx(null)}
          />
        )}

        {ctx && ctxNode && ctxNode.type !== "TextNode" && isEditing === true && (
          <NodeContextMenu
            x={ctx.x}
            y={ctx.y}
            color={appliedColor}
            colorDraft={colorDraft}
            voltage={ctxVoltage}
            dispatcherName={dispatcherName}
            equipmentModel={equipmentModel}
            status={status}
            rings={rings}
            onChangeRingDraft={(ringKey, c) => {
              updateNodeData(ctx.nodeId, {
                ringColorDrafts: { ...(ringDrafts ?? {}), [ringKey]: c },
              });
            }}
            onApplyRingColor={(ringKey) => {
              const draft = (ringDrafts?.[ringKey] ?? "#4242A0") as EditorColor;
              updateNodeData(ctx.nodeId, {
                ringColors: { ...(ringColors ?? {}), [ringKey]: draft },
              });
            }}
            onClearRingColor={(ringKey) => {
              updateNodeData(ctx.nodeId, {
                ringColors: { ...(ringColors ?? {}), [ringKey]: null },
              });
            }}
            onChangeDispatcherName={(v) =>
              updateNodeData(ctx.nodeId, { dispatcherName: v })
            }
            onChangeEquipmentModel={(v) =>
              updateNodeData(ctx.nodeId, { equipmentModel: v })
            }
            onChangeStatus={(v) => {
              updateNodeData(ctx.nodeId, { status: v, forcedOff: false });
              queueMicrotask(applyPowerPropagation);
            }}
            onChangeColorDraft={(c) =>
              updateNodeData(ctx.nodeId, { colorDraft: c })
            }
            onClearColor={() => updateNodeData(ctx.nodeId, { color: null })}
            canClearColor={canClearColor}
            onApplyColor={() => updateNodeData(ctx.nodeId, { color: colorDraft })}
            onChangeVoltage={(v) => updateNodeData(ctx.nodeId, { voltage: v })}
            onDelete={() => {
              deleteNode(ctx.nodeId);
              setCtx(null);
              queueMicrotask(applyPowerPropagation);
            }}
            onClose={() => setCtx(null)}
            onRotate90={() => {
              const next = (((normalized + 90) % 360) as 0 | 90 | 180 | 270);
              updateNodeData(ctx.nodeId, { rotation: next });
            }}

            // ✅ НОВОЕ: только для TriangleNode
            isTriangle={isTriangle}
            schemaOptions={availableSchemas}
            linkedSchemaId={linkedSchemaId}
            onChangeLinkedSchema={(schemaId) => {
              if (!schemaId) {
                updateNodeData(ctx.nodeId, {
                  linkedSchemaId: null,
                  linkedSchemaSlug: null,
                  linkedSchemaName: null,
                });
                return;
              }

              const found = availableSchemas.find((s) => s.id === schemaId);

              updateNodeData(ctx.nodeId, {
                linkedSchemaId: schemaId,                 // ✅ ID
                linkedSchemaSlug: found?.slug ?? null,    // опционально
                linkedSchemaName: found?.name ?? null,    // опционально
              });
            }}
          />
        )}

        {selMenu && isEditing === true && (
          <SelectionContextMenu
            x={selMenu.x}
            y={selMenu.y}
            hasSelection={hasSelection}
            onDelete={() => {
              deleteSelected(selection.nodeIds, selection.edgeIds);
              setSelMenu(null);
              queueMicrotask(applyPowerPropagation);
            }}
            onClose={() => setSelMenu(null)}
          />
        )}
      </div>
    </div>
  );
}