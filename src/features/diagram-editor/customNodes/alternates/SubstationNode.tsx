import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { SubstationIcon } from "../../icons/SubstationIcon";

function SubstationNode({ selected, data, id }: NodeProps) {
  const fillColor = ((data as any)?.color ?? "#000000") as string;
  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  // точки 45° по окружности вписанного круга:
  // 14.645% и 85.355%
  const handlers: HandleType[] = [
    // ===== targets: 4 стороны =====
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !left-0 !top-1/2" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !right-0 !top-1/2" },

    // ===== targets: диагонали (по кругу) =====
    { id: "t-tl", type: "target", direction: Position.Top, className: "custom-node-handle !left-[14.645%] !top-[14.645%]" },
    { id: "t-tr", type: "target", direction: Position.Top, className: "custom-node-handle !left-[85.355%] !top-[14.645%]" },
    {
      id: "t-bl",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !left-[14.645%] !bottom-[14.645%]",
    },
    {
      id: "t-br",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !left-[85.355%] !bottom-[14.645%]",
    },

    // ===== sources: 4 стороны =====
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-1/2 !top-0" },
    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle !left-1/2 !bottom-0" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !left-0 !top-1/2" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle !right-0 !top-1/2" },

    // ===== sources: диагонали (по кругу) =====
    { id: "s-tl", type: "source", direction: Position.Top, className: "custom-node-handle !left-[14.645%] !top-[14.645%]" },
    { id: "s-tr", type: "source", direction: Position.Top, className: "custom-node-handle !left-[85.355%] !top-[14.645%]" },
    {
      id: "s-bl",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !left-[14.645%] !bottom-[14.645%]",
    },
    {
      id: "s-br",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !left-[85.355%] !bottom-[14.645%]",
    },
  ];

  const icon = <SubstationIcon fillColor={fillColor} />;

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

export default SubstationNode;