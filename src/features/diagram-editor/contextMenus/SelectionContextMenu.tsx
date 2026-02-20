import { CMButton } from "../../shared/ui/Button";
import { ContextMenu } from "./components/ContextMenu";

type Props = {
  x: number;
  y: number;
  hasSelection: boolean;
  onDelete: () => void;
  onClose: () => void;
};

export default function SelectionContextMenu({
  x,
  y,
  hasSelection,
  onDelete,
  onClose,
}: Props) {
  return (
    <ContextMenu x={x} y={y} widthClass="w-56" onClose={onClose}>
      <CMButton
        variant="danger"
        disabled={!hasSelection}
        // твоя кнопка была text-left и чуть более "плашкой"
        className="text-left rounded-lg px-3 bg-red-500/15 hover:bg-red-500/25"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Удалить выделенное
      </CMButton>
    </ContextMenu>
  );
}