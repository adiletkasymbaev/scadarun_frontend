type Option = { value: string; label: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  swatchTitle?: string;
};

export function ColorSelectRow({ label, value, options, onChange, swatchTitle }: Props) {
  return (
    <div className="sidebar-card-filled px-2 py-2 mb-1.5 w-full flex items-center gap-2">
      <p className="text-xs font-medium flex-1">{label}</p>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs bg-black text-white rounded-md px-2 py-1 outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-white">
            {opt.label}
          </option>
        ))}
      </select>

      <span
        className="h-4 w-4 rounded border border-white/30"
        style={{ background: value }}
        title={swatchTitle ?? "Предпросмотр"}
      />
    </div>
  );
}