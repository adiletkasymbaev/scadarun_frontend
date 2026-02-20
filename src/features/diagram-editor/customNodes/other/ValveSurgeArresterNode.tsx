import { Position, type NodeProps } from "@xyflow/react";
import { ValveSurgeArresterIcon } from "../../icons/ValveSurgeArresterIcon";
import BaseNode from "../BaseNode";
import type { HandleType } from "../../types/handle";

type Rot = 0 | 90 | 180 | 270;

type Anchor = {
  x: number; // 0..1
  y: number; // 0..1
};

function rotateAnchor(a: Anchor, rotation: Rot): Anchor {
  // вращаем вокруг центра (0.5, 0.5) CLOCKWISE
  const cx = 0.5, cy = 0.5;
  const x = a.x - cx;
  const y = a.y - cy;

  if (rotation === 0) return a;
  if (rotation === 90)  return { x: cx + y,     y: cy - x };
  if (rotation === 180) return { x: cx - x,     y: cy - y };
  // 270
  return { x: cx - y, y: cy + x };
}

function pickSide(a: Anchor): Position {
  // выбираем ближайшую сторону по расстоянию до рамки
  const dTop = a.y;
  const dBottom = 1 - a.y;
  const dLeft = a.x;
  const dRight = 1 - a.x;

  const min = Math.min(dTop, dRight, dBottom, dLeft);
  if (min === dTop) return Position.Top;
  if (min === dRight) return Position.Right;
  if (min === dBottom) return Position.Bottom;
  return Position.Left;
}

function mkHandle(id: string, type: "source" | "target", anchor: Anchor, rotation: Rot): HandleType {
  const r = rotateAnchor(anchor, rotation);
  const side = pickSide(r);

  // BaseNode/Handle обычно абсолютные, поэтому проще стилем:
  return {
    id,
    type,
    direction: side,
    className: "custom-node-handle", // без top/left tailwind
    style: {
      left: `${r.x * 100}%`,
      top: `${r.y * 100}%`,
      transform: "translate(-50%, -50%)",
    } as any, // если твой HandleType не включает style — добавь его в тип
  };
}

function ValveSurgeArresterNode({ selected, data, id }: NodeProps) {
  const d = (data as any) ?? {};
  const applied = d.color as string | null | undefined;
  const status = d.status ?? "on";
  const rotation = (d.rotation ?? 0) as Rot;

  /**
   * Якоря на иконке (rotation=0):
   * - верхний контакт — по центру, чуть ниже края
   * - нижний контакт — левее центра, чуть выше низа
   */
  const TOP: Anchor = { x: 0.5, y: 0.04 };
  const BOTTOM: Anchor = { x: 0.28, y: 0.96 };

  const handlers: HandleType[] = [
    mkHandle("t-a", "target", TOP, rotation),
    mkHandle("s-a", "source", TOP, rotation),

    mkHandle("t-b", "target", BOTTOM, rotation),
    mkHandle("s-b", "source", BOTTOM, rotation),
  ];

  const icon = applied ? (
    <ValveSurgeArresterIcon stroke={applied} fill={applied} />
  ) : (
    <ValveSurgeArresterIcon />
  );

  return (
    <BaseNode
      icon={icon}
      handlers={handlers}
      selected={selected}
      status={status}
      rotation={rotation}
      id={id}
    />
  );
}

export default ValveSurgeArresterNode;