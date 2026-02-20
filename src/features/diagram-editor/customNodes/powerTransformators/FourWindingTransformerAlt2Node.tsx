import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingTransformerAlt2Icon } from "../../icons/FourWindingTransformerAlt2Icon";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

type RingColors = Partial<Record<"topLeft" | "topRight" | "bottomLeft" | "bottomRight", string | null>>;

function FourWindingTransformerAlt2Node({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const appliedAll = d.color as string | null | undefined;
  const ringColors = (d.ringColors ?? {}) as RingColors;

  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as 0 | 90 | 180 | 270;

  const ringTopLeft = ringColors.topLeft ?? appliedAll ?? "#EA7474";
  const ringTopRight = ringColors.topRight ?? appliedAll ?? "#BD3ABD";
  const ringBottomLeft = ringColors.bottomLeft ?? appliedAll ?? "#4242A0";
  const ringBottomRight = ringColors.bottomRight ?? appliedAll ?? "#3A9D6B";

  const baseHandlers: HandleType[] = [
    { id: "p-top-left-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-[30%] !top-0" },
    { id: "p-top-left-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-[30%] !top-0" },
    { id: "p-left-top-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[30%]" },
    { id: "p-left-top-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[30%]" },

    { id: "p-top-right-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-[70%] !top-0" },
    { id: "p-top-right-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-[70%] !top-0" },
    { id: "p-right-top-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[30%]" },
    { id: "p-right-top-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[30%]" },

    { id: "p-bottom-left-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[30%] !bottom-0" },
    { id: "p-bottom-left-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[30%] !bottom-0" },
    { id: "p-left-bottom-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[70%]" },
    { id: "p-left-bottom-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[70%]" },

    { id: "p-bottom-right-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[70%] !bottom-0" },
    { id: "p-bottom-right-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[70%] !bottom-0" },
    { id: "p-right-bottom-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[70%]" },
    { id: "p-right-bottom-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[70%]" },
  ];

  const handlers: HandleType[] = baseHandlers.map((h) => ({
    ...h,
    direction: rotatePosCompensate(h.direction, rotation),
  }));

  const icon = (
    <FourWindingTransformerAlt2Icon
      ringTopLeft={ringTopLeft}
      ringTopRight={ringTopRight}
      ringBottomLeft={ringBottomLeft}
      ringBottomRight={ringBottomRight}
    />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingTransformerAlt2Node;