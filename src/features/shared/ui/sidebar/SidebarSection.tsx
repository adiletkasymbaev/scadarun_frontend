import type { ReactNode } from "react";

type Props = {
  variant?: "filled" | "bordered";
  className?: string;
  children: ReactNode;
};

export function SidebarSection({ variant = "filled", className = "", children }: Props) {
  const base = variant === "bordered" ? "sidebar-card-bordered" : "sidebar-card-filled";
  return <div className={`${base} ${className}`}>{children}</div>;
}