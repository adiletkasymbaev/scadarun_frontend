type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export function SidebarActionButton({ children, onClick, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sidebar-card-filled px-2 py-1 mb-1.5 justify-center cursor-pointer w-full ${className}`}
    >
      <span className="font-semibold text-sm">{children}</span>
    </button>
  );
}