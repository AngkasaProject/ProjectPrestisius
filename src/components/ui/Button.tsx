import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: Props) {
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",

    secondary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-2xl
        px-5
        py-2.5
        text-sm
        font-medium
        transition
        active:scale-[.98]
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
