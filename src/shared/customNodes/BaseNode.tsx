import { Handle } from "@xyflow/react";
import type { ReactNode } from "react";
import type { HandleType } from "../types/handle";
import { useEditorStore } from "../store/useEditorStore";
import AlarmIcon from "../icons/AlarmIcon";
import { AlarmIconWithNoPower } from "../icons/AlarmIconWithNoPower";

interface ComponentProps {
  icon: ReactNode;
  handlers: HandleType[];
  selected?: boolean;
  status?: "on" | "off" | "alarm";
  disableOverlay?: boolean;
}

function BaseNode({
  icon,
  handlers,
  selected = false,
  status = "on",
  disableOverlay = false
}: ComponentProps) {
  const isEditing = useEditorStore((s) => s.isEditing);

  return (
    <div className="relative inline-block">
      {/* ICON */}
      {icon}

      {/* STATUS OVERLAYS */}
      {!disableOverlay && status === "off" && (
        <div className="absolute inset-0 rounded-md bg-slate-400/60 pointer-events-none flex justify-center items-center">
          <AlarmIconWithNoPower size={40} />
        </div>
      )}

      {!disableOverlay && status === "alarm" && (
        <div
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,0,0,0.45) 0px, rgba(255,0,0,0.45) 6px, transparent 6px, transparent 12px)",
          }}
        />
      )}

      {/* HANDLES */}
      {handlers.map((item) => (
        <Handle
          key={item.id}
          id={item.id}
          type={item.type}
          position={item.direction}
          className={`${isEditing ? "opacity-100" : "opacity-0"} ${item.className}`}
        />
      ))}
    </div>
  );
}

export default BaseNode;