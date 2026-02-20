import { Position, type NodeProps } from "@xyflow/react";
import { GroundingIcon } from "../../icons/GroundingIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function GroundingNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className:
        "custom-node-handle !left-[10px] !top-[55%] ",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className:
        "custom-node-handle !left-[10px] !top-[55%] ",
    },
  ];

  const icon = applied ? (
    <GroundingIcon fill={applied} />
  ) : (
    <GroundingIcon />
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

export default GroundingNode;