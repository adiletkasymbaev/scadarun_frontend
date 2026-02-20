import { CMButton } from "../../shared/ui/Button";
import { CMInput, CMSelect } from "../../shared/ui/inputs";
import { SelectWithSwatch } from "../../shared/ui/SelectWithSwatch";
import {
  COLOR_OPTIONS,
  VOLTAGE_OPTIONS,
  type EditorColor,
  type NominalVoltage,
} from "../store/useEditorStore";
import { ContextMenu } from "./components/ContextMenu";
import { CMDivider } from "./components/Divider";
import { Field } from "./components/Field";

export type EquipmentStatus = "on" | "off" | "alarm";

export const STATUS_OPTIONS: { value: EquipmentStatus; label: string }[] = [
  { value: "on", label: "Включен" },
  { value: "off", label: "Выключен" },
  { value: "alarm", label: "Авария" },
];

type RingEditorItem = {
  key: string;
  label: string;
  applied?: EditorColor | null;
  draft: EditorColor;
};

type SchemaOption = { id: string; name: string; slug?: string };

type Props = {
  x: number;
  y: number;

  color?: EditorColor;
  colorDraft: EditorColor;

  voltage: NominalVoltage;

  dispatcherName: string;
  equipmentModel: string;
  status: EquipmentStatus;

  rings?: RingEditorItem[];

  onChangeRingDraft?: (ringKey: string, c: EditorColor) => void;
  onApplyRingColor?: (ringKey: string) => void;
  onClearRingColor?: (ringKey: string) => void;

  onChangeDispatcherName: (v: string) => void;
  onChangeEquipmentModel: (v: string) => void;
  onChangeStatus: (v: EquipmentStatus) => void;

  onChangeColorDraft: (c: EditorColor) => void;
  onApplyColor: () => void;

  onRotate90: () => void;

  onClearColor: () => void;
  canClearColor: boolean;

  onChangeVoltage: (v: NominalVoltage) => void;

  onDelete: () => void;
  onClose: () => void;

  isTriangle?: boolean;
  schemaOptions?: SchemaOption[];
  linkedSchemaId?: string;
  onChangeLinkedSchema?: (schemaId: string) => void;
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
  rings,
  onChangeRingDraft,
  onApplyRingColor,
  onClearRingColor,
  onChangeDispatcherName,
  onChangeEquipmentModel,
  onChangeStatus,

  onChangeColorDraft,
  onRotate90,
  onApplyColor,
  onChangeVoltage,
  onDelete,
  onClearColor,
  canClearColor,
  onClose,

  isTriangle,
  schemaOptions,
  linkedSchemaId,
  onChangeLinkedSchema,
}: Props) {
  const isSame = (color ?? "") === colorDraft;

  return (
    <ContextMenu
      x={x}
      y={y}
      widthClass="w-74"
      maxHeightClass="max-h-[72vh]"
      title="Параметры ноды"
      onClose={onClose}
    >
      <Field label="Диспетчерское наименование">
        <CMInput
          value={dispatcherName}
          onChange={(e) => onChangeDispatcherName(e.target.value)}
          placeholder="Напр: Т-1, ВЛ-10кВ..."
        />
      </Field>

      <Field label="Тип / Модель оборудования">
        <CMInput
          value={equipmentModel}
          onChange={(e) => onChangeEquipmentModel(e.target.value)}
          placeholder="Напр: ТМГ-1000/10"
        />
      </Field>

      <Field label="Статус">
        <CMSelect
          value={status}
          onChange={(e) => onChangeStatus(e.target.value as EquipmentStatus)}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="text-black">
              {o.label}
            </option>
          ))}
        </CMSelect>
      </Field>

      <Field label="Номинальное напряжение">
        <CMSelect
          value={voltage}
          onChange={(e) => onChangeVoltage(e.target.value as NominalVoltage)}
        >
          {VOLTAGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="text-black">
              {o.label}
            </option>
          ))}
        </CMSelect>
      </Field>

      {/* ✅ НОВОЕ: только для TriangleNode */}
      {isTriangle ? (
        <Field label="Ссылка на схему">
          <CMSelect
            value={linkedSchemaId ?? ""}
            onChange={(e) => onChangeLinkedSchema?.(e.target.value)}
          >
            <option value="" className="text-black">
              — не выбрано —
            </option>

            {(schemaOptions ?? []).map((s) => (
              <option key={s.id} value={s.id} className="text-black">
                {s.name}
              </option>
            ))}
          </CMSelect>

          <div className="mt-1 text-[10px] text-white/50">
            При наведении на треугольник появится кружок-ссылка.
          </div>
        </Field>
      ) : null}

      <Field label="Цвет (черновик)">
        <>
          <SelectWithSwatch<EditorColor>
            value={colorDraft}
            onChange={onChangeColorDraft}
            options={COLOR_OPTIONS}
          />

          <CMButton
            variant="primary"
            disabled={isSame}
            className="mt-2"
            onClick={onApplyColor}
          >
            Применить цвет
          </CMButton>

          <CMButton
            variant="default"
            disabled={!canClearColor}
            className="mt-2"
            onClick={onClearColor}
          >
            Очистить цвет
          </CMButton>

          <div className="mt-1 text-[10px] text-white/50">
            Сейчас применён:{" "}
            <span className="font-semibold">{color ?? "нет"}</span>
          </div>
        </>
      </Field>

      {rings?.length ? (
        <>
          <CMDivider />

          <div className="text-[11px] font-semibold text-white/80">Кольца</div>

          <div className="mt-2 flex flex-col gap-3">
            {rings.map((r) => {
              const same = (r.applied ?? "") === r.draft;

              return (
                <div key={r.key} className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <div className="text-[11px] text-white/80">{r.label}</div>

                  <div className="mt-2">
                    <SelectWithSwatch<EditorColor>
                      value={r.draft}
                      onChange={(c) => onChangeRingDraft?.(r.key, c)}
                      options={COLOR_OPTIONS}
                    />
                  </div>

                  <div className="mt-2 flex gap-2">
                    <CMButton
                      variant="primary"
                      disabled={same}
                      onClick={() => onApplyRingColor?.(r.key)}
                    >
                      Применить
                    </CMButton>

                    <CMButton
                      variant="default"
                      disabled={!r.applied}
                      onClick={() => onClearRingColor?.(r.key)}
                    >
                      Очистить
                    </CMButton>
                  </div>

                  <div className="mt-1 text-[10px] text-white/50">
                    Сейчас: <span className="font-semibold">{r.applied ?? "нет"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      <CMDivider />

      <CMButton variant="default" onClick={onRotate90} className="mb-2">
        Повернуть на 90°
      </CMButton>

      <CMButton variant="danger" onClick={onDelete}>
        Удалить
      </CMButton>
    </ContextMenu>
  );
}