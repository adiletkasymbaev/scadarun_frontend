import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge, Node, Viewport } from "@xyflow/react";
import { applyPowerPropagation } from "../lib/applyPowerPropagation";

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

export type EdgeDrawType = "straight" | "step";

export type SchemaMeta = {
  id: string;
  name: string;
  slug: string;
  revision: number;
};

type EditorState = {
  // meta
  schemaId: string | null;
  schemaMeta: SchemaMeta | null;

  // ui
  color: EditorColor;
  isEditing: boolean;
  busColor: EditorColor;
  edgeColor: EditorColor;
  edgeDrawType: EdgeDrawType;

  // flow
  schema: FlowSchema;

  // dirty
  isDirty: boolean;
  setDirty: (v: boolean) => void;
  markSaved: () => void;

  // meta actions
  setSchemaId: (id: string | null) => void;
  setSchemaMeta: (meta: SchemaMeta | null) => void;
  setRevision: (revision: number) => void;

  // ui actions
  setColor: (color: EditorColor) => void;
  setEditing: (value: boolean) => void;
  setBusColor: (color: EditorColor) => void;
  setEdgeColor: (color: EditorColor) => void;
  setEdgeDrawType: (t: EdgeDrawType) => void;
  toggleEdgeDrawType: () => void;

  // schema actions
  setSchema: (schema: FlowSchema) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setViewport: (viewport?: Viewport) => void;
  resetSchema: () => void;
  applyPowerPropagation: () => void;

  // actions для контекст-меню/удаления
  updateNodeData: (nodeId: string, patch: Record<string, any>) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  deleteSelected: (nodeIds: string[], edgeIds: string[]) => void;
};

const INITIAL_SCHEMA: FlowSchema = {
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      // meta
      schemaId: null,
      schemaMeta: null,

      // ui
      color: "#4242A0",
      isEditing: false,
      busColor: "#EA7474",
      edgeColor: "#4242A0",
      edgeDrawType: "step",

      // flow
      schema: INITIAL_SCHEMA,

      // dirty
      isDirty: false,
      setDirty: (isDirty) => set({ isDirty }),
      markSaved: () => set({ isDirty: false }),

      // meta actions
      setSchemaId: (schemaId) => set({ schemaId }),
      setSchemaMeta: (schemaMeta) => set({ schemaMeta }),
      setRevision: (revision) =>
        set((s) => ({
          schemaMeta: s.schemaMeta ? { ...s.schemaMeta, revision } : null,
        })),

      // ui actions
      setColor: (color) => set({ color }),
      setEditing: (isEditing) => set({ isEditing }),
      setEdgeColor: (edgeColor) => set({ edgeColor }),
      setBusColor: (busColor) => set({ busColor }),
      setEdgeDrawType: (edgeDrawType) => set({ edgeDrawType }),
      toggleEdgeDrawType: () =>
        set((s) => ({
          edgeDrawType: s.edgeDrawType === "step" ? "straight" : "step",
        })),

      // schema actions
      // загрузка/инициализация схемы — это НЕ “несохранённое”
      setSchema: (schema) => set({ schema, isDirty: false }),

      setNodes: (nodes) =>
        set((s) => ({ schema: { ...s.schema, nodes }, isDirty: true })),

      setEdges: (edges) =>
        set((s) => ({ schema: { ...s.schema, edges }, isDirty: true })),

      setViewport: (viewport) =>
        set((s) => ({ schema: { ...s.schema, viewport }, isDirty: true })),

      resetSchema: () => set({ schema: INITIAL_SCHEMA, isDirty: false }),

      // автопропагация — derived update, НЕ помечаем dirty
      applyPowerPropagation: () => {
        const { schema } = get();
        const nextNodes = applyPowerPropagation(schema.nodes, schema.edges);
        set({ schema: { ...schema, nodes: nextNodes } });
      },

      // actions
      updateNodeData: (nodeId, patch) => {
        const { schema } = get();
        const nodes = schema.nodes.map((n) =>
          n.id === nodeId ? { ...n, data: { ...(n.data as any), ...patch } } : n
        );
        set({ schema: { ...schema, nodes }, isDirty: true });
      },

      deleteNode: (nodeId) => {
        const { schema } = get();
        const nodes = schema.nodes.filter((n) => n.id !== nodeId);
        const edges = schema.edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        );
        set({ schema: { ...schema, nodes, edges }, isDirty: true });
      },

      deleteEdge: (edgeId) => {
        const { schema } = get();
        const edges = schema.edges.filter((e) => e.id !== edgeId);
        set({ schema: { ...schema, edges }, isDirty: true });
      },

      deleteSelected: (nodeIds, edgeIds) => {
        const { schema } = get();
        const nodeSet = new Set(nodeIds);
        const edgeSet = new Set(edgeIds);

        const nodes = schema.nodes.filter((n) => !nodeSet.has(n.id));
        const edges = schema.edges
          .filter((e) => !edgeSet.has(e.id))
          .filter((e) => !nodeSet.has(e.source) && !nodeSet.has(e.target));

        set({ schema: { ...schema, nodes, edges }, isDirty: true });
      },
    }),
    {
      name: "editor-store-v1",
      version: 1,
      partialize: (s) => ({
        schemaId: s.schemaId,
        schemaMeta: s.schemaMeta,
        color: s.color,
        busColor: s.busColor,
        isEditing: s.isEditing,
        schema: s.schema,
        edgeColor: s.edgeColor,
        edgeDrawType: s.edgeDrawType,
      }),
    }
  )
);