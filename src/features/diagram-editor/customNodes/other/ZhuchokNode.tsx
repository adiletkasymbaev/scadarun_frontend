import { Position, type NodeProps } from "@xyflow/react";
import { ZhuchokIcon } from "../../icons/ZhuchokIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function ZhuchokNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP — вертикальная линия
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[10px] !left-[42%] ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[10px] !left-[42%] ",
    },

    // BOTTOM — та же вертикальная линия
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[10px] !left-[42%] ",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[10px] !left-[42%] ",
    },
  ];

  const icon = applied ? (
    <ZhuchokIcon stroke={applied} fill={applied} />
  ) : (
    <ZhuchokIcon />
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

export default ZhuchokNode;