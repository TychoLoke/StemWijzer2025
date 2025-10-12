import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c1121f] via-[#ffffff] to-[#003399] px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(17,24,39,0.25)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.99] hover:shadow-[0_18px_45px_rgba(0,51,153,0.35)] ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default PrimaryButton;
