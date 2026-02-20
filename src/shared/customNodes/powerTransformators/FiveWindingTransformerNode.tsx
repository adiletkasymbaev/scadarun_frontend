import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FiveWindingTransformerIcon } from "../../icons/FiveWindingTransformerIcon";

function FiveWindingTransformerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP LEFT ring
    { id: "p-top-left-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-[36%] !top-0" },
    { id: "p-top-left-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-[36%] !top-0" },

    { id: "p-left-top-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[28%] !left-[15%]" },
    { id: "p-left-top-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[28%] !left-[15%]" },

    // TOP RIGHT ring
    { id: "p-top-right-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-[64%] !top-0" },
    { id: "p-top-right-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-[64%] !top-0" },

    { id: "p-right-top-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[28%] !right-[15%]" },
    { id: "p-right-top-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[28%] !right-[15%]" },

    // BOTTOM LEFT ring
    { id: "p-bottom-left-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[22%] !bottom-0" },
    { id: "p-bottom-left-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[22%] !bottom-0" },

    { id: "p-left-bottom-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[72%]" },
    { id: "p-left-bottom-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[72%]" },

    // BOTTOM CENTER ring
    { id: "p-bottom-center-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-bottom-center-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    // BOTTOM RIGHT ring
    { id: "p-bottom-right-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[78%] !bottom-0" },
    { id: "p-bottom-right-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[78%] !bottom-0" },

    { id: "p-right-bottom-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[72%]" },
    { id: "p-right-bottom-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[72%]" },
  ];

  const icon = applied ? (
    <FiveWindingTransformerIcon
      ringTopLeft={applied}
      ringTopRight={applied}
      ringBottomLeft={applied}
      ringBottomCenter={applied}
      ringBottomRight={applied}
    />
  ) : (
    <FiveWindingTransformerIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FiveWindingTransformerNode;