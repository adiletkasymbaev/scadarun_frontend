import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import TriangleAlarmIcon from "../../icons/TriangleAlarmIcon";

type Rot = 0 | 90 | 180 | 270;

const HANDLERS_BY_ROTATION: Record<Rot, HandleType[]> = {
  0: [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !left-1/2 !top-[0]",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !left-1/2 !top-[0]",
    },
  ],

  90: [
    {
      id: "t-right",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[5px] !right-1/2",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[5px] !right-1/2",
    },
  ],

  180: [
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !left-1/2 !bottom-[10px]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !left-1/2 !bottom-[10px]",
    },
  ],

  270: [
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className: "custom-node-handle !top-[-5px] !left-1/2",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className: "custom-node-handle !top-[-5px] !left-1/2",
    },
  ],
};

function TriangleNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as Rot;

  const handlers = HANDLERS_BY_ROTATION[rotation] ?? HANDLERS_BY_ROTATION[0];

  const icon = (
      <TriangleAlarmIcon
          size={42}
          color={applied ?? "#EA7474"}
          style={{ display: "block" }}
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

export default TriangleNode;
