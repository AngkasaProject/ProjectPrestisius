import Modal from "./Modal";
import Button from "./Button";

type Props = {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="text-sm text-zinc-600">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          className="bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="button" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
