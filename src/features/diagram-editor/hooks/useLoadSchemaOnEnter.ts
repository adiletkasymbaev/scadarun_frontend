import { useEffect } from "react";
import { useSchemaQuery } from "../../../api/tanstack/schemas";
import { useEditorStore } from "../store/useEditorStore";

export function useLoadSchemaOnEnter(schemaId: string) {
  const { data, isLoading, isError, error } = useSchemaQuery(schemaId, true);
  const setSchemaId = useEditorStore((s) => s.setSchemaId);
  const setSchemaMeta = useEditorStore((s) => s.setSchemaMeta);
  const setSchema = useEditorStore((s) => s.setSchema);
  const setEditing = useEditorStore((s) => s.setEditing);

  useEffect(() => {
    setSchemaId(schemaId);
    setEditing(false);
  }, [schemaId, setSchemaId, setEditing]);

  useEffect(() => {
    if (!data) return;

    setSchemaMeta({
      id: data.id,
      name: data.name,
      slug: data.slug,
      revision: data.revision,
    });
  }, [data, setSchemaMeta]);

  return { schema: data, isLoading, isError, error, setSchema };
}