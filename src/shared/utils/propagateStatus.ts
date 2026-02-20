import type { Edge, Node } from "@xyflow/react";

type EquipmentStatus = "on" | "off" | "alarm";

function getStatus(n: Node): EquipmentStatus {
  return ((n.data as any)?.status ?? "on") as EquipmentStatus;
}

function setStatus(n: Node, status: EquipmentStatus): Node {
  return { ...n, data: { ...(n.data as any), status } };
}

export function propagateOff(nodes: Node[], edges: Edge[]) {
  // adjacency: source -> [target...]
  const out = new Map<string, string[]>();
  for (const e of edges) {
    if (!e.source || !e.target) continue;
    const arr = out.get(e.source) ?? [];
    arr.push(e.target);
    out.set(e.source, arr);
  }

  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  // стартовые точки: любые off/alarm
  const queue: string[] = [];
  const visited = new Set<string>();

  for (const n of nodes) {
    const st = getStatus(n);
    if (st === "off" || st === "alarm") {
      queue.push(n.id);
      visited.add(n.id);
    }
  }

  const shouldForceOff = new Set<string>();

  // BFS дальше по схеме
  while (queue.length) {
    const cur = queue.shift()!;
    const nexts = out.get(cur) ?? [];
    for (const t of nexts) {
      if (!visited.has(t)) {
        visited.add(t);
        shouldForceOff.add(t);
        queue.push(t);
      }
    }
  }

  // применяем:
  // - если нода сама alarm — оставляем alarm
  // - если нода сама off — оставляем off
  // - иначе ставим off если она "дальше" от off/alarm
  const nextNodes = nodes.map((n) => {
    const st = getStatus(n);

    if (st === "alarm") return n;
    if (st === "off") return n;

    if (shouldForceOff.has(n.id)) {
      return setStatus(n, "off");
    }

    // иначе оставляем как есть
    return n;
  });

  return nextNodes;
}