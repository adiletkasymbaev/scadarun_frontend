import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingAutoTransformerIcon } from "../../icons/FourWindingAutoTransformerIcon";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

type RingColors = Partial<Record<"top" | "bottom" | "left" | "right" | "link", string | null>>;

function FourWindingAutoTransformerNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const appliedAll = d.color as string | null | undefined;
  const ringColors = (d.ringColors ?? {}) as RingColors;

  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as 0 | 90 | 180 | 270;

  const ringTop = ringColors.top ?? appliedAll ?? "#EA7474";
  const ringBottom = ringColors.bottom ?? appliedAll ?? "#BD3ABD";
  const ringLeft = ringColors.left ?? appliedAll ?? "#4242A0";
  const ringRight = ringColors.right ?? appliedAll ?? "#3A9D6B";
  const link = ringColors.link ?? appliedAll ?? "#FFFFFF";

  const baseHandlers: HandleType[] = [
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    { id: "p-bottom-center-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-bottom-center-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    { id: "p-left-bottom-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[75%]" },
    { id: "p-left-bottom-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[75%]" },

    { id: "p-right-bottom-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[75%]" },
    { id: "p-right-bottom-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[75%]" },

    { id: "p-bottom-left-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[22%] !bottom-0" },
    { id: "p-bottom-left-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[22%] !bottom-0" },

    { id: "p-bottom-right-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[78%] !bottom-0" },
    { id: "p-bottom-right-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[78%] !bottom-0" },
  ];

  const handlers: HandleType[] = baseHandlers.map((h) => ({
    ...h,
    direction: rotatePosCompensate(h.direction, rotation),
  }));

  const icon = (
    <FourWindingAutoTransformerIcon
      ringTop={ringTop}
      ringBottom={ringBottom}
      ringLeft={ringLeft}
      ringRight={ringRight}
      link={link}
    />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingAutoTransformerNode;