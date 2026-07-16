import Button from "@/components/ui/Button";

type Props = {
  saving: boolean;
  disabled: boolean;
  mode: "create" | "edit";
  onCancel: () => void;
  onSave: () => void;
};

export default function LinkActionSection({
  saving,
  disabled,
  mode,
  onCancel,
  onSave,
}: Props) {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" variant="danger" onClick={onCancel}>
        Cancel
      </Button>

      <Button type="button" disabled={disabled} onClick={onSave}>
        {saving
          ? "Saving..."
          : mode === "create"
            ? "Create Link"
            : "Save Changes"}
      </Button>
    </div>
  );
}
