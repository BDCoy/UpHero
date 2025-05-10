import { ProfileAnalysis } from "@/lib/store/profile-analysis";
import { EmptyState } from "./EmptyState";
import { KeywordsList } from "./KeywordsList";
import { OptimizedContent } from "./OptimizedContent";
import { Recommendations } from "./Recommendations";


export function PreviewSection({ analysis }: { analysis: ProfileAnalysis }) {
  return analysis ? (
    <div className="h-full overflow-y-auto space-y-6">
      <OptimizedContent analysis={analysis} />
      <Recommendations recommendations={analysis.recommendations} />
      <KeywordsList
        title="Keyword Suggestions"
        items={analysis.keywordSuggestions}
      />
      <KeywordsList
        title="Skills to Highlight"
        items={analysis.skillHighlights}
        variant="highlight"
      />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <EmptyState />
    </div>
  );
}