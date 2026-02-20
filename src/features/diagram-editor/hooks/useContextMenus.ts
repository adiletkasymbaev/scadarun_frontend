import { useCallback, useMemo, useState, type RefObject } from "react";
import type { Node, NodeMouseHandler } from "@xyflow/react";
import { getSmartMenuPos } from "../lib/getSmartMenuPos";

type CtxState =
  | null
  | {
      nodeId: string;
      x: number;
      y: number;
    };

type MenuSizes = {
  nodeMenu: { w: number; h: number };
  textMenu: { w: number; h: number };
  selectionMenu: { w: number; h: number };
};

const DEFAULT_SIZES: MenuSizes = {
  nodeMenu: { w: 256, h: 380 },      // w-64 + контент
  textMenu: { w: 256, h: 360 },      // w-64 + контент
  selectionMenu: { w: 224, h: 90 },  // w-56
};

export function useContextMenus<TNode extends Node>(
  nodes: TNode[],
  hasSelection: boolean,
  canvasRef: RefObject<HTMLElement | null>,
  sizes: MenuSizes = DEFAULT_SIZES
) {
  const [ctx, setCtx] = useState<CtxState>(null);
  const [selMenu, setSelMenu] = useState<null | { x: number; y: number }>(null);

  const closeAll = useCallback(() => {
    setCtx(null);
    setSelMenu(null);
  }, []);

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      event.preventDefault();
      event.stopPropagation();

      setSelMenu(null);

      const el = canvasRef.current;
      if (!el) {
        // fallback как было
        setCtx({ nodeId: node.id, x: event.clientX, y: event.clientY });
        return;
      }

      const menuSize = node.type === "TextNode" ? sizes.textMenu : sizes.nodeMenu;

      const pos = getSmartMenuPos({
        container: el,
        clientX: event.clientX,
        clientY: event.clientY,
        menuW: menuSize.w,
        menuH: menuSize.h,
        gap: 8,
      });

      setCtx({ nodeId: node.id, x: pos.x, y: pos.y });
    },
    [canvasRef, sizes]
  );

  const onPaneContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setCtx(null);

      if (!hasSelection) return;

      const el = canvasRef.current;
      if (!el) {
        setSelMenu({ x: e.clientX, y: e.clientY });
        return;
      }

      const pos = getSmartMenuPos({
        container: el,
        clientX: e.clientX,
        clientY: e.clientY,
        menuW: sizes.selectionMenu.w,
        menuH: sizes.selectionMenu.h,
        gap: 8,
      });

      setSelMenu({ x: pos.x, y: pos.y });
    },
    [hasSelection, canvasRef, sizes]
  );

  const ctxNode = useMemo(() => {
    if (!ctx) return null;
    return nodes.find((n) => n.id === ctx.nodeId) ?? null;
  }, [ctx, nodes]);

  return {
    ctx,
    setCtx,
    selMenu,
    setSelMenu,
    ctxNode,
    closeAll,
    onNodeContextMenu,
    onPaneContextMenu,
  };
}