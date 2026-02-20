import {
  COLOR_OPTIONS,
  VOLTAGE_OPTIONS,
  type EditorColor,
  type NominalVoltage,
} from "../store/useEditorStore";

export type EquipmentStatus = "on" | "off" | "alarm";

export const STATUS_OPTIONS: { value: EquipmentStatus; label: string }[] = [
  { value: "on", label: "Включен" },
  { value: "off", label: "Выключен" },
  { value: "alarm", label: "Авария" },
];

type Props = {
  x: number;
  y: number;

  // applied
  color?: EditorColor;
  // draft
  colorDraft: EditorColor;

  voltage: NominalVoltage;

  // NEW
  dispatcherName: string;
  equipmentModel: string;
  status: EquipmentStatus;

  onChangeDispatcherName: (v: string) => void;
  onChangeEquipmentModel: (v: string) => void;
  onChangeStatus: (v: EquipmentStatus) => void;

  onChangeColorDraft: (c: EditorColor) => void;
  onApplyColor: () => void;

  onClearColor: () => void;
  canClearColor: boolean;

  onChangeVoltage: (v: NominalVoltage) => void;

  onDelete: () => void;
  onClose: () => void;
};

export default function NodeContextMenu({
  x,
  y,
  color,
  colorDraft,
  voltage,

  dispatcherName,
  equipmentModel,
  status,
  onChangeDispatcherName,
  onChangeEquipmentModel,
  onChangeStatus,

  onChangeColorDraft,
  onApplyColor,
  onChangeVoltage,
  onDelete,
  onClearColor,
  canClearColor,
  onClose,
}: Props) {
  const isSame = (color ?? "") === colorDraft;

  return (
    <>
      <div className="fixed inset-0 z-40" onMouseDown={onClose} />

      <div
        className="fixed z-50 w-64 rounded-xl bg-slate-900/95 ring-1 ring-white/10 shadow-xl p-3 text-white"
        style={{ left: x, top: y }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="text-xs font-semibold text-white/70 mb-2">
          Параметры ноды
        </div>

        {/* NEW: dispatcher name */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Диспетчерское наименование</div>
          <input
            value={dispatcherName}
            onChange={(e) => onChangeDispatcherName(e.target.value)}
            placeholder="Напр: Т-1, ВЛ-10кВ..."
            className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
          />
        </div>

        {/* NEW: equipment model */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Тип / Модель оборудования</div>
          <input
            value={equipmentModel}
            onChange={(e) => onChangeEquipmentModel(e.target.value)}
            placeholder="Напр: ТМГ-1000/10"
            className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
          />
        </div>

        {/* NEW: status */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Статус</div>
          <select
            value={status}
            onChange={(e) => onChangeStatus(e.target.value as EquipmentStatus)}
            className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="text-black">
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* voltage */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Номинальное напряжение</div>
          <select
            value={voltage}
            onChange={(e) => onChangeVoltage(e.target.value as NominalVoltage)}
            className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
          >
            {VOLTAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="text-black">
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* color */}
        <div className="mb-3">
          <div className="text-[11px] text-white/70 mb-1">Цвет (черновик)</div>

          <div className="flex items-center gap-2">
            <select
              value={colorDraft}
              onChange={(e) => onChangeColorDraft(e.target.value as EditorColor)}
              className="flex-1 rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
            >
              {COLOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-black">
                  {o.label}
                </option>
              ))}
            </select>

            <div
              className="h-4 w-4 rounded-full ring-1 ring-white/20"
              style={{ background: colorDraft }}
              title={colorDraft}
            />
          </div>

          <button
            type="button"
            onClick={onApplyColor}
            disabled={isSame}
            className={`mt-2 w-full rounded-md px-2 py-2 text-xs font-semibold
              ${isSame ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-100"}
            `}
          >
            Применить цвет
          </button>

          <button
            type="button"
            onClick={onClearColor}
            disabled={!canClearColor}
            className={`mt-2 w-full rounded-md px-2 py-2 text-xs font-semibold
              ${!canClearColor ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-white/10 hover:bg-white/15 text-white"}
            `}
          >
            Очистить цвет
          </button>

          <div className="mt-1 text-[10px] text-white/50">
            Сейчас применён: <span className="font-semibold">{color ?? "нет"}</span>
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