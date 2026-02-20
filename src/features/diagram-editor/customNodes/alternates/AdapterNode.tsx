import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { AdapterIcon } from "../../icons/AdapterIcon";

type Rot = 0 | 90 | 180 | 270;

const CENTER_BY_ROTATION: Record<Rot, { x: number; y: number; dir: Position }> = {
  0: { x: 50, y: 66.46, dir: Position.Top },
  90: { x: 33.54, y: 50, dir: Position.Right },
  180: { x: 50, y: 50, dir: Position.Right },
  270: { x: 66.46, y: 50, dir: Position.Left },
};

function AdapterNode({ selected, data, id }: NodeProps) {
  const fillColor =
    ((data as any)?.color ?? (data as any)?.fillColor ?? "#4242A0") as string;

  const status = (data as any)?.status ?? "on";
  const rotation = (((data as any)?.rotation ?? 0) as Rot) ?? 0;

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

  const icon = <AdapterIcon fillColor={fillColor} />;

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

export default AdapterNode;