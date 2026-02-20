import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { TPIcon } from "../../icons/TPIcon";

function TPNode({ selected, data, id }: NodeProps) {
  const strokeColor = ((data as any)?.strokeColor ?? "#4242A0") as string;
  const strokeWidth = ((data as any)?.strokeWidth ?? 4) as number;

  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // targets
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !left-[50%] !top-[0%]",
    },
    {
      id: "t-right",
      type: "target",
      direction: Position.Right,
      className: "custom-node-handle !right-[0%] !top-[50%]",
    },
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !left-[50%] !bottom-[0%]",
    },
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className: "custom-node-handle !left-[0%] !top-[50%]",
    },

    // sources
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !left-[50%] !top-[0%]",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Right,
      className: "custom-node-handle !right-[0%] !top-[50%]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !left-[50%] !bottom-[0%]",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className: "custom-node-handle !left-[0%] !top-[50%]",
    },
  ];

  const icon = (
    <TPIcon
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
    />
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

export default TPNode;