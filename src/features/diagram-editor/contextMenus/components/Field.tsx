type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, children, className = "mb-3" }: Props) {
  return (
    <div className={className}>
      <div className="text-[11px] text-white/70 mb-1">{label}</div>
      {children}
    </div>
  );
}