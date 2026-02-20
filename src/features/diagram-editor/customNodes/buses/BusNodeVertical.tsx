import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import type { BusNodeData, BusPort } from "../../types/bus";

const MIN_PORT_GAP_PX = 14;
const MIN_HEIGHT = 80;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function clampMin(n: number, min: number) {
  return n < min ? min : n;
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

export default function BusNodeVertical({ id, data }: NodeProps) {
  const rf = useReactFlow();
  const { setNodes } = rf;
  const updateNodeInternals = useUpdateNodeInternals();

  const barRef = useRef<HTMLDivElement | null>(null);

  const bus = data as BusNodeData | undefined;
  const color = bus?.color ?? "#3b82f6";
  const height = bus?.height ?? 240;
  const ports = bus?.ports ?? [];

  const [isResizing, setIsResizing] = useState(false);
  const [draggingPortId, setDraggingPortId] = useState<string | null>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => updateNodeInternals(id));
    return () => cancelAnimationFrame(t);
  }, [id, ports.length, height, updateNodeInternals]);

  const handleClass = useMemo(
    () => "!h-2.5 !w-2.5 !border-2 !border-white !z-50 !pointer-events-auto",
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
    return el ? el.getBoundingClientRect() : null;
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
    const rect = getBarRect();
    const pct = clientYToPct(clientY);
    if (!rect || pct == null) return;

    const idNew = makePortId();
    const nextPorts: BusPort[] = [...ports, { id: idNew, yPct: pct }];

    const fixedPct = clampByNeighbors(idNew, pct, nextPorts, rect.height);

    updateSelf({
      ports: nextPorts.map((p) =>
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
    updateSelf({ ports: ports.filter((p) => p.id !== portId) });
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

      const nextPorts = ports.map((p) =>
        p.id === portId ? { ...p, yPct: desiredPct } : p
      );
      const fixedPct = clampByNeighbors(
        portId,
        desiredPct,
        nextPorts,
        rect.height
      );

      updateSelf({
        ports: ports.map((p) =>
          p.id === portId ? { ...p, yPct: fixedPct } : p
        ),
      });
    };

    const onUp = () => {
      setDraggingPortId(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
  }

  // ✅ Ресайз сверху, НИЗ фиксирован, БЕЗ MAX:
  // height меняем, и position.y меняем на -deltaHeight (с учетом zoom)
  function onResizePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const grip = e.currentTarget as HTMLElement;
    grip.setPointerCapture?.(e.pointerId);

    const startClientY = e.clientY;
    const startH = height;

    const startNode = rf.getNode(id);
    const startPosY = startNode?.position?.y ?? 0;

    const onMove = (ev: PointerEvent) => {
      // тянем вверх => clientY уменьшается => deltaClient положительный
      const deltaClient = startClientY - ev.clientY;

      // ✅ компенсируем zoom (чтобы было 1:1)
      const zoom = rf.getViewport().zoom || 1;
      const deltaCanvas = deltaClient / zoom;

      // ✅ только минимум, без максимума
      const nextH = clampMin(startH + deltaCanvas, MIN_HEIGHT);

      // ✅ фактически примененная дельта (после clamp)
      const appliedDelta = nextH - startH;

      setNodes((prev) =>
        prev.map((n) => {
          if (n.id !== id) return n;

          return {
            ...n,
            position: { ...n.position, y: startPosY - appliedDelta }, // 👈 низ фиксирован
            data: { ...(n.data as BusNodeData), height: nextH },
          };
        })
      );

      requestAnimationFrame(() => updateNodeInternals(id));
    };

    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
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

      {/* ✅ Resize grip — сверху (тяни вверх) */}
      <div
        onPointerDown={onResizePointerDown}
        className="absolute left-1/2 -top-6 -translate-x-1/2 w-8 h-2 rounded cursor-ns-resize
                   opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
        title="Тяни вверх — изменить высоту (низ фиксирован)"
      />

      {/* Порты */}
      {ports.map((p) => (
        <div key={p.id}>
          {/* LEFT */}
          <Handle
            id={`${p.id}-tl`}
            type="target"
            position={Position.Top}
            className={`${handleClass} !left-2/2 !-ml-[5px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-sl`}
            type="source"
            position={Position.Top}
            className={`${handleClass} !left-2/2 !-ml-[5px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />

          {/* RIGHT */}
          <Handle
            id={`${p.id}-tr`}
            type="target"
            position={Position.Top}
            className={`${handleClass} !right-2/2 !-mr-[2px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />
          <Handle
            id={`${p.id}-sr`}
            type="source"
            position={Position.Top}
            className={`${handleClass} !right-2/2 !-mr-[2px]`}
            style={{ top: `${p.yPct}%`, background: color }}
          />

          {/* Контрол: drag + delete */}
          <div
            className="absolute !z-40 pointer-events-auto"
            style={{
              top: `${p.yPct}%`,
              left: "50%",
              marginLeft: -18,
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