import { Position, type NodeProps } from "@xyflow/react";
import { RvpIcon } from "../../icons/RvpIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function RvpNode({ selected, data, id }: NodeProps) {
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
    <RvpIcon stroke={applied} fill={applied} />
  ) : (
    <RvpIcon />
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

export default RvpNode;