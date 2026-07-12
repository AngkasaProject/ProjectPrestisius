import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  onConfirm: () => void;
};

export default function DeleteDialog({
  open,
  onOpenChange,
  slug,
  onConfirm,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            w-[90vw]
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            rounded-2xl
            bg-white
            p-6
            shadow-xl
          "
        >
          <Dialog.Title className="text-xl font-bold">Delete Link</Dialog.Title>

          <Dialog.Description className="mt-3 text-zinc-600">
            Are you sure you want to delete
            <br />
            <span className="font-semibold">{slug}</span>?
          </Dialog.Description>

          <p className="mt-4 text-sm text-red-500">
            This action cannot be undone.
          </p>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-zinc-200 px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="rounded-xl bg-red-600 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
