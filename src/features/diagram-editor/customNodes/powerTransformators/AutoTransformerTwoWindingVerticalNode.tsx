import { Position, type NodeProps } from "@xyflow/react";
import { AutoTransformerTwoWindingVerticalIcon } from "../../icons/AutoTransformerTwoWindingVerticalIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

type RingColors = Partial<Record<"top" | "bottom", string | null>>;

function AutoTransformerTwoWindingVerticalNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const appliedAll = d.color as string | null | undefined;
  const ringColors = (d.ringColors ?? {}) as RingColors;

  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as 0 | 90 | 180 | 270;

  const ringTop = ringColors.top ?? appliedAll ?? "#EA7474";
  const ringBottom = ringColors.bottom ?? appliedAll ?? "#BD3ABD";

  const baseHandlers: HandleType[] = [
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !top-[38%]" },
    { id: "t-left2", type: "target", direction: Position.Left, className: "custom-node-handle !top-[76%]" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !top-[76%]" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-0" },

    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !top-[38%]" },
    { id: "s-left2", type: "source", direction: Position.Left, className: "custom-node-handle !top-[76%]" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle !top-[76%]" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-0" },
  ];

  const handlers: HandleType[] = baseHandlers.map((h) => ({
    ...h,
    direction: rotatePosCompensate(h.direction, rotation),
  }));

  const icon = <AutoTransformerTwoWindingVerticalIcon ringTop={ringTop} ringBottom={ringBottom} />;

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default AutoTransformerTwoWindingVerticalNode;