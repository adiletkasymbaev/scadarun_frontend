type Option = { value: string; label: string };

type Props = {
  title: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
};

export function ColorPalette({ title, value, options, onChange }: Props) {
  return (
    <div className="sidebar-card-filled flex-col px-2 py-2 mb-1.5 w-full">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-xs font-medium flex-1">{title}</p>
        <span
          className="h-4 w-4 rounded border border-white/30"
          style={{ background: value }}
          title="Текущий цвет"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-2 py-1 rounded-md border transition cursor-pointer ${
                active ? "border-white bg-white" : "border-white/10 hover:border-white/30"
              }`}
              title={opt.label}
            >
              <span className="block w-[32px] h-[32px] rounded" style={{ background: opt.value }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}