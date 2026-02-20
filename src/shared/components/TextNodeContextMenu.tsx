import { COLOR_OPTIONS, type EditorColor } from "../store/useEditorStore";

type Props = {
  x: number;
  y: number;

  text: string;
  width: number;
  height: number;
  fontSize: number;

  bgColor: string;
  textColor: string;

  onChangeText: (v: string) => void;
  onChangeWidth: (v: number) => void;
  onChangeHeight: (v: number) => void;
  onChangeFontSize: (v: number) => void;

  onChangeBgColor: (v: string) => void;
  onChangeTextColor: (v: string) => void;

  onDelete: () => void;
  onClose: () => void;
};

export default function TextNodeContextMenu({
  x,
  y,
  text,
  width,
  height,
  fontSize,
  bgColor,
  textColor,
  onChangeText,
  onChangeWidth,
  onChangeHeight,
  onChangeFontSize,
  onChangeBgColor,
  onChangeTextColor,
  onDelete,
  onClose,
}: Props) {
  return (
    <>
      <div className="fixed inset-0 z-40" onMouseDown={onClose} />

      <div
        className="fixed z-50 w-64 rounded-xl bg-slate-900/95 ring-1 ring-white/10 shadow-xl p-3 text-white"
        style={{ left: x, top: y }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="text-xs font-semibold text-white/70 mb-2">
          Текстовая нода
        </div>

        {/* text */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Текст</div>
          <input
            value={text}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Введите текст..."
            className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
          />
        </div>

        {/* size */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Размер блока</div>
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="text-[10px] text-white/50 mb-1">Ширина</div>
              <input
                type="number"
                min={60}
                max={600}
                value={width}
                onChange={(e) => onChangeWidth(Number(e.target.value))}
                className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
              />
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-white/50 mb-1">Высота</div>
              <input
                type="number"
                min={28}
                max={300}
                value={height}
                onChange={(e) => onChangeHeight(Number(e.target.value))}
                className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>

        {/* font size */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Размер текста</div>
          <input
            type="number"
            min={10}
            max={48}
            value={fontSize}
            onChange={(e) => onChangeFontSize(Number(e.target.value))}
            className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
          />
        </div>

        {/* bg color */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Фон</div>

          <div className="flex items-center gap-2">
            <select
              value={bgColor}
              onChange={(e) => onChangeBgColor(e.target.value)}
              className="flex-1 rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
            >
              {COLOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-black">
                  {o.label}
                </option>
              ))}
            </select>

            <input
              type="color"
              value={bgColor}
              onChange={(e) => onChangeBgColor(e.target.value)}
              className="h-8 w-10 p-0 bg-transparent border-0"
              title="Выбрать любой цвет"
            />
          </div>
        </div>

        {/* text color */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Цвет текста</div>

          <div className="flex items-center gap-2">
            <select
              value={textColor}
              onChange={(e) => onChangeTextColor(e.target.value)}
              className="flex-1 rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
            >
              {COLOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-black">
                  {o.label}
                </option>
              ))}
            </select>

            <input
              type="color"
              value={textColor}
              onChange={(e) => onChangeTextColor(e.target.value)}
              className="h-8 w-10 p-0 bg-transparent border-0"
              title="Выбрать любой цвет"
            />
          </div>
        </div>

        <div className="h-px bg-white/10 my-2" />

        <button
          type="button"
          onClick={onDelete}
          className="w-full rounded-md px-2 py-2 text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-200"
        >
          Удалить ноду
        </button>
      </div>
    </>
  );
}