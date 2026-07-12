type Props = {
  title: string;
  href: string;
  active?: boolean;
};

export default function NavItem({ title, href, active = false }: Props) {
  return (
    <a
      href={href}
      className={`
block rounded-2xl px-4 py-3
font-medium
transition

${active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"}
`}
    >
      {title}
    </a>
  );
}
