import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useJournalQuery } from "../../../api/tanstack/journal";
import { AltButton } from "../../shared/ui/AltButton";
import Spinner from "../../shared/ui/Spinner";

type ActionKey =
  | "SCHEMA_CREATED"
  | "SCHEMA_RENAMED"
  | "VERSION_SAVED"
  | "VERSION_ROLLBACK"
  | "VERSION_VIEWED";

const ACTION_LABEL: Record<ActionKey, string> = {
  SCHEMA_CREATED: "Создана схема",
  SCHEMA_RENAMED: "Переименована схема",
  VERSION_SAVED: "Сохранена новая версия",
  VERSION_ROLLBACK: "Откат версии",
  VERSION_VIEWED: "Просмотр версии",
};

type DatePreset = "today" | "7d" | "30d" | "custom" | "";

const DATE_PRESET_LABEL: Record<DatePreset, string> = {
  "": "За всё время",
  today: "Сегодня",
  "7d": "Последние 7 дней",
  "30d": "Последние 30 дней",
  custom: "Выбрать даты",
};

type LimitPreset = 25 | 50 | 100 | 200 | 500;
const LIMIT_OPTIONS: { value: LimitPreset; label: string }[] = [
  { value: 25, label: "25 записей" },
  { value: 50, label: "50 записей" },
  { value: 100, label: "100 записей" },
  { value: 200, label: "200 записей" },
  { value: 500, label: "Максимум (500)" },
];

function toIsoStartOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString();
}
function toIsoEndOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x.toISOString();
}

function formatDt(v?: string) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleString();
}

function who(actor: any) {
  const name = [actor?.first_name, actor?.last_name].filter(Boolean).join(" ").trim();
  return name || actor?.username || "—";
}

function badgeColor(action?: string) {
  if (action === "VERSION_SAVED") return "bg-[#E5750B]/15 text-[#E5750B] border-[#E5750B]/25";
  if (action === "VERSION_ROLLBACK") return "bg-red-500/10 text-red-700 border-red-500/20";
  if (action === "SCHEMA_CREATED") return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
  return "bg-[#101828]/5 text-[#101828]/70 border-black/10";
}

