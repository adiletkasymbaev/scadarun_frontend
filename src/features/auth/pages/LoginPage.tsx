import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../../../api/store";
import { useLoginMutation } from "../../../api/tanstack/accounts";
import { CMInput } from "../../shared/ui/inputs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AltButton } from "../../shared/ui/AltButton";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Имя пользователя обязательн"),
  password: z.string().min(1, "Пароль обязателен"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { accessToken, profile, isHydrated } = useAuthStore();
  const loginMutation = useLoginMutation();

  useEffect(() => {
    if (!isHydrated) return;
    if (accessToken && profile) navigate("/", { replace: true });
  }, [accessToken, profile, isHydrated, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync({
        username: values.username.trim(),
        password: values.password,
      });

      toast.success("Вы вошли в аккаунт");
      navigate("/", { replace: true });
    } catch (e: any) {
      if (e?.response?.status === 401) {
        const msg = "Неправильный логин или пароль";
        setError("username", { type: "server", message: msg });
        setError("password", { type: "server", message: msg });
        toast.error(msg);
        return;
      }

      const msg = e?.response?.data?.detail || e?.message || "Login failed";
      toast.error(msg);
    }
  });

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(900px 420px at 15% 10%, rgba(229,117,11,.14), transparent 60%), radial-gradient(700px 380px at 85% 10%, rgba(16,24,40,.08), transparent 55%), linear-gradient(180deg, #ffffff, #f6f7fb)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-xl w-full flex items-center justify-center p-4">
                <img className="w-52" src="logo.png" alt="Logo" />
              </div>
            </div>

            <div className="mt-5">
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#101828] text-base font-semibold leading-tight">
                      Вход в систему
                    </div>
                  </div>
                </div>

                <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
                  <div className="grid gap-1">
                    <label className="text-[#101828]/70 text-[11px]">
                      Имя пользователя
                    </label>

                    <CMInput
                      {...register("username")}
                      placeholder="Например, Адилет"
                      autoComplete="username"
                      disabled={loginMutation.isPending || isSubmitting}
                      className={[
                        "bg-black/[0.02] text-[#101828] ring-black/10 placeholder:text-[#101828]/35",
                        errors.username ? "ring-1 ring-red-500/40" : "",
                      ].join(" ")}
                    />

                    {!!errors.username?.message && (
                      <div className="text-[11px] text-red-600">
                        {errors.username.message}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-1">
                    <label className="text-[#101828]/70 text-[11px]">
                      Пароль
                    </label>

                    <CMInput
                      {...register("password")}
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      disabled={loginMutation.isPending || isSubmitting}
                      className={[
                        "bg-black/[0.02] text-[#101828] ring-black/10 placeholder:text-[#101828]/35",
                        errors.password ? "ring-1 ring-red-500/40" : "",
                      ].join(" ")}
                    />

                    {!!errors.password?.message && (
                      <div className="text-[11px] text-red-600">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="mt-1">
                    <AltButton
                      onClick={onSubmit}
                      className="relative overflow-hidden"
                    >
                      <span className="relative z-[1]">
                        {loginMutation.isPending ? "Вход..." : "Войти"}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-90"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(229,117,11,.25), rgba(16,24,40,.08))",
                        }}
                      />
                    </AltButton>

                    {!!loginMutation.error && (
                      <div className="mt-3 rounded-md border border-red-500/25 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                        {(() => {
                          const e: any = loginMutation.error;
                          if (e?.response?.status === 401)
                            return "Неправильное имя пользователя или пароль";
                          return (
                            e?.response?.data?.detail ||
                            e?.message ||
                            "Не удалось войти в аккаунт"
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-black/10 bg-black/[0.02]">
            <div className="flex items-center justify-between text-[11px] text-[#101828]/55">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-black/15" />
                <span>SCADA Run • Редактор мнемосхем РЭС</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}