export type DnDPayload = { nodeType: string; data?: Record<string, any> };

export function safeParseDnD(raw: string): DnDPayload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DnDPayload;
    return parsed?.nodeType ? parsed : null;
  } catch {
    return null;
  }
}