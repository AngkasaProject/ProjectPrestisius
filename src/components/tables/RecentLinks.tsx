const links = [
  {
    slug: "google",
    url: "https://google.com",
    clicks: 124,
  },
  {
    slug: "youtube",
    url: "https://youtube.com",
    clicks: 87,
  },
  {
    slug: "github",
    url: "https://github.com",
    clicks: 32,
  },
];

export default function RecentLinks() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h3 className="font-semibold">Recent Links</h3>
      </div>

      <div>
        {links.map((item) => (
          <div
            key={item.slug}
            className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 last:border-0"
          >
            <div>
              <p className="font-medium">{item.slug}</p>

              <p className="text-sm text-zinc-500">{item.url}</p>
            </div>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
              {item.clicks}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
