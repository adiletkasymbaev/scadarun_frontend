import { Position, type NodeProps } from "@xyflow/react";
import { AutoTransformerSingleWindingIcon } from "../../icons/AutoTransformerSingleWindingIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function AutoTransformerSingleWindingNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !top-[60%]" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[40%] !top-0" },
    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !top-[60%]" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[40%] !top-0" },
  ];

  const icon = applied
    ? <AutoTransformerSingleWindingIcon ring={applied} />
    : <AutoTransformerSingleWindingIcon />;

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default AutoTransformerSingleWindingNode;