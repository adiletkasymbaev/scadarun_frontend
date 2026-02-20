export default function normalizeSnapshot(snapshot: any) {
  if (!snapshot || typeof snapshot !== "object") return null;

  const nodes = Array.isArray(snapshot.nodes) ? snapshot.nodes : [];
  const edges = Array.isArray(snapshot.edges) ? snapshot.edges : [];
  const viewport = snapshot.viewport && typeof snapshot.viewport === "object" ? snapshot.viewport : undefined;

  return { nodes, edges, viewport };
}