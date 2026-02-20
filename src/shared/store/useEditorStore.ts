import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge, Node, Viewport } from "@xyflow/react";
import { propagateOff } from "../utils/propagateStatus";
import { applyPowerPropagation as applyPropagation } from "../utils/applyPowerPropagation";

export const COLOR_OPTIONS = [
  { value: "#FFFFFF", label: "Белый" },
  { value: "#000000", label: "Черный" },
  { value: "#3A9D6B", label: "Зелёный" },
  { value: "#4242A0", label: "Синий" },
  { value: "#BD3ABD", label: "Фиолетовый" },
  { value: "#EA7474", label: "Красный" },
] as const;

export type EditorColor = (typeof COLOR_OPTIONS)[number]["value"];

export const VOLTAGE_OPTIONS = [
  { value: "0.4", label: "0.4 кВ" },
  { value: "6", label: "6 кВ" },
  { value: "10", label: "10 кВ" },
  { value: "35", label: "35 кВ" },
  { value: "110", label: "110 кВ" },
  { value: "220", label: "220 кВ" },
] as const;

export type NominalVoltage = (typeof VOLTAGE_OPTIONS)[number]["value"];

export type FlowSchema = {
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
};

type EditorState = {
  // ui
  color: EditorColor;
  isEditing: boolean;
  busColor: EditorColor;
  edgeColor: EditorColor,

  // flow
  schema: FlowSchema;

  // ui actions
  setColor: (color: EditorColor) => void;
  setEditing: (value: boolean) => void;
  setBusColor: (color: EditorColor) => void;
  setEdgeColor: (color: EditorColor) => void;

  // schema actions
  setSchema: (schema: FlowSchema) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setViewport: (viewport?: Viewport) => void;
  recomputeStatuses: () => void;
  resetSchema: () => void;
  applyPowerPropagation: () => void;

  // NEW actions для контекст-меню/удаления
  updateNodeData: (nodeId: string, patch: Record<string, any>) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  deleteSelected: (nodeIds: string[], edgeIds: string[]) => void;
};

const INITIAL_SCHEMA: FlowSchema = {
  nodes: [
    {
      id: "t1",
      type: "AutoTransformerSingleWindingNode",
      position: { x: 200, y: 200 },
      data: { color: "#4242A0", voltage: "10" },
    },
    {
      id: "t2",
      type: "AutoTransformerSingleWindingNode",
      position: { x: 0, y: 100 },
      data: { color: "#4242A0", voltage: "10" },
    },
  ],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      // ui
      color: "#4242A0",
      isEditing: false,
      busColor: "#EA7474",
      edgeColor: "#4242A0",

      // flow
      schema: INITIAL_SCHEMA,

      // ui actions
      setColor: (color) => set({ color }),
      setEditing: (isEditing) => set({ isEditing }),
      setEdgeColor: (edgeColor) => set({ edgeColor }),
      setBusColor: (busColor) => set({ busColor }),

      // schema actions
      setSchema: (schema) => set({ schema }),
      setNodes: (nodes) => set((s) => ({ schema: { ...s.schema, nodes } })),
      setEdges: (edges) => set((s) => ({ schema: { ...s.schema, edges } })),
      setViewport: (viewport) => set((s) => ({ schema: { ...s.schema, viewport } })),
      resetSchema: () => set({ schema: INITIAL_SCHEMA }),
      recomputeStatuses: () => {
        const { schema } = get();
        const nodes = recomputePower(schema.nodes, schema.edges);
        set({ schema: { ...schema, nodes } });
      },
      applyPowerPropagation: () => {
        const { schema } = get();
        const nodes = applyPropagation(schema.nodes, schema.edges);
        set({ schema: { ...schema, nodes } });
      },

      // NEW actions
      updateNodeData: (nodeId, patch) => {
        const { schema } = get();
        const nodes = schema.nodes.map((n) =>
          n.id === nodeId ? { ...n, data: { ...(n.data as any), ...patch } } : n
        );
        set({ schema: { ...schema, nodes } });
      },

      deleteNode: (nodeId) => {
        const { schema } = get();
        const nodes = schema.nodes.filter((n) => n.id !== nodeId);
        const edges = schema.edges.filter((e) => e.source !== nodeId && e.target !== nodeId);
        set({ schema: { ...schema, nodes, edges } });
      },

      deleteEdge: (edgeId) => {
        const { schema } = get();
        const edges = schema.edges.filter((e) => e.id !== edgeId);
        set({ schema: { ...schema, edges } });
      },

      deleteSelected: (nodeIds, edgeIds) => {
        const { schema } = get();
        const nodeSet = new Set(nodeIds);
        const edgeSet = new Set(edgeIds);

        const nodes = schema.nodes.filter((n) => !nodeSet.has(n.id));
        const edges = schema.edges
          .filter((e) => !edgeSet.has(e.id))
          .filter((e) => !nodeSet.has(e.source) && !nodeSet.has(e.target));

        set({ schema: { ...schema, nodes, edges } });
      },
    }),
    {
      name: "editor-store-v1",
      version: 1,
      partialize: (s) => ({
        color: s.color,
        busColor: s.busColor,
        isEditing: s.isEditing,
        schema: s.schema,
        edgeColor: s.edgeColor
      }),
    }
  )
);