function ymd(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function JournalPage() {
  const [action, setAction] = useState<ActionKey | "">("");
  const [datePreset, setDatePreset] = useState<DatePreset>("7d");
  const [fromDate, setFromDate] = useState<string>(() => ymd(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))); // last 7d
  const [toDate, setToDate] = useState<string>(() => ymd(new Date()));
  const [limitPreset, setLimitPreset] = useState<LimitPreset>(100);

  const params = useMemo(() => {
    const p: any = {};
    if (action) p.action = action;
    if (limitPreset) p.limit = limitPreset;

    const now = new Date();

    if (datePreset === "today") {
      p.date_from = toIsoStartOfDay(now);
      p.date_to = toIsoEndOfDay(now);
    } else if (datePreset === "7d") {
      const d = new Date(now);
      d.setDate(d.getDate() - 6);
      p.date_from = toIsoStartOfDay(d);
      p.date_to = toIsoEndOfDay(now);
    } else if (datePreset === "30d") {
      const d = new Date(now);
      d.setDate(d.getDate() - 29);
      p.date_from = toIsoStartOfDay(d);
      p.date_to = toIsoEndOfDay(now);
    } else if (datePreset === "custom") {
      // <input type="date"> даёт YYYY-MM-DD — превращаем в ISO диапазон
      if (fromDate) {
        const d = new Date(`${fromDate}T00:00:00`);
        if (!Number.isNaN(d.getTime())) p.date_from = toIsoStartOfDay(d);
      }
      if (toDate) {
        const d = new Date(`${toDate}T00:00:00`);
        if (!Number.isNaN(d.getTime())) p.date_to = toIsoEndOfDay(d);
      }
    }

    return p;
  }, [action, datePreset, fromDate, toDate, limitPreset]);

  const { data, isLoading, isError, error, refetch, isFetching } = useJournalQuery(params);

  const items = (data ?? []) as any[];

  return (
    <div className="flex-1 px-6 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-white text-lg font-semibold">Журнал</div>
            <div className="mt-1 text-white/60 text-xs">История действий по схемам</div>
          </div>

          <AltButton full={false} onClick={() => refetch()} className="px-3">
            {isFetching ? "Обновляю..." : "Обновить"}
          </AltButton>
        </div>

        {/* Filters */}
        <div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-4 text-white/90">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-1">
              <label className="text-[11px] text-white/70">Тип события</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value as any)}
                className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
              >
                <option className="text-black" value="">Все события</option>
                {(Object.keys(ACTION_LABEL) as ActionKey[]).map((k) => (
                  <option className="text-black" key={k} value={k}>
                    {ACTION_LABEL[k]}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1">
              <label className="text-[11px] text-white/70">Период</label>
              <select
                value={datePreset}
                onChange={(e) => setDatePreset(e.target.value as any)}
                className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
              >
                {(Object.keys(DATE_PRESET_LABEL) as DatePreset[]).map((k) => (
                  <option className="text-black" key={k} value={k}>
                    {DATE_PRESET_LABEL[k]}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1">
              <label className="text-[11px] text-white/70">Сколько записей показать</label>
              <select
                value={limitPreset}
                onChange={(e) => setLimitPreset(Number(e.target.value) as LimitPreset)}
                className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
              >
                {LIMIT_OPTIONS.map((o) => (
                  <option className="text-black" key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {datePreset === "custom" && (
              <>
                <div className="grid gap-1">
                  <label className="text-[11px] text-white/70">Дата от</label>
                  <input
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    type="date"
                    className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
                  />
                </div>

                <div className="grid gap-1">
                  <label className="text-[11px] text-white/70">Дата до</label>
                  <input
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    type="date"
                    className="w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10"
                  />
                </div>

                <div className="hidden lg:block" />
              </>
            )}
          </div>

          <div className="mt-3 text-[11px] text-white/60">
            Подсказка: “Последние 7/30 дней” удобнее для быстрого просмотра, а “Выбрать даты” — для точного диапазона.
          </div>
        </div>

        {/* States */}
        {isLoading ? (
          <div className="mt-5 grid gap-3">
            <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-[#101828]/45 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-5 shadow-[0_18px_60px_rgba(0,0,0,.35)]">
                        <Spinner />
                    <div className="text-[11px] text-white/80">Загрузка схемы...</div>
                </div>
            </div>
          </div>
        ) : isError ? (
          <div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-4 text-white/90">
            <div className="text-sm font-semibold">Не удалось загрузить</div>
            <div className="mt-1 text-xs text-white/70">
              {(error as any)?.response?.data?.detail ||
                (error as any)?.message ||
                "Ошибка загрузки журнала"}
            </div>
            <div className="mt-3">
              <AltButton full={false} onClick={() => refetch()} className="px-3">
                Повторить
              </AltButton>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-5 text-white/85">
            <div className="text-sm font-semibold">Записей нет</div>
            <div className="mt-1 text-xs text-white/65">
              Попробуй выбрать другой период или сохрани версию схемы.
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            {items.map((ev) => {
              const actionText =
                (ACTION_LABEL as any)[ev.action] ?? ev.action ?? "Событие";
              const schemaName = ev?.schema?.name ?? "—";
              const schemaIdVal = ev?.schema?.id;
              const ver =
                ev?.schema_version?.version ??
                ev?.schema?.current_version?.version ??
                null;

              return (
                <div key={ev.id} className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div
                          className={[
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-[13px] font-medium",
                            badgeColor(ev.action),
                          ].join(" ")}
                        >
                          {actionText}
                        </div>
                      </div>

                      <div className="mt-1 text-xs text-[#101828]/60">
                        {schemaIdVal ? (
                          <span>
                            Схема:{" "}
                            <Link
                              to={`/schemas/${schemaIdVal}`}
                              className="text-[#101828] font-medium hover:underline"
                            >
                              {schemaName}
                            </Link>
                          </span>
                        ) : (
                          <span>Схема: {schemaName}</span>
                        )}
                        {ver != null && (
                          <span className="ml-2">
                            • Версия:{" "}
                            <span className="text-[#101828] font-medium">{ver}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-[#101828]/55 text-right">
                      {formatDt(ev.created_at)}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="text-[#101828]/65">
                      Автор: <span className="text-[#101828]">{who(ev.actor)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}