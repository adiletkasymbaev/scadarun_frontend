import {
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

type ColoredEdgeData = {
  color?: string;
  width?: number;
};

export default function ColoredStepEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    markerEnd,
  } = props;

  const d = (data ?? {}) as ColoredEdgeData;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 0, // ← ВАЖНО: делает edge «ломаным», как step
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        stroke: d.color ?? "#000",
        strokeWidth: d.width ?? 4,
      }}
    />
  );
}