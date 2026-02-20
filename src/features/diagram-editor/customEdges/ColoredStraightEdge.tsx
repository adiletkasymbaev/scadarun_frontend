import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";

type ColoredEdgeData = { color?: string; width?: number };

export default function ColoredStraightEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, data, markerEnd } = props;
  const d = (data ?? {}) as ColoredEdgeData;

  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      style={{ stroke: d.color ?? "#000", strokeWidth: d.width ?? 4 }}
    />
  );
}