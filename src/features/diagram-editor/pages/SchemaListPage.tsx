import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useSchemasQuery,
  useCreateSchemaMutation,
  useArchiveSchemaMutation,
  useUnarchiveSchemaMutation,
} from "../../../api/tanstack/schemas";
import { AltButton } from "../../shared/ui/AltButton";
import { CMInput } from "../../shared/ui/inputs";
import Spinner from "../../shared/ui/Spinner";

function slugify(input: string) {
  const s = input.trim().toLowerCase();
  if (!s) return "";
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return s
    .split("")
    .map((ch) => {
      if (/[a-z0-9]/.test(ch)) return ch;
      if (map[ch]) return map[ch];
      if (ch === " " || ch === "_" || ch === "-") return "-";
      return "-";
    })
    .join("")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_22px_70px_rgba(0,0,0,.35)] border border-black/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[#101828]">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-lg hover:bg-black/[0.04] text-[#101828]/70"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

type TabKey = "active" | "archived";

export default function SchemaListPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = useSchemasQuery();
  const createSchema = useCreateSchemaMutation();

  const [tab, setTab] = useState<TabKey>("active");
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");

  const schemas = (data ?? []) as any[];

  const activeSchemas = useMemo(() => schemas.filter((s) => !s?.is_archived), [schemas]);
  const archivedSchemas = useMemo(() => schemas.filter((s) => !!s?.is_archived), [schemas]);
  const shownSchemas = tab === "active" ? activeSchemas : archivedSchemas;

  const canCreate = useMemo(() => name.trim().length > 0 && !createSchema.isPending, [
    name,
    createSchema.isPending,
  ]);

  function openCreate() {
    setCreateOpen(true);
    setName("");
  }

  function closeCreate() {
    if (createSchema.isPending) return;
    setCreateOpen(false);
  }

  async function onCreate() {
    if (!canCreate) return;

    try {
      const created = await createSchema.mutateAsync({
        name: name.trim(),
        slug: slugify(name),
      });

      toast.success("Схема создана");
      setCreateOpen(false);

      const newId = (created as any)?.id;
      if (newId) navigate(`/schemas/${newId}`);
      else refetch();
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || e?.message || "Не удалось создать схему");
    }
  }

  function Tabs() {
    return (
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab("active")}
          className={[
            "h-9 px-3 rounded-xl text-xs font-semibold border transition",
            tab === "active"
              ? "bg-white text-[#101828] border-white/20"
              : "bg-white/10 text-white/80 border-white/10 hover:bg-white/15",
          ].join(" ")}
        >
          Активные <span className="ml-1 opacity-70">({activeSchemas.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setTab("archived")}
          className={[
            "h-9 px-3 rounded-xl text-xs font-semibold border transition",
            tab === "archived"
              ? "bg-white text-[#101828] border-white/20"
              : "bg-white/10 text-white/80 border-white/10 hover:bg-white/15",
          ].join(" ")}
        >
          Архив <span className="ml-1 opacity-70">({archivedSchemas.length})</span>
        </button>
      </div>
    );
  }

  // LOADING
  if (isLoading) {
    return (
      <div className="min-h-screen w-full px-6 py-6 relative" style={{ backgroundColor: "#101828" }}>
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-[#101828]/45 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-5 shadow-[0_18px_60px_rgba(0,0,0,.35)]">
            <Spinner />
            <div className="text-[11px] text-white/80">Загрузка схем...</div>
          </div>
        </div>
      </div>
    );
  }

  // ERROR
  if (isError) {
    const msg = (error as any)?.response?.data?.detail || (error as any)?.message || "Ошибка загрузки схем";
    return (
      <div className="min-h-screen w-full px-6 py-6" style={{ backgroundColor: "#101828" }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-white text-lg font-semibold">Схемы</div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/10 p-4 text-white/90">
            <div className="text-sm font-semibold">Не удалось загрузить</div>
            <div className="mt-1 text-xs text-white/70">{msg}</div>
            <div className="mt-3 flex items-center gap-2">
              <AltButton full={false} onClick={() => refetch()} className="px-3">
                Повторить
              </AltButton>
              <AltButton full={false} onClick={openCreate} className="px-3">
                Создать
              </AltButton>
            </div>
          </div>
        </div>

        <Modal open={isCreateOpen} title="Новая схема" onClose={closeCreate}>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-[11px] text-[#101828]/70">Название</label>
              <CMInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Подстанция №1"
                disabled={createSchema.isPending}
                className="bg-black/[0.02] text-[#101828] ring-black/10 placeholder:text-[#101828]/35"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <AltButton full={false} onClick={closeCreate} className="px-3">
                Отмена
              </AltButton>
              <AltButton full={false} onClick={onCreate} className="px-3" disabled={!canCreate}>
                {createSchema.isPending ? "Создаю..." : "Создать"}
              </AltButton>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // OK
  return (
    <div className="min-h-screen w-full px-6 py-6" style={{ backgroundColor: "#101828" }}>
      <Modal open={isCreateOpen} title="Новая схема" onClose={closeCreate}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <label className="text-[11px] text-[#101828]/70">Название</label>
            <CMInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Подстанция №1"
              disabled={createSchema.isPending}
              className="bg-black/[0.02] text-[#101828] ring-black/10 placeholder:text-[#101828]/35"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <AltButton full={false} onClick={closeCreate} className="px-3">
              Отмена
            </AltButton>
            <AltButton full={false} onClick={onCreate} className="px-3" disabled={!canCreate}>
              {createSchema.isPending ? "Создаю..." : "Создать"}
            </AltButton>
          </div>
        </div>
      </Modal>

      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-white text-lg font-semibold">Схемы</div>
            <div className="mt-1 text-white/60 text-xs">Выберите схему, чтобы открыть редактор</div>
            <Tabs />
          </div>

          <div className="flex items-center gap-2">
            <AltButton full={false} onClick={() => refetch()} className="px-3">
              {isFetching ? "Обновляю..." : "Обновить"}
            </AltButton>
            <AltButton full={false} onClick={openCreate} className="px-3">
              Создать
            </AltButton>
          </div>
        </div>

        {shownSchemas.length === 0 ? (
          <div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-5 text-white/85">
            <div className="text-sm font-semibold">{tab === "active" ? "Активных схем нет" : "Архив пуст"}</div>
            <div className="mt-1 text-xs text-white/65">
              {tab === "active"
                ? "Создай первую схему по кнопке “Создать”"
                : "Архивируй схему, чтобы она появилась тут"}
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shownSchemas.map((s: any) => (
              <SchemaCard
                key={s.id}
                schema={s}
                tab={tab}
                onChanged={async () => {
                  // надежно: поднимаем всё нужное
                  await refetch();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SchemaCard({ schema: s, tab, onChanged }: { schema: any; tab: TabKey; onChanged: () => void }) {
  const archiveMutation = useArchiveSchemaMutation(s.id);
  const unarchiveMutation = useUnarchiveSchemaMutation(s.id);

  const busy = archiveMutation.isPending || unarchiveMutation.isPending;
  const isArchived = !!s?.is_archived;

  async function doArchive(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      await archiveMutation.mutateAsync({ expected_revision: s.revision });
      toast.success("Схема архивирована");
      await onChanged();
    } catch (err: any) {
      if (err?.response?.status === 409) {
        toast.error("Конфликт revision. Обнови список и повтори.");
        return onChanged();
      }
      toast.error(err?.response?.data?.detail || err?.message || "Не удалось архивировать");
    }
  }

  async function doUnarchive(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      await unarchiveMutation.mutateAsync({ expected_revision: s.revision });
      toast.success("Схема разархивирована");
      await onChanged();
    } catch (err: any) {
      if (err?.response?.status === 409) {
        toast.error("Конфликт revision. Обнови список и повтори.");
        return onChanged();
      }
      toast.error(err?.response?.data?.detail || err?.message || "Не удалось разархивировать");
    }
  }

  // ✅ DISABLED OPEN in archive:
  // - в архиве делаем не Link, а div (курсор/стили disabled)
  const Wrapper: any = isArchived ? "div" : Link;
  const wrapperProps = isArchived
    ? { className: "" }
    : { to: `/schemas/${s.id}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        "group rounded-xl border border-black/10 bg-white p-4 shadow-sm transition",
        isArchived ? "opacity-90" : "hover:-translate-y-[1px] hover:shadow-md",
        isArchived ? "cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      aria-disabled={isArchived ? true : undefined}
      title={isArchived ? "Схема в архиве. Разархивируй, чтобы открыть." : "Открыть"}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-[#101828]">{s.name}</div>

          {isArchived ? (
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-2 py-0.5 text-[11px] text-[#101828]/70">
              Архив
              {s.archived_at ? (
                <span className="text-[#101828]/45">• {new Date(s.archived_at).toLocaleDateString()}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div
          className="h-2.5 w-2.5 rounded-full mt-1 shrink-0"
          style={{
            backgroundColor: s.current_version ? "#E5750B" : "rgba(16,24,40,.25)",
          }}
          title={s.current_version ? "Есть версия" : "Нет версий"}
        />
      </div>

      <div className="mt-2 text-[#101828]/60 text-xs">
        Версия: <span className="text-[#101828] font-medium">{s.revision}</span>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-[11px]">
        <div className="text-[#101828]/50">обновлено: {new Date(s.updated_at).toLocaleString()}</div>

        <div className="flex items-center gap-2">
          <button
            className={[
              "transition-colors cursor-pointer h-8 px-3 rounded-lg border border-black/10 bg-white hover:bg-black/[0.03] text-[#101828] text-[11px] font-semibold disabled:opacity-60",
              isArchived ? "text-[#101828]/35" : "text-[#101828]/60 group-hover:text-[#101828]",
            ].join(" ")}
          >
            Открыть
          </button>

          {tab === "active" ? (
            <button
              type="button"
              onClick={doArchive}
              disabled={busy}
              className="h-8 px-3 cursor-pointer rounded-lg border border-black/10 bg-white hover:bg-black/[0.03] text-[#101828] text-[11px] font-semibold disabled:opacity-60"
              title="Архивировать"
            >
              {archiveMutation.isPending ? "Архивирую..." : "В архив"}
            </button>
          ) : (
            <button
              type="button"
              onClick={doUnarchive}
              disabled={busy}
              className="h-8 px-3 cursor-pointer rounded-lg border border-black/10 bg-white hover:bg-black/[0.03] text-[#101828] text-[11px] font-semibold disabled:opacity-60"
              title="Разархивировать"
            >
              {unarchiveMutation.isPending ? "Возвращаю..." : "Вернуть"}
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}