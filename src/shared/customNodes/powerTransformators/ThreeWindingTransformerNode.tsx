import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { ThreeWindingTransformerIcon } from "../../icons/ThreeWindingTransformerIcon";

function ThreeWindingTransformerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP ring
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    // LEFT ring
    { id: "p-bottom-left-ring-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[29%] !bottom-0" },
    { id: "p-bottom-left-ring-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[29%] !bottom-0" },

    { id: "p-left-left-ring-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[69%]" },
    { id: "p-left-left-ring-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[69%]" },

    // RIGHT ring
    { id: "p-bottom-right-ring-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[71%] !bottom-0" },
    { id: "p-bottom-right-ring-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[71%] !bottom-0" },

    { id: "p-right-right-ring-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[69%]" },
    { id: "p-right-right-ring-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[69%]" },
  ];

  const icon = applied ? (
    <ThreeWindingTransformerIcon ringTop={applied} ringLeft={applied} ringRight={applied} />
  ) : (
    <ThreeWindingTransformerIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default ThreeWindingTransformerNode;