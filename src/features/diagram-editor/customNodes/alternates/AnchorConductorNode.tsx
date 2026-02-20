import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { AnchorConductorIcon } from "../../icons/AnchorConductorIcon";

type Rot = 0 | 90 | 180 | 270;

const CENTER_BY_ROTATION: Record<Rot, { x: number; y: number; dir: Position }> = {
  0: { x: 50, y: 66.46, dir: Position.Top },
  90: { x: 33.54, y: 50, dir: Position.Right },
  180: { x: 50, y: 50, dir: Position.Right },
  270: { x: 66.46, y: 50, dir: Position.Left },
};

function AnchorConductorNode({ selected, data, id }: NodeProps) {
  const strokeColor = ((data as any)?.strokeColor ?? "#000000") as string;
  const lineColor = ((data as any)?.lineColor ?? "#000000") as string;

  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;
  const c = CENTER_BY_ROTATION[rotation] ?? CENTER_BY_ROTATION[0];

  const handlers: HandleType[] = [
    {
      id: "t-center",
      type: "target",
      direction: c.dir,
      className: `custom-node-handle !left-[${c.x}%] !top-[${c.y}%]`,
    },
    {
      id: "s-center",
      type: "source",
      direction: c.dir,
      className: `custom-node-handle !left-[${c.x}%] !top-[${c.y}%]`,
    },
  ];

  const icon = (
    <AnchorConductorIcon strokeColor={strokeColor} lineColor={lineColor} />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={rotation}
      id={id}
    />
  );
}

export default AnchorConductorNode;