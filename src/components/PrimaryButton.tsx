import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    type={type}
    className={`rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:brightness-90 active:scale-[0.99] ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default PrimaryButton;
