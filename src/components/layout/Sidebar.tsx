import Logo from "./Logo";
import NavItem from "./NavItem";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
// Impor CustomUser yang sudah kita buat di AppShell sebelumnya
import type { CustomUser } from "./AppShell";

type Props = {
  open: boolean;
  close: () => void;
  pathname: string;
  user: CustomUser | null;
};

async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  window.location.href = "/login";
}

export default function Sidebar({ open, close, pathname, user }: Props) {
  return (
    <>
      <div
        onClick={close}
        className={`
fixed inset-0 z-40 bg-black/40 transition lg:hidden
${open ? "visible opacity-100" : "invisible opacity-0"}
`}
      />

      <aside
        className={`
fixed inset-y-0 left-0 z-50
flex w-72 flex-col
border-r border-zinc-200
bg-white
transition-transform duration-300

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
      >
        <div className="border-b border-zinc-200 p-6">
          <Logo />
        </div>

        <nav className="space-y-2 p-4">
          <NavItem
            active={pathname === "/admin"}
            title="Dashboard"
            href="/admin"
          />

          {/* MENU KHUSUS ADMIN: Hanya muncul jika role akun adalah admin */}
          {user?.role === "admin" && (
            <NavItem
              active={pathname.startsWith("/admin/global-stats")}
              title="Admin Panel"
              href="/admin/global-stats"
            />
          )}

          <NavItem
            active={pathname.startsWith("/admin/links")}
            title="Links"
            href="/admin/links"
          />

          <NavItem
            active={pathname.startsWith("/admin/qr")}
            title="QR Maker"
            href="/admin/qr"
          />

          <NavItem
            active={pathname.startsWith("/admin/images")}
            title="Images Library"
            href="/admin/images"
          />

          <NavItem
            active={pathname.startsWith("/admin/analytics")}
            title="Analytics"
            href="/admin/analytics"
          />

          <NavItem
            active={pathname.startsWith("/admin/settings")}
            title="Settings"
            href="/admin/settings"
          />
        </nav>

        <div className="mt-auto border-t border-zinc-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200 font-semibold">
              {/* Menampilkan inisial huruf besar dari nama depan atau email */}
              {(
                user?.user_metadata?.full_name?.[0] ||
                user?.email?.[0] ||
                "U"
              ).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">
                {user?.user_metadata?.full_name ||
                  user?.email?.split("@")[0] ||
                  "User"}
              </p>

              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
