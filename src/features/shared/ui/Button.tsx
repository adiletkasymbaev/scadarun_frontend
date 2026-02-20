type Variant = "default" | "primary" | "danger";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
  full?: boolean;
};

function styles(variant: Variant, disabled: boolean) {
  const base =
    "rounded-md px-2 py-2 text-xs font-semibold cursor-pointer transition-colors duration-150";

  if (disabled)
    return `${base} bg-white/10 text-white/40 cursor-not-allowed`;

  switch (variant) {
    case "danger":
      return `${base} bg-red-500/20 hover:bg-red-500/15 text-red-200`;
    case "primary":
      return `${base} bg-blue-500/20 hover:bg-blue-500/15 text-blue-100`;
    default:
      return `${base} bg-white/10 hover:bg-white/5 text-white`;
  }
}

export function CMButton({
  children,
  onClick,
  disabled = false,
  variant = "default",
  className = "",
  full = true,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${full ? "w-full" : ""} ${styles(variant, disabled)} ${className}`}
    >
      {children}
    </button>
  );
}