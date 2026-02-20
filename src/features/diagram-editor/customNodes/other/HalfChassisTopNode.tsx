import { Position, type NodeProps } from "@xyflow/react";
import { HalfChassisIcon } from "../../icons/HalfChassisIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";
import { rotatePosCompensate } from "../../lib/rotatePosCompensate";

function HalfChassisTopNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const applied = d.color as string | null | undefined;
  const status = d.status ?? "on";

  const cls = `custom-node-handle top-[initial]! left-[50%]! bottom-[0%]!`;

  const handlers: HandleType[] = [
    {
      id: "t-top",
      type: "target",
      direction: Position.Bottom,
      className: cls,
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Bottom,
      className: cls,
    },
  ];

  const icon = applied ? (
    <HalfChassisIcon stroke={applied} fill={applied} />
  ) : (
    <HalfChassisIcon />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={180}
      id={id}
    />
  );
}

export default HalfChassisTopNode;