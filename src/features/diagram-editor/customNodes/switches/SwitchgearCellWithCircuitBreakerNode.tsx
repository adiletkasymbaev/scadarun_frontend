import { Position, type NodeProps } from "@xyflow/react";
import { SwitchgearCellWithCircuitBreakerIcon } from "../../icons/SwitchgearCellWithCircuitBreakerIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function SwitchgearCellWithCircuitBreakerNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-1/2 ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-1/2 ",
    },
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
  ];

  const fillColor =
    status === "off"
      ? "#FF0000"
      : "#00FF3C";

  const icon = (
    <SwitchgearCellWithCircuitBreakerIcon
      stroke={applied ?? undefined}
      fill={applied ?? undefined}             
      breakerFill={fillColor}      
    />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      disableOverlay={true}
      rotation={rotation}
      id={id}
    />
  );
}

export default SwitchgearCellWithCircuitBreakerNode;