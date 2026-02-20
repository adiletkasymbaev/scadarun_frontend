import { Position, type NodeProps } from "@xyflow/react";
import { ThreePositionLoadBreakSwitchIcon } from "../../icons/ThreePositionLoadBreakSwitchIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function ThreePositionLoadBreakSwitchNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP — верхняя вершина ромба
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[10px] !left-1/2 ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[10px] !left-1/2 ",
    },

    // BOTTOM — нижняя вершина ромба
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[10px] !left-1/2 ",
    },
  ];

  const icon = applied ? (
    <ThreePositionLoadBreakSwitchIcon stroke={applied} fill={applied} />
  ) : (
    <ThreePositionLoadBreakSwitchIcon />
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

export default ThreePositionLoadBreakSwitchNode;