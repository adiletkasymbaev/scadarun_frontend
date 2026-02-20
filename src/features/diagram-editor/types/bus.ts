export type BusPort = {
  id: string;
  // позиция порта по X внутри шины в процентах (0..100)
  xPct: number;
};

export type BusNodeData = {
  color: string;
  width: number; // px
  ports: BusPort[];
};
