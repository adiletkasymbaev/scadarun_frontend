import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

const base =
  "w-full rounded-md bg-white/10 px-2 py-1.5 text-xs outline-none ring-1 ring-white/10";

export function CMInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function CMSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${base} ${props.className ?? ""}`} />;
}