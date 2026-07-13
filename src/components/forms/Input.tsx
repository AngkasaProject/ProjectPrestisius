import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export default function Input({
  label,
  className = "",
  leftElement,
  rightElement,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="relative">
        {leftElement && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            {leftElement}
          </div>
        )}

        <input
          {...props}
          className={`
w-full
rounded-2xl
border
border-zinc-200
bg-white
py-3
outline-none
transition
focus:border-zinc-900

${leftElement ? "pl-11" : "px-4"}
${rightElement ? "pr-12" : "px-4"}

${className}
`}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
