import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    type={type}
    className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(17,24,39,0.35)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.99] hover:shadow-[0_18px_48px_rgba(0,51,153,0.4)] ${className}`}
    {...rest}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-[#c1121f] via-[#ffffff] to-[#003399]" aria-hidden />
    <span className="absolute inset-[-40%] bg-gradient-to-r from-[#c1121f]/30 via-white/30 to-[#003399]/30 blur-2xl opacity-70 transition duration-500 ease-out group-hover:opacity-90 group-hover:scale-[1.05]" aria-hidden />
    <span className="relative z-[1] flex items-center gap-2">{children}</span>
  </button>
);

export default PrimaryButton;
