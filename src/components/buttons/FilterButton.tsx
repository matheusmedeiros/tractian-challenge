import { twMerge } from "tailwind-merge";

interface FilterButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterButton({
  icon,
  label,
  isActive,
  onClick,
}: FilterButtonProps) {
  const buttonBaseClasses =
    "flex items-center space-x-2 px-4 py-2 border rounded-sm";
  const buttonActiveClasses =
    "bg-primary-active text-white border-primary-active";
  const buttonInactiveClasses =
    "text-heading border-outline hover:bg-outline/10";

  return (
    <button
      onClick={onClick}
      className={twMerge(
        buttonBaseClasses,
        isActive ? buttonActiveClasses : buttonInactiveClasses
      )}
    >
      <img
        src={icon}
        alt=""
        className={twMerge("w-4 h-4", isActive ? "brightness-0 invert" : "")}
      />
      <span className="font-semibold">{label}</span>
    </button>
  );
}
