import type { SidebarItem } from "../../../diagram-editor/lib/sideBarItems";

type Props = {
  item: SidebarItem;
  disabled?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onClick: () => void;
};

export function SidebarItemButton({
  item,
  disabled = false,
  draggable = false,
  onDragStart,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`sidebar-card-filled px-1 py-1.5 gap-2 w-full flex items-center text-left ${
        disabled ? "cursor-default opacity-80" : "cursor-pointer"
      }`}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <p className="font-medium text-xs flex-1 leading-3">{item.name}</p>
    </button>
  );
}