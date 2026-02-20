import { Position, type NodeProps } from "@xyflow/react";
import { AutoTransformerTwoWindingVerticalIcon } from "../../icons/AutoTransformerTwoWindingVerticalIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function AutoTransformerTwoWindingVerticalNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  const handlers: HandleType[] = [
    // targets
    { id: "t-bottom", type: "target", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "t-left", type: "target", direction: Position.Left, className: "custom-node-handle !top-[38%]" },
    { id: "t-left2", type: "target", direction: Position.Left, className: "custom-node-handle !top-[76%]" },
    { id: "t-right", type: "target", direction: Position.Right, className: "custom-node-handle !top-[76%]" },
    { id: "t-top", type: "target", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-0" },

    // sources
    { id: "s-bottom", type: "source", direction: Position.Bottom, className: "custom-node-handle" },
    { id: "s-left", type: "source", direction: Position.Left, className: "custom-node-handle !top-[38%]" },
    { id: "s-left2", type: "source", direction: Position.Left, className: "custom-node-handle !top-[76%]" },
    { id: "s-right", type: "source", direction: Position.Right, className: "custom-node-handle !top-[76%]" },
    { id: "s-top", type: "source", direction: Position.Top, className: "custom-node-handle !left-[50%] !top-0" },
  ];

  const icon = applied
    ? (
        <AutoTransformerTwoWindingVerticalIcon
          ringTop={applied}
          ringBottom={applied}
        />
      )
    : (
        <AutoTransformerTwoWindingVerticalIcon />
      );

  return <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} rotation={rotation} id={id} />;
}

export default AutoTransformerTwoWindingVerticalNode;