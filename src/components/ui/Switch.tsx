import * as SwitchPrimitive from "@radix-ui/react-switch";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function Switch({ checked, onCheckedChange }: Props) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="
        relative
        h-6
        w-11
        rounded-full
        transition
        data-[state=checked]:bg-zinc-900
        data-[state=unchecked]:bg-zinc-300
      "
    >
      <SwitchPrimitive.Thumb
        className="
          block
          h-5
          w-5
          translate-x-0.5
          rounded-full
          bg-white
          shadow
          transition
          data-[state=checked]:translate-x-5
        "
      />
    </SwitchPrimitive.Root>
  );
}
