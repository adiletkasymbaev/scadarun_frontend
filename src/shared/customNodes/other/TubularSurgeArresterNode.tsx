import { Position, type NodeProps } from "@xyflow/react";
import { TubularSurgeArresterIcon } from "../../icons/TubularSurgeArresterIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function TubularSurgeArresterNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // TOP
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

    // BOTTOM
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
    <TubularSurgeArresterIcon stroke={applied} fill={applied} />
  ) : (
    <TubularSurgeArresterIcon />
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

export default TubularSurgeArresterNode;