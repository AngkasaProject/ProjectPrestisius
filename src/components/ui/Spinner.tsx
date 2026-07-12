type Props = {
  size?: number;
};

export default function Spinner({ size = 18 }: Props) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
