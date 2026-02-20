import { Position, type NodeProps } from "@xyflow/react";
import { SynchronousMotorIcon } from "../../icons/SynchronousMotorIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function SynchronousMotorNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-1/2 ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-1/2 ",
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

    // BOTTOM
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-1/2 ",
    },

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
  ];

  const icon = applied ? (
    <SynchronousMotorIcon stroke={applied} fill={applied} />
  ) : (
    <SynchronousMotorIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default SynchronousMotorNode;