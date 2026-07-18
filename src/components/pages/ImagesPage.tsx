import { useEffect, useState } from "react";
import ImagePreviewDialog from "@/components/dialogs/ImagePreviewDialog";
import DeleteImageDialog from "@/components/dialogs/DeleteImageDialog";
import { getMyImages } from "@/services/images/client";
import type { ImageAsset } from "@/types/image";
import { deleteImage } from "@/services/images/delete";
import { Toaster, toast } from "sonner";

export default function ImagesPage() {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null);

  useEffect(() => {
    loadImages();
  }, []);
  async function handleDelete() {
    if (!selectedImage) return;

    try {
      setDeleting(true);

      await deleteImage(selectedImage.id);

      setImages((prev) =>
        prev.filter((image) => image.id !== selectedImage.id),
      );

      setShowDeleteDialog(false);
      setSelectedImage(null);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Failed to delete image.", {
          description: "An unexpected error occurred.",
        });
      } else {
        switch (error.message) {
          case "This image is currently used by one or more links.":
            toast.error("Unable to delete image", {
              description:
                "This image is still being used by one or more links. Remove it from those links before deleting.",
            });
            break;

          case "Forbidden.":
            toast.error("Permission denied", {
              description: "You don't have permission to delete this image.",
            });
            break;

          case "Image not found.":
            toast.error("Image not found", {
              description: "The selected image no longer exists.",
            });
            break;

          default:
            toast.error("Failed to delete image", {
              description: error.message,
            });
        }
      }
    } finally {
      setDeleting(false);
    }
  }
  async function loadImages() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyImages();
      setImages(data);
    } catch (err) {
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">
        Loading images...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
        No images found.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden border-b border-zinc-200 bg-zinc-50">
              <img
                src={image.url}
                alt={image.filename}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="space-y-1 p-3">
              <p
                className="truncate text-sm font-medium text-zinc-900"
                title={image.filename}
              >
                {image.filename}
              </p>

              <p className="text-xs text-zinc-500">
                {(image.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        ))}
      </div>

      <ImagePreviewDialog
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onDelete={() => setShowDeleteDialog(true)}
      />

      <DeleteImageDialog
        open={showDeleteDialog}
        loading={deleting}
        filename={selectedImage?.filename ?? ""}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
