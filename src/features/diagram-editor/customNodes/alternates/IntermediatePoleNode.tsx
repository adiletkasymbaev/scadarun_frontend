import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { IntermediatePoleIcon } from "../../icons/IntermediatePoleIcon";

function IntermediatePoleNode({ selected, data, id }: NodeProps) {
  const strokeColor = ((data as any)?.strokeColor ?? "black") as string;
  const fillColor = ((data as any)?.fillColor ?? "white") as string;

  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // ===== targets: 4 основные стороны =====
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-[0%]" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !right-[0%] !top-[50%]" },
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[50%] !bottom-[0%]" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !left-[0%] !top-[50%]" },

    // ===== targets: диагонали (45° по кругу) =====
    { id: "t-tl", type: "target", direction: Position.Top, className: "custom-node-handle !left-[14.645%] !top-[14.645%]" },
    { id: "t-tr", type: "target", direction: Position.Top, className: "custom-node-handle !left-[85.355%] !top-[14.645%]" },
    { id: "t-bl", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[14.645%] !bottom-[14.645%]" },
    { id: "t-br", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[85.355%] !bottom-[14.645%]" },

    // ===== sources: 4 основные стороны =====
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-[0%]" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle !right-[0%] !top-[50%]" },
    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[50%] !bottom-[0%]" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !left-[0%] !top-[50%]" },

    // ===== sources: диагонали =====
    { id: "s-tl", type: "source", direction: Position.Top, className: "custom-node-handle !left-[14.645%] !top-[14.645%]" },
    { id: "s-tr", type: "source", direction: Position.Top, className: "custom-node-handle !left-[85.355%] !top-[14.645%]" },
    { id: "s-bl", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[14.645%] !bottom-[14.645%]" },
    { id: "s-br", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-[85.355%] !bottom-[14.645%]" },
  ];

  const icon = (
    <IntermediatePoleIcon
      strokeColor={strokeColor}
      fillColor={fillColor}
    />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={rotation}
      id={id}
    />
  );
}

export default IntermediatePoleNode;