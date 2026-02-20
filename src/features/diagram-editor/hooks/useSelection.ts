import { useCallback, useMemo, useState } from "react";
import type { OnSelectionChangeFunc } from "@xyflow/react";

export function useSelection() {
  const [selection, setSelection] = useState<{ nodeIds: string[]; edgeIds: string[] }>({
    nodeIds: [],
    edgeIds: [],
  });

  const onSelectionChange: OnSelectionChangeFunc = useCallback(({ nodes, edges }) => {
    setSelection({
      nodeIds: nodes.map((n) => n.id),
      edgeIds: edges.map((e) => e.id),
    });
  }, []);

  const hasSelection = useMemo(
    () => selection.nodeIds.length > 0 || selection.edgeIds.length > 0,
    [selection]
  );

  return { selection, setSelection, hasSelection, onSelectionChange };
}