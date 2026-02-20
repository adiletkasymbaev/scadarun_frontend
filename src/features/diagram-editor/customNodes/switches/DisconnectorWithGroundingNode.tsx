import { Position, type NodeProps } from "@xyflow/react";
import { OffDisconnectorWithGroundingIcon } from "../../icons/OffDisconnectorWithGroundingIcon";
import { OnDisconnectorWithGroundingIcon } from "../../icons/OnDisconnectorWithGroundingIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function DisconnectorWithGroundingNode({ selected, data, id }: NodeProps) {
  const status = (data as any)?.status ?? "off";
  const applied = (data as any)?.color as string | null | undefined;

  const handlers: HandleType[] = [
    // TOP — верхняя горизонтальная линия
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[6px] left-[25%]!",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[6px] left-[25%]!",
    },

    // BOTTOM — нижняя горизонтальная линия
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[6px] left-[25%]!",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !bottom-[6px] left-[25%]!",
    },
  ];

  const icon =
    status === "on" ? (
      <OnDisconnectorWithGroundingIcon fill={applied ?? undefined} />
    ) : (
      <OffDisconnectorWithGroundingIcon fill={applied ?? undefined} />
    );

  return (
    <BaseNode
      id={id}
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      disableOverlay={true}
    />
  );
}

export default DisconnectorWithGroundingNode;