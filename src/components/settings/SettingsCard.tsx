type Props = {
  title: string;
  description: string;
  href?: string;
  disabled?: boolean;
};

export default function SettingsCard({
  title,
  description,
  href,
  disabled = false,
}: Props) {
  const content = (
    <div
      className={`
  group
  flex items-center justify-between
  rounded-[28px]
  border border-zinc-200
  bg-white
  p-5
  shadow-md
  transition-all
  duration-200
  ${
    disabled
      ? "opacity-70"
      : "cursor-pointer hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
  }
`}
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-zinc-100
            text-xl
          "
        >
          {title === "Profile" && "👤"}
          {title === "Security" && "🔒"}
          {title === "Danger Zone" && "⚠️"}
        </div>

        <div>
          <h3 className="text-base font-semibold text-zinc-900">{title}</h3>

          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>

      {disabled ? (
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Soon
        </span>
      ) : (
        <span className="text-2xl text-zinc-400 transition-transform group-hover:translate-x-1">
          →
        </span>
      )}
    </div>
  );

  if (disabled) return content;

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}
