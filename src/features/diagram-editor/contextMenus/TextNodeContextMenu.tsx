import { CMButton } from "../../shared/ui/Button";
import { CMInput } from "../../shared/ui/inputs";
import { SelectWithSwatch } from "../../shared/ui/SelectWithSwatch";
import { COLOR_OPTIONS } from "../store/useEditorStore";

import { ContextMenu } from "./components/ContextMenu";
import { CMDivider } from "./components/Divider";
import { Field } from "./components/Field";

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

  onRotate90: () => void;
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
  onRotate90,
  onDelete,
  onClose,
}: Props) {
  return (
    <ContextMenu
      x={x}
      y={y}
      widthClass="w-64"
      title="Текстовая нода"
      onClose={onClose}
    >
      <Field label="Текст">
        <CMInput
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Введите текст..."
        />
      </Field>

      <Field label="Размер блока">
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="text-[10px] text-white/50 mb-1">Ширина</div>
            <CMInput
              type="number"
              min={60}
              max={600}
              value={width}
              onChange={(e) => onChangeWidth(Number(e.target.value))}
            />
          </div>

          <div className="flex-1">
            <div className="text-[10px] text-white/50 mb-1">Высота</div>
            <CMInput
              type="number"
              min={28}
              max={300}
              value={height}
              onChange={(e) => onChangeHeight(Number(e.target.value))}
            />
          </div>
        </div>
      </Field>

      <Field label="Размер текста">
        <CMInput
          type="number"
          min={10}
          max={48}
          value={fontSize}
          onChange={(e) => onChangeFontSize(Number(e.target.value))}
        />
      </Field>

      <Field label="Фон">
        <SelectWithSwatch<string>
          value={bgColor}
          onChange={onChangeBgColor}
          options={COLOR_OPTIONS}
        />
      </Field>

      <Field label="Цвет текста">
        <SelectWithSwatch<string>
          value={textColor}
          onChange={onChangeTextColor}
          options={COLOR_OPTIONS}
        />
      </Field>

      <CMDivider />

      <CMButton variant="default" onClick={onRotate90} className="mb-2">
        Повернуть на 90°
      </CMButton>

      <CMButton variant="danger" onClick={onDelete}>
        Удалить ноду
      </CMButton>
    </ContextMenu>
  );
}