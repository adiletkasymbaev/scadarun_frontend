import { Position, type NodeProps } from "@xyflow/react";
import { AutoTransformerTwoWindingHorizontalIcon } from "../../icons/AutoTransformerTwoWindingHorizontalIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function AutoTransformerTwoWindingHorizontalNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // targets
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[29%] !bottom-[10%]" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !top-[62%]" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !right-[27.5%] !top-[96%]" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[71.5%] !top-[10%]" },
    { id: "t-top2", type: "target", direction: Position.Top, className: "custom-node-handle !left-[27.5%] !top-[31%]" },

    // sources
    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[29%] !bottom-[10%]" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !top-[62%]" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle !right-[27.5%] !top-[96%]" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[71.5%] !top-[10%]" },
    { id: "s-top2", type: "source", direction: Position.Top, className: "custom-node-handle !left-[27.5%] !top-[31%]" },
  ];

  const icon = applied
    ? (
        <AutoTransformerTwoWindingHorizontalIcon
          ringLeft={applied}
          ringRight={applied}
        />
      )
    : (
        <AutoTransformerTwoWindingHorizontalIcon />
      );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default AutoTransformerTwoWindingHorizontalNode;