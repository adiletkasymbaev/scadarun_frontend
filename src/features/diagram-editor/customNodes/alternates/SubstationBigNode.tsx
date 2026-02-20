import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { SubstationBigIcon } from "../../icons/SubstationBigIcon";

function SubstationBigNode({ selected, data, id }: NodeProps) {
  const gradientTop = ((data as any)?.gradientTop ?? "#000000") as string;
  const gradientBottom = ((data as any)?.gradientBottom ?? "#FF0000") as string;
  const strokeColor = ((data as any)?.strokeColor ?? "#000000") as string;
  const shapeColor = ((data as any)?.shapeColor ?? "#000000") as string;

  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // ===== targets: 4 стороны =====
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-[0%]" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !right-[0%] !top-[50%]" },
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[50%] !bottom-[0%]" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !left-[0%] !top-[50%]" },

    // ===== targets: диагонали (45° по окружности) =====
    { id: "t-tl", type: "target", direction: Position.Top, className: "custom-node-handle !left-[14.645%] !top-[14.645%]" },
    { id: "t-tr", type: "target", direction: Position.Top, className: "custom-node-handle !left-[85.355%] !top-[14.645%]" },
    { id: "t-bl", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[14.645%] !bottom-[14.645%]" },
    { id: "t-br", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-[85.355%] !bottom-[14.645%]" },

    // ===== sources: 4 стороны =====
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
    <SubstationBigIcon
      gradientTop={gradientTop}
      gradientBottom={gradientBottom}
      strokeColor={strokeColor}
      shapeColor={shapeColor}
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

export default SubstationBigNode;