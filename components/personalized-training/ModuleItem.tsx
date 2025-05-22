import { CheckCircle, Circle } from "lucide-react";

interface ModuleItemProps {
  title: string;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
  onToggleComplete: () => void;
}

export function ModuleItem({
  title,
  isSelected,
  isCompleted,
  onClick,
  onToggleComplete,
}: ModuleItemProps) {
  return (
    <div
      className={`flex items-center justify-between gap-2 p-2 rounded-md cursor-pointer text-gray-700 hover:bg-upwork-gray-lighter hover:text-white transition-all duration-300 ${
        isSelected ? "bg-upwork-green text-white" : ""
      }`}
      onClick={onClick}
    >
      <span
        className={`text-sm ${
          isCompleted
            ? "line-through  hover:text-white"
            : "hover:text-upwork-gray-dark"
        }`}
      >
        {title}
      </span>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete();
        }}
      >
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-green-500 hover:text-white transition-transform transform hover:scale-110" />
        ) : (
          <Circle className="w-5 h-5 text-upwork-gray-light hover:text-white transition-transform transform hover:scale-110" />
        )}
      </div>
    </div>
  );
}
