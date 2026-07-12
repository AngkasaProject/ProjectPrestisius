import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const [sidebar, setSidebar] = useState(false);

  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <>
      <Sidebar
        open={sidebar}
        close={() => setSidebar(false)}
        pathname={pathname}
      />

      <div className="lg:ml-72">
        <Navbar openSidebar={() => setSidebar(true)} />

        <main className="p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </>
  );
}
