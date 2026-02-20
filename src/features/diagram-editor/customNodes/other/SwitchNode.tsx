import { Position, type NodeProps } from "@xyflow/react";
import { SwitchIcon } from "../../icons/SwitchIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function SwitchNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP
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

    // RIGHT
    {
      id: "t-right",
      type: "target",
      direction: Position.Right,
      className: "custom-node-handle !right-[10px] !top-1/2 ",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Right,
      className: "custom-node-handle !right-[10px] !top-1/2 ",
    },

    // BOTTOM
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

    // LEFT
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className: "custom-node-handle !left-[10px] !top-1/2 ",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className: "custom-node-handle !left-[10px] !top-1/2 ",
    },
  ];

  const fillColor =
    status === "off"
      ? "#FF0000" // красный при отключении
      : applied ?? "#00FF3C"; // зелёный по умолчанию

  const icon = (
    <SwitchIcon
      fill={fillColor}
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
      disableOverlay
    />
  );
}

export default SwitchNode;