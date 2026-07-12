type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function StatCard({ title, value, subtitle }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight">{value}</h2>

      {subtitle && <p className="mt-3 text-sm text-zinc-500">{subtitle}</p>}
    </div>
  );
}
