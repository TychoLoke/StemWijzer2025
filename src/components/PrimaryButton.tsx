import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(236,72,153,0.28)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.99] hover:shadow-[0_16px_40px_rgba(249,115,22,0.32)] ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default PrimaryButton;
