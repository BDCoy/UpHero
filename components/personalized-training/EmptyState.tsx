import { Circle } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-upwork-gray-light py-12">
      <Circle className="w-12 h-12 mb-4 text-upwork-gray-light" />
      <p className="text-sm text-upwork-gray">
        Please select a module to view its content.
      </p>
    </div>
  );
};
