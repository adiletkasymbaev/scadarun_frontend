import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingTransformerAlt2Icon } from "../../icons/FourWindingTransformerAlt2Icon";

function FourWindingTransformerAlt2Node({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP LEFT ring
    { id: "p-top-left-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-[30%] !top-0" },
    { id: "p-top-left-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-[30%] !top-0" },

    { id: "p-left-top-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[30%]" },
    { id: "p-left-top-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[30%]" },

    // TOP RIGHT ring
    { id: "p-top-right-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-[70%] !top-0" },
    { id: "p-top-right-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-[70%] !top-0" },

    { id: "p-right-top-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[30%]" },
    { id: "p-right-top-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[30%]" },

    // BOTTOM LEFT ring
    { id: "p-bottom-left-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[30%] !bottom-0" },
    { id: "p-bottom-left-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[30%] !bottom-0" },

    { id: "p-left-bottom-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[70%]" },
    { id: "p-left-bottom-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[70%]" },

    // BOTTOM RIGHT ring
    { id: "p-bottom-right-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[70%] !bottom-0" },
    { id: "p-bottom-right-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[70%] !bottom-0" },

    { id: "p-right-bottom-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[70%]" },
    { id: "p-right-bottom-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[70%]" },
  ];

  const icon = applied ? (
    <FourWindingTransformerAlt2Icon
      ringTopLeft={applied}
      ringTopRight={applied}
      ringBottomLeft={applied}
      ringBottomRight={applied}
    />
  ) : (
    <FourWindingTransformerAlt2Icon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingTransformerAlt2Node;