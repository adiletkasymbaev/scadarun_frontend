import { Position, type NodeProps } from "@xyflow/react";
import { RvpIcon } from "../../icons/RvpIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

type Rot = 0 | 90 | 180 | 270;

const HANDLERS_BY_ROTATION: Record<Rot, HandleType[]> = {
  0: [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-1/2",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !top-[10px] !left-1/2",
    },
  ],

  90: [
    {
      id: "t-right",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !right-1/2 !top-[20px]",
    },
    {
      id: "s-right",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !right-1/2 !top-[20px]",
    },
  ],

  180: [
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-1/2",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className: "custom-node-handle !bottom-[10px] !left-1/2",
    },
  ],

  270: [
    {
      id: "t-left",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !left-1/2 !top-[0]",
    },
    {
      id: "s-left",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !left-1/2 !top-[0]",
    },
  ],
};

function RvpNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
  const rotation = ((data as any)?.rotation ?? 0) as Rot;

  const handlers = HANDLERS_BY_ROTATION[rotation] ?? HANDLERS_BY_ROTATION[0];

  const icon = applied ? <RvpIcon stroke={applied} fill={applied} /> : <RvpIcon />;

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

export default RvpNode;
