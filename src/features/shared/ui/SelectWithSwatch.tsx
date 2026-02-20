import { CMSelect } from "./inputs";

type Option<T extends string> = { value: T; label: string };

export function SelectWithSwatch<T extends string>(props: {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
}) {
  const { value, onChange, options } = props;

  return (
    <div className="flex items-center gap-2">
      <CMSelect value={value} onChange={(e) => onChange(e.target.value as T)} className="flex-1">
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-black">
            {o.label}
          </option>
        ))}
      </CMSelect>

      <div
        className="h-4 w-4 rounded-full ring-1 ring-white/20"
        style={{ background: value }}
        title={value}
      />
    </div>
  );
}