import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, type ReactNode } from "react";
import type { HandleType } from "../types/handle";
import { useEditorStore } from "../store/useEditorStore";
import { AlarmIconWithNoPower } from "../icons/AlarmIconWithNoPower";

const order = [Position.Top, Position.Right, Position.Bottom, Position.Left] as const;

function rotatePosition(pos: Position, rotationDeg: number) {
  const steps = ((((rotationDeg / 90) | 0) % 4) + 4) % 4;
  const i = order.indexOf(pos as any);
  if (i === -1) return pos;
  return order[(i + steps) % 4];
}

interface ComponentProps {
  icon: ReactNode;
  handlers: HandleType[];
  selected?: boolean;
  status?: "on" | "off" | "alarm";
  disableOverlay?: boolean;
  rotation?: number;
  id: string;
}

function BaseNode({
  icon,
  handlers,
  selected = false,
  status = "on",
  disableOverlay = false,
  rotation = 0,
  id
}: ComponentProps) {
  const isEditing = useEditorStore((s) => s.isEditing);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    requestAnimationFrame(() => updateNodeInternals(id));
  }, [id, rotation, handlers.length, updateNodeInternals]);

  return (
    <div 
      className="relative inline-block"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "50% 50%",
      }}
    >
      {/* ICON */}
      {icon}

      {/* STATUS OVERLAYS */}
      {!disableOverlay && status === "off" && (
        <div 
          className="absolute inset-0 rounded-md bg-slate-400/60 pointer-events-none flex justify-center items-center"
          style={{
            transform: `rotate(-${rotation}deg)`,
            transformOrigin: "50% 50%",
          }}
        >
          <AlarmIconWithNoPower size={40} />
        </div>
      )}

      {!disableOverlay && status === "alarm" && (
        <div
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,0,0,0.45) 0px, rgba(255,0,0,0.45) 6px, transparent 6px, transparent 12px)",
            transform: `rotate(-${rotation}deg)`,
            transformOrigin: "50% 50%",
          }}
        />
      )}

      {/* HANDLES */}
      {handlers.map((h) => {
        const rotatedPos = rotatePosition(h.direction, rotation);

        return (
          <Handle
            key={h.id}
            id={h.id}
            type={h.type}
            position={rotatedPos}
            className={`${isEditing ? "opacity-100" : "opacity-0"} ${h.className ?? ""}`}
          />
        );
      })}
    </div>
  );
}

export default BaseNode;