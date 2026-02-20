type Props = {
  title: string;
  canGoBack: boolean;
  onBack: () => void;
};

export function SidebarBackBar({ title, canGoBack, onBack }: Props) {
  return (
    <div className="flex flex-col justify-center gap-2 px-2">
      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-2 py-1 cursor-pointer rounded-md text-xs font-medium bg-white/10 text-white hover:bg-white/15"
        >
          Назад
        </button>
      )}
      <p className="text-white/90 text-sm text-center font-semibold truncate">{title}</p>
    </div>
  );
}