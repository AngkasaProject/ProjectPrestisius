type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className = "", ...props }: Props) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
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
transition

focus:border-zinc-900

${className}
`}
      />
    </div>
  );
}
