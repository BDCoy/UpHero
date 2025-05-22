import { Loader2, CheckCircle, Circle } from "lucide-react";
import { Button } from "../ui/Button";

interface ModuleContentProps {
  title: string;
  content: JSX.Element;
  isCompleted: boolean;
  isLoading: boolean;
  onAnalyze: () => void;
  onToggleComplete: () => void;
}

export function ModuleContent({
  title,
  content,
  isCompleted,
  isLoading,
  onAnalyze,
  onToggleComplete,
}: ModuleContentProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-upwork-gray">{title}</h2>
        <Button
          onClick={() => {
            if (!isCompleted) {
              onAnalyze();
            } else {
              onToggleComplete();
            }
          }}
          disabled={isLoading}
          className="flex items-center ml-auto p-2 bg-upwork-green text-white rounded-md hover:bg-green-600 transition-all duration-300"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isCompleted ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <Circle className="w-5 h-5 text-white" />
          )}
        </Button>
      </div>
      <div className="text-sm text-upwork-gray">{content}</div>
    </>
  );
}
