import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import type { Profile } from "@/types/profile";
import { getStorageUrl } from "@/lib/storage";
import { Toaster, toast } from "sonner";

type ApiResponse = {
  message?: string;
};

type UploadResponse = {
  path: string;
  url: string;
  message?: string;
};

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  const [form, setForm] = useState({
    username: "",
    full_name: "",
    bio: "",
    website: "",
    avatar_url: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Session not found");
      }

      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load profile");
      }

      const profile = (await res.json()) as Profile;

      setForm({
        username: profile.username ?? "",
        full_name: profile.full_name ?? "",
        bio: profile.bio ?? "",
        website: profile.website ?? "",
        avatar_url: profile.avatar_url ?? "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Session not found");
      }

      const payload = {
        ...form,
      };
      if (removeAvatar) {
        payload.avatar_url = "";
      }

      // Upload avatar jika user memilih foto baru
      if (avatarFile && !removeAvatar) {
        const formData = new FormData();

        formData.append("file", avatarFile);
        formData.append("type", "avatars");

        const uploadRes = await fetch("/api/upload/image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        });

        const uploadJson = (await uploadRes.json()) as UploadResponse;

        if (!uploadRes.ok) {
          toast.error(uploadJson.message ?? "Upload failed");
          return;
        }

        payload.avatar_url = uploadJson.path;
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as ApiResponse;

      if (!res.ok) {
        toast.error(json.message ?? "Failed to update profile");
        return;
      }

      // Sinkronkan state dengan data terbaru
      setForm(payload);

      // Bersihkan preview sementara
      setAvatarFile(null);

      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }

      setAvatarPreview(null);
      setRemoveAvatar(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }
  function choosePhoto() {
    fileInputRef.current?.click();
  }

  function onPhotoSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setRemoveAvatar(false);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarPreview(null);
    setAvatarFile(null);
    setRemoveAvatar(true);

    update("avatar_url", "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  if (loading) {
    return (
      <>
        <Toaster richColors position="top-right" />

        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-md">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-md">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-4xl">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : form.avatar_url ? (
              <img
                src={getStorageUrl(form.avatar_url)}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>

          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPhotoSelected}
            />

            <button
              type="button"
              onClick={choosePhoto}
              className="mt-4 rounded-xl border border-zinc-200 px-4 py-2 text-sm transition hover:bg-zinc-50"
            >
              Change Photo
            </button>
            {(avatarPreview || form.avatar_url) && (
              <button
                type="button"
                onClick={removePhoto}
                className="mt-2 text-sm text-red-600 transition hover:text-red-700"
              >
                Remove Photo
              </button>
            )}
          </>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Username</label>

            <input
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Bio</label>

            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              className="w-full resize-none rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="Tell people about yourself..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Website</label>

            <input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="mt-8">
          <Button className="w-full" onClick={saveProfile} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}
