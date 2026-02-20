import { clamp } from "./clamp";

export function getSmartMenuPos(args: {
  container: HTMLElement;
  clientX: number;
  clientY: number;
  menuW: number;
  menuH: number;
  gap?: number;
}) {
  const { container, clientX, clientY, menuW, menuH, gap = 8 } = args;

  const rect = container.getBoundingClientRect();

  const px = clientX - rect.left;
  const py = clientY - rect.top;

  const maxX = rect.width - menuW - gap;
  const maxY = rect.height - menuH - gap;

  let x = px + gap;
  let y = py + gap;

  if (x > maxX) x = px - menuW - gap;
  if (y > maxY) y = py - menuH - gap;

  x = clamp(x, gap, Math.max(gap, maxX));
  y = clamp(y, gap, Math.max(gap, maxY));

  return { x, y };
}