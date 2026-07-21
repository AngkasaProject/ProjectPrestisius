import { useEffect, useRef } from "react";

export default function LeftSidebarAd() {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!banner.current) return;

    // jangan load dua kali
    if (banner.current.childNodes.length > 0) return;

    (window as any).atOptions = {
      key: "609a18c0ef27e2c81f6d00a3003c5411",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/609a18c0ef27e2c81f6d00a3003c5411/invoke.js";
    script.async = true;

    banner.current.appendChild(script);
  }, []);

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-6">
        <div
          ref={banner}
          className="overflow-hidden rounded-2xl"
          style={{
            width: 160,
            height: 600,
          }}
        />
      </div>
    </aside>
  );
}
