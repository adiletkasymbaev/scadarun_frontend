import { useCallback } from "react";
import { addEdge, type Connection, type Edge, type Node } from "@xyflow/react";
import type { EdgeDrawType, EditorColor } from "../store/useEditorStore";

type Args = {
  nodes: Node[];
  edges: Edge[] | undefined;
  setEdges: (edges: Edge[]) => void; // ✅ принимает массив
  edgeColor: EditorColor;
  edgeDrawType: EdgeDrawType;
  applyPowerPropagation: () => void;
};

export function useConnections({
  nodes,
  edges,
  setEdges,
  edgeColor,
  edgeDrawType,
  applyPowerPropagation,
}: Args) {
  const onConnect = useCallback(
    (params: Connection) => {
      // ✅ edges всегда должен быть массивом
      const safeEdges: Edge[] = Array.isArray(edges) ? edges : [];

      // ✅ выбираем цвет ребра
      let color: EditorColor = edgeColor;

      const sourceNode = nodes.find((n) => n.id === params.source);
      if (sourceNode?.type === "BusNode") {
        const busColor = (sourceNode.data as any)?.color as EditorColor | undefined;
        if (busColor) color = busColor;
      }

      const edgeType = edgeDrawType === "step" ? "coloredStep" : "coloredStraight";

      // ✅ формируем edge (учитываем твой coloredStep)
      const nextEdges = addEdge(
        {
          ...params,
          type: edgeType,
          data: { color, width: 4 },
        },
        safeEdges
      );

      // ✅ setEdges в zustand ожидает массив, а не функцию
      setEdges(nextEdges);

      queueMicrotask(applyPowerPropagation);
    },
    [nodes, edges, setEdges, edgeColor, edgeDrawType, applyPowerPropagation]
  );

  return { onConnect };
}