import { Position, type NodeProps } from "@xyflow/react";
import { OffDisconnectorIcon } from "../../icons/OffDisconnectorIcon";
import { OnDisconnectorIcon } from "../../icons/OnDisconnectorIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function DisconnectorNode({ selected, data, id }: NodeProps) {
  const status = (data as any)?.status ?? "off";
  const applied = (data as any)?.color as string | null | undefined;

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

  const icon =
    status === "on" ? (
      <OnDisconnectorIcon fill={applied ?? undefined} />
    ) : (
      <OffDisconnectorIcon fill={applied ?? undefined} />
    );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      disableOverlay={true}
    />
  );
}

export default DisconnectorNode;