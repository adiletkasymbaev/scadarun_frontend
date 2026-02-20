import type { Edge, Node } from "@xyflow/react";

export type EquipmentStatus = "on" | "off" | "alarm";

function getStatus(n: Node): EquipmentStatus {
  return (((n.data as any)?.status ?? "on") as EquipmentStatus);
}

function getForcedOff(n: Node): boolean {
  return Boolean((n.data as any)?.forcedOff);
}

function patchNode(n: Node, patch: Record<string, any>): Node {
  return { ...n, data: { ...(n.data as any), ...patch } };
}

/**
 * Применяет "распространение питания" по связям:
 * - off/alarm у upstream режет питание дальше
 * - downstream становится off (forcedOff=true)
 * - когда питание вернулось, forcedOff ноды возвращаются в on
 */
export function applyPowerPropagation(nodes: Node[], edges: Edge[]): Node[] {
  // adjacency: source -> [targets]
  const out = new Map<string, string[]>();
  const indeg = new Map<string, number>();

  for (const n of nodes) indeg.set(n.id, 0);

  for (const e of edges) {
    if (!e.source || !e.target) continue;
    out.set(e.source, [...(out.get(e.source) ?? []), e.target]);
    indeg.set(e.target, (indeg.get(e.target) ?? 0) + 1);
  }

  // 1) Источники питания:
  // сейчас — все ноды без входящих ребер
  // (если хочешь "только BusNode/GeneratorNode" — скажи, поменяем)
  const sources = nodes
    .filter((n) => (indeg.get(n.id) ?? 0) === 0)
    .map((n) => n.id);

  // 2) Какие ноды запитаны (reachable), НЕ проходя через off/alarm
  const powered = new Set<string>();
  const q = [...sources];

  while (q.length) {
    const id = q.shift()!;
    if (powered.has(id)) continue;
    powered.add(id);

    const node = nodes.find((n) => n.id === id);
    if (!node) continue;

    const st = getStatus(node);
    if (st === "off" || st === "alarm") continue; // дальше не проводим

    for (const t of out.get(id) ?? []) q.push(t);
  }

  // 3) Применяем результат к нодам
  return nodes.map((n) => {
    const st = getStatus(n);

    // авария — не "лечим" автоматически
    if (st === "alarm") return n;

    const hasPower = powered.has(n.id);

    if (!hasPower) {
      // если пользователь сам выключил (forcedOff=false), не трогаем
      if (st === "off" && !getForcedOff(n)) return n;

      // иначе выключаем принудительно
      return patchNode(n, { status: "off", forcedOff: true });
    }

    // есть питание
    if (getForcedOff(n)) {
      // возвращаем обратно только то, что выключали принудительно
      return patchNode(n, { status: "on", forcedOff: false });
    }

    return n;
  });
}