import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState("/");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          window.location.replace("/login");
          return;
        }

        setUser(session.user);
        setLoading(false);
      } catch {
        window.location.replace("/login");
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.replace("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />

          <p className="mt-4 text-sm text-zinc-500">Memverifikasi sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar
        open={sidebar}
        close={() => setSidebar(false)}
        pathname={pathname}
        user={user}
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
