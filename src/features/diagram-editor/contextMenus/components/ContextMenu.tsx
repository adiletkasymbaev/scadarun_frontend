import React from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  type VirtualElement,
} from "@floating-ui/react";

type Props = {
  x: number;
  y: number;
  title: string;
  widthClass?: string;
  onClose: () => void;
  children: React.ReactNode;

  // ✅ новое
  maxHeightClass?: string; // например "max-h-[70vh]"
};

export function ContextMenu({
  x,
  y,
  title,
  widthClass = "w-64",
  maxHeightClass = "max-h-[70vh]",
  onClose,
  children,
}: Props) {
  const virtualReference = React.useMemo<VirtualElement>(
    () => ({
      getBoundingClientRect() {
        return {
          x,
          y,
          left: x,
          top: y,
          right: x,
          bottom: y,
          width: 0,
          height: 0,
          toJSON() {},
        } as DOMRect;
      },
    }),
    [x, y]
  );

  const { refs, floatingStyles, update } = useFloating({
    placement: "right-start",
    middleware: [
      offset(10),
      flip({ padding: 12 }),
      shift({ padding: 12 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  React.useLayoutEffect(() => {
    refs.setReference(virtualReference);
    queueMicrotask(update);
  }, [refs, virtualReference, update]);

  const menu = (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className={[
        "z-[9999]",
        widthClass,
        // ✅ общий текст в меню белый
        "text-white",
        "rounded-2xl border border-white/10 bg-[#0b1220]/95",
        "shadow-[0_18px_60px_rgba(0,0,0,.45)] backdrop-blur",
        "overflow-hidden", // чтобы скролл и радиус были красивые
      ].join(" ")}
    >
      {/* header (не скроллится) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-[12px] font-semibold text-white/85">{title}</div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* content (скроллится) */}
      <div className={["px-4 py-3 overflow-auto", maxHeightClass].join(" ")}>
        {children}
      </div>
    </div>
  );

  return createPortal(menu, document.body);
}