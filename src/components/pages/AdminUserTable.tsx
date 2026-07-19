import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

type AdminUser = {
  id: string;
  fullName: string;
  role: string;
  status: "active" | "suspended";
  createdAt: string;
  totalLinks: number;
};

export default function AdminUserTable() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/global-stats");
      if (!res.ok) throw new Error("Gagal mengambil data");

      const result = (await res.json()) as { users: AdminUser[] };
      setUsers(result.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    await supabase.from("profiles").update({ status: newStatus }).eq("id", id);
    fetchUsers();
  }

  if (loading) return <div>Memuat...</div>;

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 border-b">
          <tr>
            <th className="p-4">Pengguna</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Links</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-4 font-semibold">{user.fullName}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-4 text-right">{user.totalLinks}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => toggleStatus(user.id, user.status)}
                  className={`text-xs px-3 py-1 rounded-lg border ${user.status === "active" ? "border-red-200 text-red-600" : "border-green-200 text-green-600"}`}
                >
                  {user.status === "active" ? "Suspend" : "Aktifkan"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
