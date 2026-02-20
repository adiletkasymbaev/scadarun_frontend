import { Position, type NodeProps } from "@xyflow/react";
import { ThreePositionLoadBreakSwitchIcon } from "../../icons/ThreePositionLoadBreakSwitchIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function ThreePositionLoadBreakSwitchNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";

  const handlers: HandleType[] = [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[5px] !left-[25%]",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[5px] !left-[25%]",
    },
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-[25%]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-[25%]",
    },
  ];

  const fillColor =
    status === "off"
      ? "#FF0000"
      : applied ?? "#00FF3C";

  const icon = (
    <ThreePositionLoadBreakSwitchIcon
      stroke={applied ?? undefined}
      fill={fillColor}
    />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={0}
      disableOverlay={true}
      id={id}
    />
  );
}

export default ThreePositionLoadBreakSwitchNode;