import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../api/store";

type NavItem = {
  to: string;
  label: string;
};

const NAV: NavItem[] = [
  { to: "/schemas", label: "Схемы" },
  { to: "/journal", label: "Журнал" },
];

function initials(name: string) {
  const s = name.trim();
  if (!s) return "?";
  const parts = s.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

function positionLabel(pos?: string | null) {
  if (!pos) return "—";
  const map: Record<string, string> = {
    DISPATCHER: "Диспетчер РЭС",
    DUTY_ENGINEER: "Дежурный инженер",
    SUBSTATION_OPERATOR: "Оператор подстанции",
    RPA_ENGINEER: "Инженер РЗА",
    SCADA_ENGINEER: "Инженер АСДУ/SCADA",
    LINE_CREW_LEAD: "Мастер РЭС (бригада)",
    ELECTRICIAN: "Электромонтёр",
    METERING_SPECIALIST: "АИИС КУЭ / учёт",
    SAFETY_ENGINEER: "Инженер по ТБ",
    CHIEF_ENGINEER: "Главный инженер РЭС",
    HEAD_OF_RES: "Начальник РЭС",
  };
  return map[pos] ?? pos;
}

function isActivePath(pathname: string, to: string) {
  if (to === "/schemas") return pathname === "/schemas" || pathname.startsWith("/schemas/");
  return pathname === to || pathname.startsWith(to + "/");
}

export default function AppSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const profile = useAuthStore((s) => s.profile);
  const logout = useAuthStore((s) => s.logout);

  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() ||
    profile?.username ||
    "Пользователь";

  const pos = positionLabel((profile as any)?.position);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="h-screen w-[260px] shrink-0 border-r border-black/10 bg-white flex flex-col fixed top-0 left-0">
      {/* Top */}
      <div className="px-4 py-4 border-b border-black/10">
        <img className="w-52" src="/logo.png" alt="Logo" />
      </div>

      {/* Nav */}
      <nav className="px-3 py-3 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = isActivePath(pathname, item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "rounded-lg px-3 py-2 text-sm font-medium transition flex items-center justify-between",
                active
                  ? "text-[#101828] bg-black/[0.03]"
                  : "text-[#101828]/70 hover:text-[#101828] hover:bg-black/[0.03]",
              ].join(" ")}
            >
              <span>{item.label}</span>

              {active && (
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "#E5750B" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user block */}
      <div className="mt-auto border-t border-black/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-semibold text-white"
            style={{ background: "#101828" }}
          >
            {initials(displayName)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-[#101828] truncate">
              {displayName}
            </div>
            <div className="text-[11px] text-[#101828]/55 truncate">{pos}</div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full cursor-pointer rounded-lg border border-black/10 px-3 py-2 text-xs font-medium text-[#101828]/70 hover:text-[#101828] hover:bg-black/[0.03] transition"
        >
          Выйти
        </button>
      </div>
    </aside>
  );
}