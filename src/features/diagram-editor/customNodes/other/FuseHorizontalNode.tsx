import { Position, type NodeProps } from "@xyflow/react";
import { FuseIcon } from "../../icons/FuseIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function FuseHorizontalNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";

  const handlers: HandleType[] = [
    // TOP — центральная линия
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[9%] !left-[22%] ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[9%] !left-[22%] ",
    },

    // BOTTOM — центральная линия
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !top-[90%] !left-[46%]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !top-[90%] !left-[46%]",
    },
  ];

  const icon = applied ? (
    <FuseIcon stroke={applied} fill={applied} />
  ) : (
    <FuseIcon />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={90}
      id={id}
    />
  );
}

export default FuseHorizontalNode;