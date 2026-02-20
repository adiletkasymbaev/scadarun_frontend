import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { TwoWindingTransformerIcon } from "../../icons/TwoWindingTransformerIcon";

function TwoWindingTransformerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP (центр)
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    // BOTTOM (центр)
    { id: "p-bottom-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-bottom-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    // LEFT TOP (верхнее кольцо)
    { id: "p-left-top-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[29%]" },
    { id: "p-left-top-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[29%]" },

    // RIGHT TOP (верхнее кольцо)
    { id: "p-right-top-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[29%]" },
    { id: "p-right-top-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[29%]" },

    // LEFT BOTTOM (нижнее кольцо)
    { id: "p-left-bottom-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[71%]" },
    { id: "p-left-bottom-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[71%]" },

    // RIGHT BOTTOM (нижнее кольцо)
    { id: "p-right-bottom-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[71%]" },
    { id: "p-right-bottom-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[71%]" },
  ];

  const icon = applied ? (
    <TwoWindingTransformerIcon ringTop={applied} ringBottom={applied} />
  ) : (
    <TwoWindingTransformerIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default TwoWindingTransformerNode;