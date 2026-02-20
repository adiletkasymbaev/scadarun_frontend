import { Position, type NodeProps } from "@xyflow/react";
import { DoubleReactorIcon } from "../../icons/DoubleReactorIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function DoubleReactorNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // LEFT LINE (y ≈ 30px of 89px => ~34%)
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className:
        "custom-node-handle !left-[10px] !top-[34%] ",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className:
        "custom-node-handle !left-[10px] !top-[34%] ",
    },

    // RIGHT LINE (same y)
    {
      id: "t-right",
      type: "target",
      direction: Position.Right,
      className:
        "custom-node-handle !right-[10px] !top-[34%] ",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Right,
      className:
        "custom-node-handle !right-[10px] !top-[34%] ",
    },

    // BOTTOM LINE (center X, inset 10px from bottom)
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
  ];

  const icon = applied ? (
    <DoubleReactorIcon stroke={applied} fill={applied} />
  ) : (
    <DoubleReactorIcon />
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

export default DoubleReactorNode;