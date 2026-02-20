import {
  BaseEdge,
  getStraightPath,
  type ConnectionLineComponentProps,
} from "@xyflow/react";

type Props = ConnectionLineComponentProps & {
  color?: string;
  width?: number;
};

export default function ColoredConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  color = "#9CA3AF",
  width = 4,
}: Props) {
  const [path] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <BaseEdge
      id="__connectionline"
      path={path}
      style={{
        stroke: color,
        strokeWidth: width,
      }}
    />
  );
}