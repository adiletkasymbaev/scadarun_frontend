import { useMemo, useState } from "react";
import { COLOR_OPTIONS, useEditorStore, type EditorColor } from "../store/useEditorStore";
import { ColorPalette } from "../../shared/ui/ColorPalette";
import { ColorSelectRow } from "../../shared/ui/ColorSelectRow";
import { SidebarActionButton } from "../../shared/ui/sidebar/SidebarActionButton";
import { SidebarBackBar } from "../../shared/ui/sidebar/SidebarBackBar";
import { SidebarDivider } from "../../shared/ui/sidebar/SidebarDivider";
import { SidebarHeader } from "../../shared/ui/sidebar/SidebarHeader";
import { SidebarItemButton } from "../../shared/ui/sidebar/SidebarItemButton";
import sidebarItems, { type SidebarItem } from "../lib/sideBarItems";
import { useSaveSchemaVersionMutation } from "../../../api/tanstack/schemas";
import { toast } from "sonner";
import { parseSchemaSaveConflict } from "../../../api/helpers";
import { Link } from "react-router-dom";

type SidebarScreen = {
  title: string;
  items: SidebarItem[];
};

function SideBar() {
  const rootScreen: SidebarScreen = useMemo(
    () => ({ title: "Меню", items: sidebarItems }),
    []
  );

  const [stack, setStack] = useState<SidebarScreen[]>([rootScreen]);

  const schemaId = useEditorStore((s) => s.schemaId);
  const schemaMeta = useEditorStore((s) => s.schemaMeta);
  const schema = useEditorStore((s) => s.schema);

  const edgeDrawType = useEditorStore((s) => s.edgeDrawType);
  const setEdgeDrawType = useEditorStore((s) => s.setEdgeDrawType);

  const setEditing = useEditorStore((s) => s.setEditing);
  const setRevision = useEditorStore((s) => s.setRevision);

  const saveMutation = useSaveSchemaVersionMutation(schemaMeta.id);
  const isEditing = useEditorStore((s) => s.isEditing);

  const edgeColor = useEditorStore((s) => s.edgeColor);
  const setEdgeColor = useEditorStore((s) => s.setEdgeColor);

  const busColor = useEditorStore((s) => s.busColor);
  const setBusColor = useEditorStore((s) => s.setBusColor);

  const current = stack[stack.length - 1];
  const canGoBack = stack.length > 1;

  const isBusesScreen = current.title === "Шины";

  function openNext(item: SidebarItem) {
    if (item.children?.length) {
      setStack((prev) => [...prev, { title: item.name, items: item.children! }]);
      return;
    }
    item.onClick?.();
  }

  function goBack() {
    setStack((prev) => prev.slice(0, -1));
  }

  function onDragStart(e: React.DragEvent, item: SidebarItem) {
    if (!item.nodeType) return;

    const isBus = item.nodeType === "BusNode";

    const payload = {
      nodeType: item.nodeType,
      data: {
        label: item.name,
        sidebarId: item.id,
        ...(item.defaultData ?? {}),
        ...(isBus ? { color: busColor } : {}),
      },
    };

    e.dataTransfer.setData("application/reactflow", JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "move";
  }

  function onToggleEdit() {
    setEditing(!isEditing);
  }

  function onSave() {
    if (!schemaMeta) return;

    saveMutation.mutate(
      {
        expected_revision: schemaMeta.revision,
        comment: "Saved from editor",
        snapshot: {
          nodes: schema.nodes,
          edges: schema.edges,
          viewport: schema.viewport ?? { x: 0, y: 0, zoom: 1 },
        },
      },
      {
        onSuccess: (res) => {
          setRevision(res.new_schema_revision);
          setEditing(false);
          toast.success("Схема сохранена");
        },
        onError: (err: any) => {
          const conflict = parseSchemaSaveConflict(err);
          if (conflict?.code === "REVISION_CONFLICT") {
            toast.error(
              `Конфликт: схема уже обновлена (ожидали ${conflict.expected_revision}, актуально ${conflict.actual_revision}). Перезайди/обнови страницу.`
            );
            return;
          }
          const msg = err?.response?.data?.detail || err?.message || "Ошибка сохранения";
          toast.error(msg);
        },
      }
    );
  }

  return (
    <div className="sidebar">
      <SidebarHeader />

      <SidebarDivider />

      <Link to="/schemas">
        <SidebarActionButton onClick={() => {}}>
          Список схем
        </SidebarActionButton>
      </Link>

      <SidebarActionButton onClick={onToggleEdit}>
        {isEditing ? "Вернуться в режим просмотра" : "Редактировать схему"}
      </SidebarActionButton>

      {isEditing && <SidebarActionButton onClick={onSave}>Сохранить</SidebarActionButton>}

      <SidebarDivider />

      <SidebarBackBar title={current.title} canGoBack={canGoBack} onBack={goBack} />

      <SidebarDivider />

      {isBusesScreen && (
        <div className="grid gap-1">
          <label className="text-[11px] text-[#101828]/60 px-1">Тип линии</label>

          <select
            value={edgeDrawType}
            onChange={(e) => setEdgeDrawType(e.target.value as any)}
            disabled={!isEditing}
            className={[
              "w-full rounded-md px-2 py-2 text-xs outline-none transition",
              "ring-1 ring-black/10 bg-white",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            <option value="straight">Прямая</option>
            <option value="step">Ступенчатая</option>
          </select>
        </div>
      )}

      {isBusesScreen && (
        <ColorSelectRow
          label="Цвет шины"
          value={busColor}
          options={COLOR_OPTIONS}
          onChange={(v) => setBusColor(v as EditorColor)}
        />
      )}

      <div className="overflow-y-auto scrollbar-hide flex flex-col gap-2.5">
        {current.items.map((item) => {
          const isFolder = !!item.children?.length;
          const isLeaf = !isFolder && !!item.nodeType;

          return (
            <SidebarItemButton
              key={item.id}
              item={item}
              disabled={!isEditing}
              draggable={isLeaf && isEditing}
              onDragStart={isLeaf && isEditing ? (e) => onDragStart(e, item) : undefined}
              onClick={() => openNext(item)}
            />
          );
        })}
      </div>

      {isBusesScreen && (
        <ColorPalette
          title="Цвет связей"
          value={edgeColor}
          options={COLOR_OPTIONS}
          onChange={(v) => setEdgeColor(v as EditorColor)}
        />
      )}
    </div>
  );
}

export default SideBar;