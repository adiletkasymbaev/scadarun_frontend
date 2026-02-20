import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingAutoTransformerIcon } from "../../icons/FourWindingAutoTransformerIcon";

function FourWindingAutoTransformerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP ring
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    // BOTTOM ring
    { id: "p-bottom-center-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-bottom-center-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    // LEFT bottom ring
    { id: "p-left-bottom-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[75%]" },
    { id: "p-left-bottom-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[75%]" },

    // RIGHT bottom ring
    { id: "p-right-bottom-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[75%]" },
    { id: "p-right-bottom-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[75%]" },

    // extra bottom points
    { id: "p-bottom-left-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[22%] !bottom-0" },
    { id: "p-bottom-left-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[22%] !bottom-0" },

    { id: "p-bottom-right-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[78%] !bottom-0" },
    { id: "p-bottom-right-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[78%] !bottom-0" },
  ];

  const icon = applied ? (
    <FourWindingAutoTransformerIcon
      ringTop={applied}
      ringBottom={applied}
      ringLeft={applied}
      ringRight={applied}
      link={applied}
    />
  ) : (
    <FourWindingAutoTransformerIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingAutoTransformerNode;