import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Link } from "@/types/link";

import { getAccessToken } from "@/lib/auth/client";

import LinksTable from "@/components/tables/LinksTable";
import LinkCards from "@/components/cards/LinkCards";

type Props = {
  origin: string;
};

export default function LinksPage({ origin }: Props) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLinks() {
      try {
        const token = await getAccessToken();

        const res = await fetch("/api/links", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setLinks(data);
      } catch {
        toast.error("Failed to load links");
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-zinc-500">Loading...</div>;
  }

  return (
    <>
      <div className="hidden lg:block">
        <LinksTable links={links} origin={origin} />
      </div>

      <div className="lg:hidden">
        <LinkCards links={links} origin={origin} />
      </div>
    </>
  );
}
