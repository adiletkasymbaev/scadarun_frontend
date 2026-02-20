import { Position, type NodeProps } from "@xyflow/react";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

type TextNodeData = {
  text?: string;
  width?: number;
  height?: number;
  bgColor?: string;   // можно EditorColor, можно любой hex
  textColor?: string; // можно EditorColor, можно любой hex
  fontSize?: number;
  status?: "on" | "off" | "alarm";
};

export default function TextNode({ selected, data, id }: NodeProps) {
  const d = (data ?? {}) as TextNodeData;

  const text = d.text ?? "Текст";
  const w = d.width ?? 140;
  const h = d.height ?? 48;
  const bg = d.bgColor ?? "#111827"; // slate-900
  const color = d.textColor ?? "#FFFFFF";
  const fontSize = d.fontSize ?? 14;

  const status = d.status ?? "on";

  const handlers: HandleType[] = [];

  const icon = (
    <div
      className="rounded-md px-2 flex items-center justify-center text-center leading-tight select-none"
      style={{
        width: w,
        height: h,
        background: bg,
        color,
        fontSize,
        border: selected ? "2px solid rgba(255,255,255,0.6)" : "2px solid rgba(255,255,255,0.15)",
      }}
      title={text}
    >
      <span className="truncate">{text}</span>
    </div>
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      disableOverlay // обычно для текстовой лучше без off/alarm заливки
    />
  );
}