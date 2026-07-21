import { useEffect, useRef } from "react";

export default function RightSidebarAd() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

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

    container.current.appendChild(script);
  }, []);

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-6">
        <div
          ref={container}
          style={{ width: 160, height: 600 }}
          className="overflow-hidden rounded-2xl"
        />
      </div>
    </aside>
  );
}
