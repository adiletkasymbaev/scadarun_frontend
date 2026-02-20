import { ReactFlowProvider } from "@xyflow/react";
import Editor from "../ui/Editor";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSchemaQuery, useSchemaVersionQuery } from "../../../api/tanstack/schemas";
import normalizeSnapshot from "../lib/normalizeSnapshot";
import { useEditorStore } from "../store/useEditorStore";
import { useUnsavedChangesPrompt } from "../hooks/useUnsavedChangesPrompt";

const EMPTY_SCHEMA = { nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } };

function SchemaPage() {
  const { id } = useParams();
  const schemaId = String(id || "");

  const setSchema = useEditorStore((s) => s.setSchema);
  const setSchemaMeta = useEditorStore((s) => s.setSchemaMeta);

  const { data: schema, isLoading, isError, error, isSuccess } = useSchemaQuery(schemaId, !!schemaId);

  const currentVersionNumber = schema?.current_version?.version ?? null;

  const versionQuery = useSchemaVersionQuery(
    schemaId,
    currentVersionNumber ?? 0,
    !!schemaId && !!currentVersionNumber
  );

  const isDirty = useEditorStore((s) => s.isDirty);
  const isEditing = useEditorStore((s) => s.isEditing);

  useUnsavedChangesPrompt(isEditing && isDirty);

  useEffect(() => {
    if (!schema) return;
    setSchemaMeta({
      id: schema.id,
      name: schema.name,
      slug: schema.slug,
      revision: schema.revision,
    });
  }, [schema, setSchemaMeta]);

  useEffect(() => {
    if (!isSuccess) return;               
    if (!schema) return;
    if (schema.current_version) return;

    setSchema(EMPTY_SCHEMA);
  }, [isSuccess, schema, setSchema]);

  useEffect(() => {
    const snap = (versionQuery.data as any)?.snapshot;
    const normalized = normalizeSnapshot(snap);
    if (!normalized) return;
    setSchema(normalized);
  }, [versionQuery.data, setSchema]);

  if (isError) {
    const msg =
      (error as any)?.response?.data?.detail ||
      (error as any)?.message ||
      "Ошибка";
    return <div className="p-4">{msg}</div>;
  }

  const isFetchingSchema = isLoading || versionQuery.isLoading;

  return (
    <ReactFlowProvider>
      <Editor isFetchingSchema={isFetchingSchema} />
    </ReactFlowProvider>
  );
}

export default SchemaPage;