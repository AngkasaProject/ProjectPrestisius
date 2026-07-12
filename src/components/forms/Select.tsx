type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export default function Select({
  label,
  children,
  className = "",
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        {...props}
        className={`
w-full
rounded-2xl
border
border-zinc-200
bg-white
px-4
py-3
outline-none

${className}
`}
      >
        {children}
      </select>
    </div>
  );
}
