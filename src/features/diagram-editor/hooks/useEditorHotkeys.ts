import { useEffect } from "react";

export function useEditorHotkeys(args: {
  selection: { nodeIds: string[]; edgeIds: string[] };
  deleteSelected: (nodeIds: string[], edgeIds: string[]) => void;
  closeMenus: () => void;
  applyPowerPropagation: () => void;
}) {
  const { selection, deleteSelected, closeMenus, applyPowerPropagation } = args;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;

      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (!selection.nodeIds.length && !selection.edgeIds.length) return;

      e.preventDefault();
      deleteSelected(selection.nodeIds, selection.edgeIds);
      closeMenus();
      queueMicrotask(applyPowerPropagation);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selection, deleteSelected, closeMenus, applyPowerPropagation]);
}