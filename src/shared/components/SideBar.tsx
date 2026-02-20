// SideBar.tsx
import { useMemo, useState } from "react";
import sidebarItems, { type SidebarItem } from "../utils/sideBarItems";
import { COLOR_OPTIONS, useEditorStore, type EditorColor } from "../store/useEditorStore";

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

  const edgeColor = useEditorStore((s) => s.edgeColor);
  const setEdgeColor = useEditorStore((s) => s.setEdgeColor);

  const current = stack[stack.length - 1];
  const canGoBack = stack.length > 1;

  const schema = useEditorStore((s) => s.schema);

  const isEditing = useEditorStore((s) => s.isEditing);
  const setEditing = useEditorStore((s) => s.setEditing);

  // НОВОЕ: цвет шин
  const busColor = useEditorStore((s) => s.busColor);
  const setBusColor = useEditorStore((s) => s.setBusColor);

  const isBusesScreen = current.title === "Шины"; // простой триггер

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

        // defaultData должен дополнять базу, а не заменять её
        ...(item.defaultData ?? {}),

        // и вот это всегда добавится для BusNode
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
    alert("Схема сохранена!")
  }

  return (
    <div className="sidebar">
      <div className="sidebar-card-bordered px-3 py-1.5">
        <h1 className="text-white font-bold text-center">SCADA Run</h1>
      </div>

      <div className="divider" />

      <button
        type="button"
        onClick={onToggleEdit}
        className="sidebar-card-filled px-2 py-1 mb-1.5 justify-center cursor-pointer w-full"
      >
        <span className="font-semibold text-sm">
          {isEditing ? "Вернуться в режим просмотра" : "Редактировать схему"}
        </span>
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={onSave}
          className="sidebar-card-filled px-2 py-1 mb-1.5 justify-center cursor-pointer w-full"
        >
          <span className="font-semibold text-sm">Сохранить</span>
        </button>
      )}

      <div className="divider" />

      {/* Заголовок + назад */}
      <div className="flex flex-col justify-center gap-2 px-2">
        {canGoBack && (
          <button
            type="button"
            onClick={goBack}
            className="px-2 py-1 cursor-pointer rounded-md text-xs font-medium bg-white/10 text-white hover:bg-white/15"
          >
            Назад
          </button>
        )}
        <p className="text-white/90 text-sm text-center font-semibold truncate">
          {current.title}
        </p>
      </div>

      <div className="divider" />

      {/* НОВОЕ: выбор цвета шины только на экране "Шины" */}
      {isBusesScreen && (
        <div className="sidebar-card-filled px-2 py-2 mb-1.5 w-full flex items-center gap-2">
          <p className="text-xs font-medium flex-1">Цвет шины</p>

          <select
            value={busColor}
            onChange={(e) => setBusColor(e.target.value as EditorColor)}
            className="text-xs bg-black text-white rounded-md px-2 py-1 outline-none"
          >
            {COLOR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-white">
                {opt.label}
              </option>
            ))}
          </select>

          <span
            className="h-4 w-4 rounded border border-white/30"
            style={{ background: busColor }}
            title="Предпросмотр"
          />
        </div>
      )}

      <div className="overflow-y-auto scrollbar-hide flex flex-col gap-2.5">
        {current.items.map((item) => {
          const isFolder = !!item.children?.length;
          const isLeaf = !isFolder && !!item.nodeType;

          return (
            <button
              key={item.id}
              type="button"
              draggable={isLeaf && isEditing}
              onDragStart={isLeaf && isEditing ? (e) => onDragStart(e, item) : undefined}
              onClick={() => openNext(item)}
              className={`sidebar-card-filled px-1 py-1.5 gap-2 w-full flex items-center text-left ${
                isEditing ? "cursor-pointer" : "cursor-default opacity-80"
              }`}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <p className="font-medium text-xs flex-1 leading-3">{item.name}</p>
            </button>
          );
        })}
      </div>

      {isBusesScreen && (<>
        {/* EDGE PALETTE — выбор стиля линий */}
        <div className="sidebar-card-filled flex-col px-2 py-2 mb-1.5 w-full">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-medium flex-1">Цвет связей</p>
            <span
              className="h-4 w-4 rounded border border-white/30"
              style={{ background: edgeColor }}
              title="Текущий цвет связи"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((opt) => {
              const active = edgeColor === opt.value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setEdgeColor(opt.value as EditorColor)}
                  className={`px-2 py-1 rounded-md border transition cursor-pointer ${
                    active
                      ? "border-white bg-white"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  title={opt.label}
                >
                  <span
                    className="block w-[32px] h-[32px] rounded"
                    style={{ background: opt.value }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </>)}
    </div>
  );
}

export default SideBar;