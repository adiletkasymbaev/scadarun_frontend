export type RingKey = string;

export type RingMetaItem = {
  key: RingKey;
  label: string;
  defaultColor: string;
};

export const RING_META_BY_NODETYPE: Record<string, RingMetaItem[]> = {
  TwoWindingTransformerNode: [
    { key: "top", label: "Верхнее кольцо", defaultColor: "#EA7474" },
    { key: "bottom", label: "Нижнее кольцо", defaultColor: "#BD3ABD" },
  ],

  ThreeWindingTransformerNode: [
    { key: "top", label: "Верхнее кольцо", defaultColor: "#EA7474" },
    { key: "left", label: "Левое кольцо", defaultColor: "#4242A0" },
    { key: "right", label: "Правое кольцо", defaultColor: "#BD3ABD" },
  ],

  FourWindingTransformerNode: [
    { key: "top", label: "Верхнее кольцо", defaultColor: "#EA7474" },
    { key: "bottom", label: "Нижнее кольцо", defaultColor: "#BD3ABD" },
    { key: "left", label: "Левое кольцо", defaultColor: "#4242A0" },
    { key: "right", label: "Правое кольцо", defaultColor: "#3A9D6B" },
  ],

  FourWindingTransformerAltNode: [
    { key: "top", label: "Верхнее кольцо", defaultColor: "#EA7474" },
    { key: "center", label: "Центральное кольцо", defaultColor: "#BD3ABD" },
    { key: "leftBottom", label: "Левое нижнее кольцо", defaultColor: "#4242A0" },
    { key: "rightBottom", label: "Правое нижнее кольцо", defaultColor: "#3A9D6B" },
  ],

  FourWindingTransformerAlt2Node: [
    { key: "topLeft", label: "Верхнее левое", defaultColor: "#EA7474" },
    { key: "topRight", label: "Верхнее правое", defaultColor: "#BD3ABD" },
    { key: "bottomLeft", label: "Нижнее левое", defaultColor: "#4242A0" },
    { key: "bottomRight", label: "Нижнее правое", defaultColor: "#3A9D6B" },
  ],

  FourWindingAutoTransformerNode: [
    { key: "top", label: "Верхнее кольцо", defaultColor: "#EA7474" },
    { key: "bottom", label: "Нижнее кольцо", defaultColor: "#BD3ABD" },
    { key: "left", label: "Левое нижнее кольцо", defaultColor: "#4242A0" },
    { key: "right", label: "Правое нижнее кольцо", defaultColor: "#3A9D6B" },
    { key: "link", label: "Связь (перемычка)", defaultColor: "#FFFFFF" },
  ],

  FiveWindingTransformerNode: [
    { key: "topLeft", label: "Верхнее левое", defaultColor: "#EA7474" },
    { key: "topRight", label: "Верхнее правое", defaultColor: "#BD3ABD" },
    { key: "bottomLeft", label: "Нижнее левое", defaultColor: "#4242A0" },
    { key: "bottomCenter", label: "Нижнее центральное", defaultColor: "#3A9D6B" },
    { key: "bottomRight", label: "Нижнее правое", defaultColor: "#FFFFFF" },
  ],

  AutoTransformerTwoWindingVerticalNode: [
    { key: "top", label: "Верхнее кольцо", defaultColor: "#EA7474" },
    { key: "bottom", label: "Нижнее кольцо", defaultColor: "#BD3ABD" },
  ],

  AutoTransformerTwoWindingHorizontalNode: [
    { key: "left", label: "Левое кольцо", defaultColor: "#EA7474" },
    { key: "right", label: "Правое кольцо", defaultColor: "#BD3ABD" },
  ],

  AutoTransformerSingleWindingNode: [
    { key: "ring", label: "Кольцо", defaultColor: "#EA7474" },
  ],
};