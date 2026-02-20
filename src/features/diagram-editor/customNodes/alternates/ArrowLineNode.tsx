// ArrowLineNode.tsx
// data:
// {
//   length?: number;     // px, default 180
//   rotation?: number;   // deg, default 0
//   color?: string;      // default "#000000"
//   status?: "on" | "off" | "alarm" (optional, if your BaseNode uses it elsewhere)
// }
//
// NOTE: resize — тянем за правый “хвост” (конец со стрелкой). Вращение — отдельной ручкой.

import { Handle, Position } from "@xyflow/react";
import { useRef, useMemo, useCallback } from "react";
import { useEditorStore } from "../../store/useEditorStore";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function ArrowLineNode({ id, selected, data }: any) {
  const length = Number((data as any)?.length ?? 180) || 180;
  const rotation = Number((data as any)?.rotation ?? 0) || 0;
  const color = String((data as any)?.color ?? "#000000");
  const isEditing = useEditorStore((s) => s.isEditing);

  const updateNodeData = useEditorStore((s: any) => s.updateNodeData);

  const resizingRef = useRef<null | {
    startX: number;
    startY: number;
    startLen: number;
    rot: number;
  }>(null);

  const rotatingRef = useRef<null | {
    startX: number;
    startY: number;
    startRot: number;
    centerX: number;
    centerY: number;
  }>(null);

  const markerId = useMemo(() => `arrow_marker_${id}`, [id]);

  const onResizeDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    resizingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLen: length,
      rot: rotation,
    };
  }, [length, rotation]);

  const onRotateDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    // берем центр “линии” из DOM
    const el = (e.currentTarget as HTMLElement).closest("[data-arrowline-wrap='1']") as HTMLElement | null;
    const rect = el?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : e.clientX;
    const cy = rect ? rect.top + rect.height / 2 : e.clientY;

    rotatingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startRot: rotation,
      centerX: cx,
      centerY: cy,
    };
  }, [rotation]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    // resize
    if (resizingRef.current) {
      e.preventDefault();
      e.stopPropagation();

      const st = resizingRef.current;
      const dx = e.clientX - st.startX;
      const dy = e.clientY - st.startY;

      // проекция на ось линии (учитываем rotation)
      const rad = degToRad(st.rot);
      const axisX = Math.cos(rad);
      const axisY = Math.sin(rad);
      const proj = dx * axisX + dy * axisY;

      const nextLen = clamp(Math.round(st.startLen + proj), 40, 1600);
      updateNodeData(id, { length: nextLen });
      return;
    }

    // rotate
    if (rotatingRef.current) {
      e.preventDefault();
      e.stopPropagation();

      const st = rotatingRef.current;

      const a0 = Math.atan2(st.startY - st.centerY, st.startX - st.centerX);
      const a1 = Math.atan2(e.clientY - st.centerY, e.clientX - st.centerX);

      const deltaDeg = ((a1 - a0) * 180) / Math.PI;
      const nextRot = Math.round(st.startRot + deltaDeg);

      updateNodeData(id, { rotation: nextRot });
    }
  }, [id, updateNodeData]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (resizingRef.current) {
      resizingRef.current = null;
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    }
    if (rotatingRef.current) {
      rotatingRef.current = null;
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    }
  }, []);

  return (
    <div
      data-arrowline-wrap="1"
      className={[
        "relative"
      ].join(" ")}
      style={{
        width: length,
        height: 32, // зона для хендлов/ручек
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Rotated content */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "50% 50%",
        }}
      >

        {/* The line (SVG) */}
        <svg
          className="absolute left-0 top-0"
          width={length}
          height={32}
          viewBox={`0 0 ${length} 32`}
          fill="none"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="10"
              markerHeight="10"
              refX="0"
              refY="5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill={color} />
            </marker>
          </defs>

          <line
            x1="6"
            y1="16"
            x2={Math.max(6, length - 10)}
            y2="16"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd={`url(#${markerId})`}
          />
        </svg>

        {/* Rotate handle (сверху по центру) */}
        {isEditing && (
          <div
            onPointerDown={onRotateDown}
            title="Повернуть"
            className={[
              "absolute -top-3 left-1/2 -translate-x-1/2",
              "h-5 w-5 rounded-full border border-black/15 bg-white shadow-sm",
              "cursor-grab active:cursor-grabbing",
            ].join(" ")}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: selected ? "0 0 0 3px rgba(229,117,11,.20)" : "none" }}
            />
          </div>
        )}

        {/* Resize handle (справа, на конце стрелки) */}
        {isEditing && (
          <div
            onPointerDown={onResizeDown}
            title="Тянуть длину"
            className={[
              "absolute -right-4 top-1/2 -translate-y-1/2 translate-x-2",
              "h-5 w-5 rounded-full border border-black/15 bg-white shadow-sm",
              "cursor-ew-resize",
            ].join(" ")}
          >
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20" />
          </div>
        )}
      </div>
    </div>
  );
}