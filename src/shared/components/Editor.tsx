// Editor.tsx
import {
  ReactFlow,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type NodeMouseHandler,
  type OnSelectionChangeFunc,
  Background,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import SideBar from "./SideBar";
import makeId from "../utils/makeId";
import { nodeTypes } from "../utils/nodeTypes";
import NodeContextMenu from "./NodeContextMenu";
import SelectionContextMenu from "./SelectionContextMenu";
import {
  useEditorStore,
  type EditorColor,
  type NominalVoltage,
} from "../store/useEditorStore";
import { edgeTypes } from "../utils/edgeTypes";
import TextNodeContextMenu from "./TextNodeContextMenu";

type DnDPayload = { nodeType: string; data?: Record<string, any> };

function safeParseDnD(raw: string): DnDPayload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DnDPayload;
    return parsed?.nodeType ? parsed : null;
  } catch {
    return null;
  }
}

type CtxState =
  | null
  | {
      nodeId: string;
      x: number;
      y: number;
    };

export default function Editor() {
  const { screenToFlowPosition } = useReactFlow();

  const { nodes, edges, viewport } = useEditorStore((s) => s.schema);

  const isEditing = useEditorStore((s) => s.isEditing);
  const setNodes = useEditorStore((s) => s.setNodes);
  const setEdges = useEditorStore((s) => s.setEdges);
  const setViewport = useEditorStore((s) => s.setViewport);

  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const deleteNode = useEditorStore((s) => s.deleteNode);
  const deleteSelected = useEditorStore((s) => s.deleteSelected);

  // нужен для BusNode на DnD
  const busColor = useEditorStore((s) => s.busColor);

  // активный цвет связи (выбирается в SideBar)
  const edgeColor = useEditorStore((s) => s.edgeColor);

  // ✅ новая логика распространения питания/статусов
  const applyPowerPropagation = useEditorStore((s) => s.applyPowerPropagation);

  // контекстное меню ноды
  const [ctx, setCtx] = useState<CtxState>(null);

  // меню выделения по ПКМ на пустоте
  const [selMenu, setSelMenu] = useState<null | { x: number; y: number }>(null);

  // выделение (ноды/эджи)
  const [selection, setSelection] = useState<{ nodeIds: string[]; edgeIds: string[] }>({
    nodeIds: [],
    edgeIds: [],
  });

  const onSelectionChange: OnSelectionChangeFunc = useCallback(({ nodes, edges }) => {
    setSelection({
      nodeIds: nodes.map((n) => n.id),
      edgeIds: edges.map((e) => e.id),
    });
  }, []);

  const hasSelection = useMemo(
    () => selection.nodeIds.length > 0 || selection.edgeIds.length > 0,
    [selection]
  );

  // Delete/Backspace
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;

      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (!selection.nodeIds.length && !selection.edgeIds.length) return;

      e.preventDefault();

      deleteSelected(selection.nodeIds, selection.edgeIds);
      setCtx(null);
      setSelMenu(null);

      queueMicrotask(applyPowerPropagation);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selection, deleteSelected, applyPowerPropagation]);

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

  // ✅ создание связи текущим edgeColor (с приоритетом BusNode)
  const onConnect = useCallback(
    (params: Connection) => {
      let color: EditorColor = edgeColor;

      const sourceNode = nodes.find((n) => n.id === params.source);
      if (sourceNode?.type === "BusNode") {
        const c = (sourceNode.data as any)?.color as EditorColor | undefined;
        if (c) color = c;
      }

      setEdges(
        addEdge(
          {
            ...params,
            type: "coloredStep",
            data: { color, width: 4 },
          },
          edges
        )
      );

      queueMicrotask(applyPowerPropagation);
    },
    [edgeColor, nodes, edges, setEdges, applyPowerPropagation]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const payload = safeParseDnD(e.dataTransfer.getData("application/reactflow"));
      if (!payload) return;

      const type = payload.nodeType;
      if (!type) return;
      if (!(type in nodeTypes)) return;

      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const isBus = type === "BusNode" || type === "BusNodeVertical";

      setNodes([
        ...nodes,
        {
          id: makeId(),
          type,
          position,
          data: {
            status: "on", // ✅ дефолт у всех нод
            voltage: "10",
            colorDraft: "#4242A0",
            ...(payload.data ?? {}),
            ...(isBus ? { color: busColor } : {}),
          },
        },
      ]);

      queueMicrotask(applyPowerPropagation);
    },
    [nodes, setNodes, screenToFlowPosition, busColor, applyPowerPropagation]
  );

  // ПКМ по ноде
  const onNodeContextMenu: NodeMouseHandler = useCallback((event, node) => {
    event.preventDefault();
    event.stopPropagation();

    setSelMenu(null);

    setCtx({
      nodeId: node.id,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  // ПКМ по пустоте => меню “Удалить выделенное”
  const onPaneContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setCtx(null);

      if (!hasSelection) return;
      setSelMenu({ x: e.clientX, y: e.clientY });
    },
    [hasSelection]
  );

  const onPaneClick = useCallback(() => {
    setCtx(null);
    setSelMenu(null);
  }, []);

  const onMoveStart = useCallback(() => {
    setCtx(null);
    setSelMenu(null);
  }, []);

  const ctxNode = ctx ? nodes.find((n) => n.id === ctx.nodeId) ?? null : null;

  const appliedColor = ((ctxNode?.data as any)?.color ?? undefined) as EditorColor | undefined;
  const colorDraft = (((ctxNode?.data as any)?.colorDraft ??
    appliedColor ??
    "#4242A0") as EditorColor);

  const canClearColor = Boolean(appliedColor);
  const ctxVoltage = (((ctxNode?.data as any)?.voltage ?? "10") as NominalVoltage);
  const dispatcherName = String(((ctxNode?.data as any)?.dispatcherName ?? ""));
  const equipmentModel = String(((ctxNode?.data as any)?.equipmentModel ?? ""));
  const status = (((ctxNode?.data as any)?.status ?? "on") as "on" | "off" | "alarm"); // ✅ дефолт on

  return (
    <div className="w-full h-screen flex">
      <SideBar />

      <div className="flex-1" onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          onNodeContextMenu={onNodeContextMenu}
          onPaneContextMenu={onPaneContextMenu}
          defaultEdgeOptions={{
            type: "coloredStep",
            data: { width: 4, color: edgeColor },
          }}
          onPaneClick={onPaneClick}
          onMoveStart={onMoveStart}
          snapToGrid
          snapGrid={[7, 7]}
          fitView
          defaultViewport={viewport ?? { x: 0, y: 0, zoom: 1 }}
          onMoveEnd={(_, vp) => setViewport(vp)}
        >
          {isEditing && <Background variant="lines" gap={21} />}
          <Controls />
        </ReactFlow>

        {/* TextNode menu */}
        {ctx && ctxNode && ctxNode.type === "TextNode" && (
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
            onClose={() => setCtx(null)}
          />
        )}

        {/* Node menu */}
        {ctx && ctxNode && ctxNode.type !== "TextNode" && (
          <NodeContextMenu
            x={ctx.x}
            y={ctx.y}
            color={appliedColor}
            colorDraft={colorDraft}
            voltage={ctxVoltage}
            dispatcherName={dispatcherName}
            equipmentModel={equipmentModel}
            status={status}
            onChangeDispatcherName={(v) => updateNodeData(ctx.nodeId, { dispatcherName: v })}
            onChangeEquipmentModel={(v) => updateNodeData(ctx.nodeId, { equipmentModel: v })}
            onChangeStatus={(v) => {
              // ручное изменение => forcedOff сбрасываем
              updateNodeData(ctx.nodeId, { status: v, forcedOff: false });
              queueMicrotask(applyPowerPropagation);
            }}
            onChangeColorDraft={(c) => updateNodeData(ctx.nodeId, { colorDraft: c })}
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
          />
        )}

        {/* Selection menu */}
        {selMenu && (
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