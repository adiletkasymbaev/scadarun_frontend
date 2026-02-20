import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Node as FlowNode } from "@xyflow/react";
import type { BusNodeData, BusPort } from "../../types/bus";

const MIN_PORT_GAP_PX = 14;
const MIN_HEIGHT = 80;
const MAX_HEIGHT = 1200;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makePortId() {
  return `p_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function sortPorts(ports: BusPort[]) {
  return [...ports].sort((a, b) => a.yPct - b.yPct);
}

function pxToPct(px: number, heightPx: number) {
  if (heightPx <= 0) return 0;
  return (px / heightPx) * 100;
}

export default function BusNodeVertical({
  id,
  data,
  selected,
}: FlowNode<BusNodeData>) {
  const { setNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const barRef = useRef<HTMLDivElement | null>(null);

  const color = data?.color ?? "#3b82f6";
  const height = data?.height ?? 240; // 👈 вертикаль
  const ports = data?.ports ?? [];

  const [isResizing, setIsResizing] = useState(false);
  const [draggingPortId, setDraggingPortId] = useState<string | null>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => updateNodeInternals(id));
    return () => cancelAnimationFrame(t);
  }, [id, ports.length, height, updateNodeInternals]);

  const handleClass = useMemo(
    () =>
      "!h-2.5 !w-2.5 !border-2 !border-white !z-50 !pointer-events-auto",
    []
  );

  function updateSelf(patch: Partial<BusNodeData>) {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;
        return { ...n, data: { ...(n.data as BusNodeData), ...patch } };
      })
    );
    requestAnimationFrame(() => updateNodeInternals(id));
  }

  function getBarRect() {
    const el = barRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }

  function clientYToPct(clientY: number) {
    const rect = getBarRect();
    if (!rect) return null;
    const y = clamp(clientY - rect.top, 0, rect.height);
    return (y / rect.height) * 100;
  }

  function clampByNeighbors(
    portId: string,
    desiredPct: number,
    nextPorts: BusPort[],
    heightPx: number
  ) {
    const sorted = sortPorts(nextPorts);
    const idx = sorted.findIndex((p) => p.id === portId);
    if (idx === -1) return desiredPct;

    const gapPct = pxToPct(MIN_PORT_GAP_PX, heightPx);

    const topNeighbor = sorted[idx - 1];
    const bottomNeighbor = sorted[idx + 1];

    const minPct = topNeighbor ? topNeighbor.yPct + gapPct : 0;
    const maxPct = bottomNeighbor ? bottomNeighbor.yPct - gapPct : 100;

    return clamp(desiredPct, minPct, maxPct);
  }

  function addPortAtClientY(clientY: number) {
    const pct = clientYToPct(clientY);
    const rect = getBarRect();
    if (pct == null || !rect) return;

    const idNew = makePortId();
    const nextPorts = [...ports, { id: idNew, yPct: pct } as any];

    const fixedPct = clampByNeighbors(idNew, pct, nextPorts as any, rect.height);

    updateSelf({
      ports: (nextPorts as any).map((p: any) =>
        p.id === idNew ? { ...p, yPct: fixedPct } : p
      ),
    });
  }

  function onBarClick(e: React.MouseEvent) {
    if (isResizing) return;
    if (draggingPortId) return;
    addPortAtClientY(e.clientY);
  }

  function removePort(portId: string) {
    updateSelf({ ports: ports.filter((p: any) => p.id !== portId) });
  }

  function startDragPort(portId: string, e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();

    const rect = getBarRect();
    if (!rect) return;

    setDraggingPortId(portId);

    const onMove = (ev: PointerEvent) => {
      const desiredPct = clientYToPct(ev.clientY);
      if (desiredPct == null) return;

      const nextPorts = (ports as any).map((p: any) =>
        p.id === portId ? { ...p, yPct: desiredPct } : p
      );
      const fixedPct = clampByNeighbors(portId, desiredPct, nextPorts, rect.height);

      updateSelf({
        ports: (ports as any).map((p: any) =>
          p.id === portId ? { ...p, yPct: fixedPct } : p
        ),
      });
    };

    const onUp = () => {
      setDraggingPortId(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function onResizePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startY = e.clientY;
    const startH = height;

    const onMove = (ev: PointerEvent) => {
      const delta = ev.clientY - startY;
      const nextH = clamp(startH + delta, MIN_HEIGHT, MAX_HEIGHT);
      updateSelf({ height: nextH } as any);
    };

    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return (
    <div className="group relative rounded-md ring-1 ring-transparent overflow-visible">
      {/* Шина (вертикальная) */}
      <div
        ref={barRef}
        onClick={onBarClick}
        className="relative w-1.5 cursor-crosshair"
        style={{
          height,
          background: color,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.15) inset",
        }}
        title="Клик — добавить порт"
      />

      {/* Resize grip — только при hover */}
      <div
        onPointerDown={onResizePointerDown}
        className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-8 h-2 rounded cursor-ns-resize
                   opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
        title="Тяни — изменить высоту"
      />

      {/* Порты */}
      {(ports as any[]).map((p) => (
        <div key={p.id}>
          {/* LEFT */}
          <Handle
            id={`${p.id}-tl`}
            type="target"
            position={Position.Left}
            className={`${handleClass} !left-2/2 !-ml-[5px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-sl`}
            type="source"
            position={Position.Left}
            className={`${handleClass} !left-2/2 !-ml-[5px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />

          {/* RIGHT */}
          <Handle
            id={`${p.id}-tr`}
            type="target"
            position={Position.Right}
            className={`${handleClass} !right-2/2 !-mr-[2px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-sr`}
            type="source"
            position={Position.Right}
            className={`${handleClass} !right-2/2 !-mr-[2px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />

          {/* Контрол: drag + delete */}
          <div
            className="absolute !z-40 pointer-events-auto"
            style={{
              top: `${p.yPct}%`,
              left: "50%",
              marginLeft: -18, // левее шины, чтобы не мешать коннекту
              transform: "translateY(-50%)",
            }}
          >
            <button
              type="button"
              className="w-1.5 h-6 ml-[14.5px] rounded-full bg-transparent border border-transparent hover:bg-white/20 hover:border-white/30 cursor-ns-resize"
              title="Drag: перетащи | Alt+Click / ПКМ: удалить"
              onPointerDown={(e) => startDragPort(p.id, e)}
              onClick={(e) => {
                if (e.altKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  removePort(p.id);
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removePort(p.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}