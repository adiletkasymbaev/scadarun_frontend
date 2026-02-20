import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Edge, Node } from "@xyflow/react";

type Selection = { nodeIds: string[]; edgeIds: string[] };

type ClipboardPayload = {
  nodes: Node[];
  edges: Edge[];
  // точка-опора, чтобы вставлять “как блок”
  origin: { x: number; y: number };
};

function isEditableTarget(el: EventTarget | null) {
  const tag = (el as HTMLElement | null)?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || (el as HTMLElement | null)?.isContentEditable;
}

function makeId(prefix = "n") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function useCopyPaste(args: {
  nodes: Node[];
  edges: Edge[];
  selection: Selection;

  isEditing: boolean;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  // чтобы вставлять в координатах flow
  screenToFlowPosition: (pt: { x: number; y: number }) => { x: number; y: number };

  // чтобы уметь вставлять в центр экрана, если курсора нет
  canvasRef: React.RefObject<HTMLElement | null>;

  applyPowerPropagation: () => void;
}) {
  const {
    nodes,
    edges,
    selection,
    isEditing,
    setNodes,
    setEdges,
    screenToFlowPosition,
    canvasRef,
    applyPowerPropagation,
  } = args;

  const memoryClipboard = useRef<ClipboardPayload | null>(null);
  const lastMouseClient = useRef<{ x: number; y: number } | null>(null);
  const pasteNudge = useRef(0);

  // следим за курсором над canvas (чтобы вставлять “под мышь”)
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      lastMouseClient.current = { x: e.clientX, y: e.clientY };
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [canvasRef]);

  const selectedNodes = useMemo(() => {
    const set = new Set(selection.nodeIds);
    return nodes.filter((n) => set.has(n.id));
  }, [nodes, selection.nodeIds]);

  const copy = useCallback(() => {
    if (!isEditing) return;
    if (!selectedNodes.length) return;

    const selectedIdSet = new Set(selectedNodes.map((n) => n.id));

    // копируем только рёбра, которые соединяют выделенные ноды
    const selectedEdges = edges.filter(
      (e) => e.source && e.target && selectedIdSet.has(e.source) && selectedIdSet.has(e.target)
    );

    // origin = левый верхний угол выделения
    const minX = Math.min(...selectedNodes.map((n) => n.position.x));
    const minY = Math.min(...selectedNodes.map((n) => n.position.y));

    const payload: ClipboardPayload = {
      nodes: selectedNodes,
      edges: selectedEdges,
      origin: { x: minX, y: minY },
    };

    memoryClipboard.current = payload;
    pasteNudge.current = 0;

    // опционально: в системный clipboard (можно убрать)
    try {
      navigator.clipboard?.writeText(JSON.stringify(payload));
    } catch {
      // silently ignore
    }
  }, [isEditing, selectedNodes, edges]);

  const paste = useCallback(async () => {
    if (!isEditing) return;

    // 1) пытаемся взять payload из памяти
    let payload = memoryClipboard.current;

    // 2) если нет — пробуем системный clipboard
    if (!payload) {
      try {
        const txt = await navigator.clipboard?.readText();
        if (txt) payload = JSON.parse(txt) as ClipboardPayload;
      } catch {
        // ignore
      }
    }

    if (!payload || !payload.nodes?.length) return;

    // точка вставки: либо под курсор, либо центр canvas
    let anchorFlow = { x: 0, y: 0 };

    const mouse = lastMouseClient.current;
    if (mouse) {
      anchorFlow = screenToFlowPosition(mouse);
    } else {
      const el = canvasRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        anchorFlow = screenToFlowPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }

    // небольшой сдвиг при многократной вставке
    pasteNudge.current += 20;
    const nudge = pasteNudge.current;

    // mapping oldId -> newId
    const idMap = new Map<string, string>();

    const newNodes: Node[] = payload.nodes.map((n) => {
      const newId = makeId("node");
      idMap.set(n.id, newId);

      const dx = n.position.x - payload!.origin.x;
      const dy = n.position.y - payload!.origin.y;

      return {
        ...n,
        id: newId,
        position: { x: anchorFlow.x + dx + nudge, y: anchorFlow.y + dy + nudge },
        selected: true,
      };
    });

    const newEdges: Edge[] = payload.edges
      .map((e) => {
        const ns = idMap.get(e.source);
        const nt = idMap.get(e.target);
        if (!ns || !nt) return null;

        return {
          ...e,
          id: makeId("edge"),
          source: ns,
          target: nt,
          selected: true,
        };
      })
      .filter(Boolean) as Edge[];

    // снять выделение со старых, чтобы было понятно что вставилось
    const nextNodes = nodes.map((n) => ({ ...n, selected: false })).concat(newNodes);
    const nextEdges = edges.map((e) => ({ ...e, selected: false })).concat(newEdges);

    setNodes(nextNodes);
    setEdges(nextEdges);

    queueMicrotask(applyPowerPropagation);
  }, [
    isEditing,
    nodes,
    edges,
    setNodes,
    setEdges,
    screenToFlowPosition,
    canvasRef,
    applyPowerPropagation,
  ]);

  // горячие клавиши
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (!mod) return;

      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        copy();
      }

      if (e.key.toLowerCase() === "v") {
        e.preventDefault();
        void paste();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [copy, paste]);

  return { copy, paste };
}