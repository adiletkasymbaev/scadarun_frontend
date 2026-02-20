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
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-40" onMouseDown={onClose} />

      <div
        className="fixed z-50 w-56 rounded-xl bg-slate-900/95 ring-1 ring-white/10 shadow-xl p-2 text-white"
        style={{ left: x, top: y }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          disabled={!hasSelection}
          onClick={() => {
            onDelete();
            onClose();
          }}
          className={`w-full text-left rounded-lg px-3 py-2 text-xs font-semibold
            ${hasSelection ? "bg-red-500/15 hover:bg-red-500/25 text-red-200" : "bg-white/10 text-white/40 cursor-not-allowed"}
          `}
        >
          Удалить выделенное
        </button>
      </div>
    </>
  );
}