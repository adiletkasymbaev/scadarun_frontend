import { Position, type NodeProps } from "@xyflow/react";
import { HalfChassisIcon } from "../../icons/HalfChassisIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function HalfChassisNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[10px] !left-1/2 ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[10px] !left-1/2 ",
    },
  ];

  const icon = applied ? (
    <HalfChassisIcon stroke={applied} fill={applied} />
  ) : (
    <HalfChassisIcon />
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

export default HalfChassisNode;