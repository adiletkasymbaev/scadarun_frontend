type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  full?: boolean;
};

export function AltButton({
  children,
  onClick,
  disabled = false,
  className = "",
  full = true,
}: Props) {
  const base =
    "rounded-md px-2 py-2 text-xs font-semibold cursor-pointer transition-colors duration-200";

  const enabledStyles =
    "bg-[#E5750B] hover:bg-[#101828] text-white";

  const disabledStyles =
    "bg-[#E5750B]/40 text-white/70 cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${full ? "w-full" : ""} ${base} ${
        disabled ? disabledStyles : enabledStyles
      } ${className}`}
    >
      {children}
    </button>
  );
}
