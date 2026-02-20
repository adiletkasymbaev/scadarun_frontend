import { Position, type NodeProps } from "@xyflow/react";
import { CurrentTransformerIcon } from "../../icons/CurrentTransformerIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function CurrentTransformerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // LEFT — по линии y=37
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className:
        "custom-node-handle !left-[10px] !top-[60%] ",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className:
        "custom-node-handle !left-[10px] !top-[60%] ",
    },

    // RIGHT — по линии y=37
    {
      id: "t-right",
      type: "target",
      direction: Position.Right,
      className:
        "custom-node-handle !right-[10px] !top-[60%] ",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Right,
      className:
        "custom-node-handle !right-[10px] !top-[60%] ",
    },
  ];

  const icon = applied ? (
    <CurrentTransformerIcon stroke={applied} />
  ) : (
    <CurrentTransformerIcon />
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

export default CurrentTransformerNode;