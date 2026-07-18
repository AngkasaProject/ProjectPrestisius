import { useEffect, useMemo, useState } from "react";

import PreviewPanel from "@/components/qr/PreviewPanel";
import SourcePanel from "@/components/qr/SourcePanel";

import { toast } from "sonner";

import type { Link } from "@/types/link";
import { getAccessToken } from "@/lib/auth/client";

import type { QRMode } from "@/components/qr/types";

interface Props {
  origin: string;
}

export default function QRStudioPage({ origin }: Props) {
  const [mode, setMode] = useState<QRMode>("link");

  const [customUrl, setCustomUrl] = useState("");

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");

  const qrValue = useMemo(() => {
    if (mode === "custom") {
      return customUrl.trim();
    }

    if (!selectedLink) {
      return "";
    }

    return `${origin}/${selectedLink.slug}`;
  }, [mode, customUrl, selectedLink, origin]);

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

        const data: Link[] = await res.json();

        setLinks(data);

        if (data.length > 0) {
          setSelectedLink(data[0]);
        }
      } catch {
        toast.error("Failed to load links");
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <SourcePanel
        mode={mode}
        customUrl={customUrl}
        links={links}
        loading={loading}
        selectedLink={selectedLink}
        onSelectLink={setSelectedLink}
        onModeChange={setMode}
        onCustomUrlChange={setCustomUrl}
      />

      <PreviewPanel
        value={qrValue}
        filename={selectedLink?.slug ?? "qr-code"}
        foreground={foreground}
        background={background}
        onForegroundChange={setForeground}
        onBackgroundChange={setBackground}
      />
    </div>
  );
}
