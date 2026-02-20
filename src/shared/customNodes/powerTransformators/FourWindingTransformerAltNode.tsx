import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { FourWindingTransformerAltIcon } from "../../icons/FourWindingTransformerAltIcon";

function FourWindingTransformerAltNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP ring
    { id: "p-top-t", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "p-top-s", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },

    // CENTER ring
    { id: "p-center-bottom-t", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "p-center-bottom-s", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },

    // LEFT BOTTOM ring
    { id: "p-left-bottom-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[71%]" },
    { id: "p-left-bottom-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[71%]" },

    // RIGHT BOTTOM ring
    { id: "p-right-bottom-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[71%]" },
    { id: "p-right-bottom-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[71%]" },

    // optional top side points
    { id: "p-left-top-ring-t", type: "target", direction: Position.Left, className: "custom-node-handle !top-[100%] !left-[20%]" },
    { id: "p-left-top-ring-s", type: "source", direction: Position.Left, className: "custom-node-handle !top-[100%] !left-[20%]" },

    { id: "p-right-top-ring-t", type: "target", direction: Position.Right, className: "custom-node-handle !top-[100%] !right-[20%]" },
    { id: "p-right-top-ring-s", type: "source", direction: Position.Right, className: "custom-node-handle !top-[100%] !right-[20%]" },
  ];

  const icon = applied ? (
    <FourWindingTransformerAltIcon
      ringTop={applied}
      ringCenter={applied}
      ringLeftBottom={applied}
      ringRightBottom={applied}
    />
  ) : (
    <FourWindingTransformerAltIcon />
  );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default FourWindingTransformerAltNode;