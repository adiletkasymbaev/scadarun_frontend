import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingTransformerIcon } from "../../icons/FourWindingTransformerIcon";

function FourWindingTransformerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP ring
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    // BOTTOM ring
    { id: "p-bottom-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-bottom-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    // LEFT ring
    { id: "p-left-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-1/2" },
    { id: "p-left-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-1/2" },

    // RIGHT ring
    { id: "p-right-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-1/2" },
    { id: "p-right-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-1/2" },
  ];

  const icon = applied ? (
    <FourWindingTransformerIcon
      ringTop={applied}
      ringBottom={applied}
      ringLeft={applied}
      ringRight={applied}
    />
  ) : (
    <FourWindingTransformerIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingTransformerNode;