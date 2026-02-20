import { Position } from "@xyflow/react";

export function rotatePosCompensate(pos: Position, rotation: 0 | 90 | 180 | 270): Position {
  if (rotation === 0) return pos;

  const ccw90: Record<Position, Position> = {
    [Position.Top]: Position.Left,
    [Position.Left]: Position.Bottom,
    [Position.Bottom]: Position.Right,
    [Position.Right]: Position.Top,
  };

  const ccw180: Record<Position, Position> = {
    [Position.Top]: Position.Bottom,
    [Position.Left]: Position.Right,
    [Position.Bottom]: Position.Top,
    [Position.Right]: Position.Left,
  };

  const ccw270: Record<Position, Position> = {
    [Position.Top]: Position.Right,
    [Position.Right]: Position.Bottom,
    [Position.Bottom]: Position.Left,
    [Position.Left]: Position.Top,
  };

  if (rotation === 90) return ccw90[pos];
  if (rotation === 180) return ccw180[pos];
  return ccw270[pos];
}