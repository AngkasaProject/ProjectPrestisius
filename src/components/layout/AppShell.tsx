import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

export type UserProfile = {
  role: "user" | "admin";
  full_name: string | null;
  avatar_url: string | null;
  username: string | null;
};

export type CustomUser = User & {
  profile?: UserProfile;
};

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState("/");
  const [user, setUser] = useState<CustomUser | null>(null);

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

        const { data: profile } = await supabase
          .from("profiles")
          .select(
            `
            role,
            full_name,
            avatar_url,
            username
          `,
          )
          .eq("id", session.user.id)
          .single();

        const customUser: CustomUser = {
          ...session.user,
          profile: {
            role: profile?.role ?? "user",
            full_name: profile?.full_name ?? null,
            avatar_url: profile?.avatar_url ?? null,
            username: profile?.username ?? null,
          },
        };

        setUser(customUser);
        setLoading(false);
      } catch {
        window.location.replace("/login");
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (!session) {
          window.location.replace("/login");
        }
      },
    );

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
