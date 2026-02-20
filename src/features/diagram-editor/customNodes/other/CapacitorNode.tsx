import { Position, type NodeProps } from "@xyflow/react";
import { CapacitorIcon } from "../../icons/CapacitorIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function CapacitorNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";

  const handlers: HandleType[] = [
    // LEFT
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className: "custom-node-handle !left-[10px] !top-1/2 ",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className: "custom-node-handle !left-[10px] !top-1/2 ",
    },

    // RIGHT
    {
      id: "t-right",
      type: "target",
      direction: Position.Right,
      className: "custom-node-handle !right-[10px] !top-1/2 ",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Right,
      className: "custom-node-handle !right-[10px] !top-1/2 ",
    },
  ];

  const icon = applied ? (
    <CapacitorIcon fill={applied} />
  ) : (
    <CapacitorIcon />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={0}
      id={id}
    />
  );
}

export default CapacitorNode;