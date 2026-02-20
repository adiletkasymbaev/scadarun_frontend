import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingTransformerAltIcon } from "../../icons/FourWindingTransformerAltIcon";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

type RingColors = Partial<Record<"top" | "center" | "leftBottom" | "rightBottom", string | null>>;

function FourWindingTransformerAltNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const appliedAll = d.color as string | null | undefined;
  const ringColors = (d.ringColors ?? {}) as RingColors;

  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as 0 | 90 | 180 | 270;

  const ringTop = ringColors.top ?? appliedAll ?? "#EA7474";
  const ringCenter = ringColors.center ?? appliedAll ?? "#BD3ABD";
  const ringLeftBottom = ringColors.leftBottom ?? appliedAll ?? "#4242A0";
  const ringRightBottom = ringColors.rightBottom ?? appliedAll ?? "#3A9D6B";

  const baseHandlers: HandleType[] = [
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    { id: "p-center-bottom-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-center-bottom-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    { id: "p-left-bottom-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[71%]" },
    { id: "p-left-bottom-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[71%]" },

    { id: "p-right-bottom-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[71%]" },
    { id: "p-right-bottom-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[71%]" },

    { id: "p-left-top-ring-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[100%] !left-[20%]" },
    { id: "p-left-top-ring-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[100%] !left-[20%]" },

    { id: "p-right-top-ring-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[100%] !right-[20%]" },
    { id: "p-right-top-ring-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[100%] !right-[20%]" },
  ];

  const handlers: HandleType[] = baseHandlers.map((h) => ({
    ...h,
    direction: rotatePosCompensate(h.direction, rotation),
  }));

  const icon = (
    <FourWindingTransformerAltIcon
      ringTop={ringTop}
      ringCenter={ringCenter}
      ringLeftBottom={ringLeftBottom}
      ringRightBottom={ringRightBottom}
    />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingTransformerAltNode;