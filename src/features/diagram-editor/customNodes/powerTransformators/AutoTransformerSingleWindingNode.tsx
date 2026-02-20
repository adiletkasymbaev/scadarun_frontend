import { Position, type NodeProps } from "@xyflow/react";
import { AutoTransformerSingleWindingIcon } from "../../icons/AutoTransformerSingleWindingIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

type RingColors = Partial<Record<"ring", string | null>>;

function AutoTransformerSingleWindingNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const appliedAll = d.color as string | null | undefined;
  const ringColors = (d.ringColors ?? {}) as RingColors;

  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as 0 | 90 | 180 | 270;

  const ring = ringColors.ring ?? appliedAll ?? "#EA7474";

  const baseHandlers: HandleType[] = [
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !top-[60%]" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[40%] !top-0" },

    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !top-[60%]" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[40%] !top-0" },
  ];

  const handlers: HandleType[] = baseHandlers.map((h) => ({
    ...h,
    direction: rotatePosCompensate(h.direction, rotation),
  }));

  const icon = <AutoTransformerSingleWindingIcon ring={ring} />;

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default AutoTransformerSingleWindingNode;