import { ProfileAnalysis } from "@/lib/store/profile-analysis";
import { Button } from "../ui/Button";
import { RefreshCw } from "lucide-react";

export function AnalysisHeader({
  analysis,
  reset,
}: {
  analysis: ProfileAnalysis;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-upwork-gray">Profile Analysis</h1>
        <p className="mt-1 text-sm text-upwork-gray-light">
          Optimize your Upwork profile with AI-powered recommendations
        </p>
      </div>
      {analysis && (
        <Button
          variant="outline"
          onClick={reset}
          className="flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <RefreshCw className="w-4 h-4" />
          Start New Analysis
        </Button>
      )}
    </div>
  );
}
