import { Position, type NodeProps } from "@xyflow/react";
import { OffDisconnectorIcon } from "../../icons/OffDisconnectorIcon";
import { OnDisconnectorIcon } from "../../icons/OnDisconnectorIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

function DisconnectorVerticalNode({ selected, data, id }: NodeProps) {
  const status = (data as any)?.status ?? "off";
  const applied = (data as any)?.color as string | null | undefined;

  const handlers: HandleType[] = [
    // TOP
    {
      id: "t-top",
      type: "target",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[6px] !left-[25%] ",
    },
    {
      id: "s-top",
      type: "source",
      direction: Position.Top,
      className:
        "custom-node-handle !top-[6px] !left-[25%] ",
    },

    // BOTTOM
    {
      id: "t-bottom",
      type: "target",
      direction: Position.Bottom,
      className:
        "custom-node-handle !left-[50%] !top-[90%]",
    },
    {
      id: "s-bottom",
      type: "source",
      direction: Position.Bottom,
      className:
        "custom-node-handle !left-[50%] !top-[90%]",
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
      id={id}
      rotation={90}
    />
  );
}

export default DisconnectorVerticalNode;