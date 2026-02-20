import { Position, type NodeProps } from "@xyflow/react";
import { ChokeCoilIcon } from "../../icons/ChokeCoilIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

type Rot = 0 | 90 | 180 | 270;

const HANDLERS_BY_ROTATION: Record<Rot, HandleType[]> = {
  0: [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-[21px]",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-[21px]",
    },
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-[21px]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-[21px]",
    },
  ],

  90: [
    {
      id: "t-left",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !left-[11px] !top-[20px]",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !left-[11px] !top-[20px]",
    },
    {
      id: "t-right",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !top-[95px] !left-[21px]",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !top-[95px] !left-[21px]",
    },
  ],

  180: [
    {
      id: "t-top",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !top-[86px] !left-[21px]",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !top-[86px] !left-[21px]",
    },
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[15px] !left-[21px]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[15px] !left-[21px]",
    },
  ],

  270: [
    {
      id: "t-left",
      type: "target",
      direction: Position.Left,
      className: "custom-node-handle !left-[10px] !top-[20px]",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Left,
      className: "custom-node-handle !left-[10px] !top-[20px]",
    },
    {
      id: "t-right",
      type: "target",
      direction: Position.Right,
      className: "custom-node-handle !right-[10px] !top-[20px]",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Right,
      className: "custom-node-handle !right-[10px] !top-[20px]",
    },
  ],
};

function ChokeCoilNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as Rot;

  const handlers = HANDLERS_BY_ROTATION[rotation] ?? HANDLERS_BY_ROTATION[0];

  const icon = applied ? (
      <ChokeCoilIcon stroke={applied} fill={applied} />
  ) : (
      <ChokeCoilIcon />
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

export default ChokeCoilNode;
