import { useCallback } from "react";
import type { Node } from "@xyflow/react";
import type { ReactFlowInstance } from "@xyflow/react";
import { safeParseDnD } from "../lib/dnd";
import makeId from "../lib/makeId";
import type { EditorColor } from "../store/useEditorStore";

export function useReactFlowDnD(args: {
  screenToFlowPosition: ReactFlowInstance["screenToFlowPosition"];
  nodes: Node[];
  setNodes: (next: Node[]) => void;
  nodeTypes: Record<string, any>;
  busColor: EditorColor;
  applyPowerPropagation: () => void;
}) {
  const { screenToFlowPosition, nodes, setNodes, nodeTypes, busColor, applyPowerPropagation } = args;

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
            status: "on",
            voltage: "10",
            colorDraft: "#4242A0",
            ...(payload.data ?? {}),
            ...(isBus ? { color: busColor } : {}),
          },
        },
      ]);

      queueMicrotask(applyPowerPropagation);
    },
    [nodes, setNodes, screenToFlowPosition, nodeTypes, busColor, applyPowerPropagation]
  );

  return { onDragOver, onDrop };
}