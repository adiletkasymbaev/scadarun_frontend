import type { Position } from "@xyflow/react";

export type HandleType = {
    id: string,
    direction: Position,
    type: "target" | "source",
    className: string,
}