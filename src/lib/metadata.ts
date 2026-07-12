type Metadata = {
  title: string;
  description: string;
  image: string | null;
  favicon: string | null;
};

export async function getMetadata(target: string): Promise<Metadata> {
  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AngkasaProjectBot/1.0)",
      },
    });

    const html = await res.text();

    const find = (property: string) => {
      const regex = new RegExp(
        `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"]+)["']`,
        "i",
      );

      return html.match(regex)?.[1] ?? "";
    };

    const title =
      find("og:title") || html.match(/<title>(.*?)<\/title>/i)?.[1] || "";

    const description = find("og:description") || find("description");

    const image = find("og:image") || null;

    let favicon: string | null = null;

    const icon = html.match(
      /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"]+)["']/i,
    );

    if (icon?.[1]) {
      favicon = new URL(icon[1], target).href;
    }

    return {
      title,
      description,
      image,
      favicon,
    };
  } catch {
    return {
      title: "",
      description: "",
      image: null,
      favicon: null,
    };
  }
}
