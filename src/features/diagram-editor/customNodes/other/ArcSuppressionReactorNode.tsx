import { Position, type NodeProps } from "@xyflow/react";
import { ArcSuppressionReactorIcon } from "../../icons/ArcSuppressionReactorIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function ArcSuppressionReactorNode({ selected, data, id }: NodeProps) {
  const applied = (data as any)?.color as string | null | undefined;
  const status = (data as any)?.status ?? "on";
const rotation = ((data as any)?.rotation ?? 0) as 0 | 90 | 180 | 270;

  // 2 хендла: сверху и снизу.
  // Не вплотную: уводим внутрь на 10px (через left: 10px + width-20px).
  const handlers: HandleType[] = [
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className: "custom-node-handle !left-[10px] !top-0",
    },
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !left-[10px] !bottom-0",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className: "custom-node-handle !left-[10px] !top-0",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !left-[10px] !bottom-0",
    },
  ];

  const icon = applied ? (
    <ArcSuppressionReactorIcon stroke={applied} fill={applied} />
  ) : (
    <ArcSuppressionReactorIcon />
  );

  return (
    <BaseNode icon={icon} handlers={handlers} selected={selected} status={status} />
  );
}

export default ArcSuppressionReactorNode;