type Props = {
  checked: boolean;
};

export default function Switch({ checked }: Props) {
  return (
    <div
      className={`
relative
h-7
w-12
rounded-full
transition

${checked ? "bg-zinc-900" : "bg-zinc-300"}
`}
    >
      <div
        className={`
absolute
top-1
size-5
rounded-full
bg-white
transition

${checked ? "left-6" : "left-1"}
`}
      />
    </div>
  );
}
