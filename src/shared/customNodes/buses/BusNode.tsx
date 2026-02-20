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
const MIN_WIDTH = 80;
const MAX_WIDTH = 1200;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makePortId() {
  return `p_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function sortPorts(ports: BusPort[]) {
  return [...ports].sort((a, b) => a.xPct - b.xPct);
}

function pxToPct(px: number, widthPx: number) {
  if (widthPx <= 0) return 0;
  return (px / widthPx) * 100;
}

export default function BusNode({ id, data, selected }: FlowNode<BusNodeData>) {
  const { setNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const barRef = useRef<HTMLDivElement | null>(null);

  const color = data?.color ?? "#3b82f6";
  const width = data?.width ?? 240;
  const ports = data?.ports ?? [];

  const [isResizing, setIsResizing] = useState(false);
  const [draggingPortId, setDraggingPortId] = useState<string | null>(null);

  // ✅ важное: когда меняются handles/размер — пересчитать internals
  useEffect(() => {
    // rAF чтобы после setState DOM уже обновился
    const t = requestAnimationFrame(() => updateNodeInternals(id));
    return () => cancelAnimationFrame(t);
  }, [id, ports.length, width, updateNodeInternals]);

  const handleClass = useMemo(
    () => "!h-2.5 !w-2.5 !border-2 !border-white !h-2.5 !w-2.5 !border-2 !border-white !z-50 !pointer-events-auto",
    []
  );

  function updateSelf(patch: Partial<BusNodeData>) {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;
        return { ...n, data: { ...(n.data as BusNodeData), ...patch } };
      })
    );
    // ✅ если меняли порты/ширину — просим пересчитать сразу
    requestAnimationFrame(() => updateNodeInternals(id));
  }

  function getBarRect() {
    const el = barRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }

  function clientXToPct(clientX: number) {
    const rect = getBarRect();
    if (!rect) return null;
    const x = clamp(clientX - rect.left, 0, rect.width);
    return (x / rect.width) * 100;
  }

  function clampByNeighbors(portId: string, desiredPct: number, nextPorts: BusPort[], widthPx: number) {
    const sorted = sortPorts(nextPorts);
    const idx = sorted.findIndex((p) => p.id === portId);
    if (idx === -1) return desiredPct;

    const gapPct = pxToPct(MIN_PORT_GAP_PX, widthPx);

    const leftNeighbor = sorted[idx - 1];
    const rightNeighbor = sorted[idx + 1];

    const minPct = leftNeighbor ? leftNeighbor.xPct + gapPct : 0;
    const maxPct = rightNeighbor ? rightNeighbor.xPct - gapPct : 100;

    return clamp(desiredPct, minPct, maxPct);
  }

  function addPortAtClientX(clientX: number) {
    const pct = clientXToPct(clientX);
    const rect = getBarRect();
    if (pct == null || !rect) return;

    const idNew = makePortId();
    const nextPorts = [...ports, { id: idNew, xPct: pct }];

    const fixedPct = clampByNeighbors(idNew, pct, nextPorts, rect.width);

    updateSelf({
      ports: nextPorts.map((p) => (p.id === idNew ? { ...p, xPct: fixedPct } : p)),
    });
  }

  function onBarClick(e: React.MouseEvent) {
    if (isResizing) return;
    if (draggingPortId) return;
    addPortAtClientX(e.clientX);
  }

  function removePort(portId: string) {
    updateSelf({ ports: ports.filter((p) => p.id !== portId) });
  }

  function startDragPort(portId: string, e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();

    const rect = getBarRect();
    if (!rect) return;

    setDraggingPortId(portId);

    const onMove = (ev: PointerEvent) => {
      const desiredPct = clientXToPct(ev.clientX);
      if (desiredPct == null) return;

      const nextPorts = ports.map((p) => (p.id === portId ? { ...p, xPct: desiredPct } : p));
      const fixedPct = clampByNeighbors(portId, desiredPct, nextPorts, rect.width);

      updateSelf({
        ports: ports.map((p) => (p.id === portId ? { ...p, xPct: fixedPct } : p)),
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

    const startX = e.clientX;
    const startW = width;

    const onMove = (ev: PointerEvent) => {
      const delta = ev.clientX - startX;
      const nextW = clamp(startW + delta, MIN_WIDTH, MAX_WIDTH);
      updateSelf({ width: nextW });
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
    <div
      className="group relative rounded-md ring-1 ring-transparent overflow-visible"
      style={{ width }}
    >
      {/* Шина */}
      <div
        ref={barRef}
        onClick={onBarClick}
        className="relative h-1.5 cursor-crosshair"
        style={{
          background: color,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.15) inset",
        }}
        title="Клик — добавить порт"
      />

      {/* Resize grip — только при hover */}
      <div
        onPointerDown={onResizePointerDown}
        className="absolute top-1/2 -right-6 -translate-y-1/2 h-8 w-2 rounded cursor-ew-resize
                   opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
        title="Тяни — изменить ширину"
      />

      {/* Порты */}
      {ports.map((p) => (
        <div key={p.id}>
          {/* ✅ handles по вертикали в ЦЕНТРЕ линии (top-1/2 + -mt) */}
          <Handle
            id={`${p.id}-t`}
            type="target"
            position={Position.Top}
            className={`${handleClass} !top-2/2 !-mt-[5px]`}
            style={{ left: `${p.xPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-s`}
            type="source"
            position={Position.Top}
            className={`${handleClass} !top-2/2 !-mt-[5px]`}
            style={{ left: `${p.xPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-tb`}
            type="target"
            position={Position.Bottom}
            className={`${handleClass} !bottom-2/2 !-mb-[2px]`}
            style={{ left: `${p.xPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-sb`}
            type="source"
            position={Position.Bottom}
            className={`${handleClass} !bottom-2/2 !-mb-[2px]`}
            style={{ left: `${p.xPct}%`, background: color }}
          />

          {/* Контрол: drag + delete */}
          <div
            className="absolute !z-40 pointer-events-auto"
            style={{
              left: `${p.xPct}%`,
              top: "50%",
              marginTop: -18, // выше линии, чтобы не мешать коннекту
              transform: "translateX(-50%)",
            }}
          >
            <button
              type="button"
              className="h-1.5 w-6 mt-[14.5px] rounded-full bg-transparent border border-transparent hover:bg-white/20 hover:border-white/30 cursor-ew-resize"
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