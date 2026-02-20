import { Position, type NodeProps } from "@xyflow/react";
import { AutoTransformerTwoWindingHorizontalIcon } from "../../icons/AutoTransformerTwoWindingHorizontalIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

type RingColors = Partial<Record<"left" | "right", string | null>>;

function AutoTransformerTwoWindingHorizontalNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const appliedAll = d.color as string | null | undefined;
  const ringColors = (d.ringColors ?? {}) as RingColors;

  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as 0 | 90 | 180 | 270;

  const ringLeft = ringColors.left ?? appliedAll ?? "#EA7474";
  const ringRight = ringColors.right ?? appliedAll ?? "#BD3ABD";

  const baseHandlers: HandleType[] = [
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[29%] !bottom-[10%]" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !top-[62%]" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !right-[27.5%] !top-[96%]" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[71.5%] !top-[10%]" },
    { id: "t-top2", type: "target", direction: Position.Top, className: "custom-node-handle !left-[27.5%] !top-[31%]" },

    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[29%] !bottom-[10%]" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !top-[62%]" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle !right-[27.5%] !top-[96%]" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[71.5%] !top-[10%]" },
    { id: "s-top2", type: "source", direction: Position.Top, className: "custom-node-handle !left-[27.5%] !top-[31%]" },
  ];

  const handlers: HandleType[] = baseHandlers.map((h) => ({
    ...h,
    direction: rotatePosCompensate(h.direction, rotation),
  }));

  const icon = <AutoTransformerTwoWindingHorizontalIcon ringLeft={ringLeft} ringRight={ringRight} />;

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default AutoTransformerTwoWindingHorizontalNode;