import { Position, type NodeProps } from "@xyflow/react";
import { BoosterIcon } from "../../icons/BoosterIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function BoosterNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // targets
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle" },

    // sources
    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle" },
  ];

  const icon = applied
    ? <BoosterIcon ring={applied} />
    : <BoosterIcon />;

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default BoosterNode;