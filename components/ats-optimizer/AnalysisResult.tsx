import React from 'react';
import { ScoreCard } from './ScoreCard';
import { KeywordsSection } from './KeywordsSection';
import { Recommendations } from './Recommendations';
import { Formatting } from './Formatting';
import type { AnalysisResultProps } from './types';

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="divide-y divide-upwork-background">
      {/* Score Card - Full width */}
      <div className="p-6">
        <ScoreCard score={analysis.score} />
      </div>

      {/* Keywords Section */}
      <div className="p-6">
        <KeywordsSection
          foundKeywords={analysis.foundKeywords}
          missingKeywords={analysis.missingKeywords}
        />
      </div>

      {/* Recommendations Section */}
      <div className="p-6">
        <Recommendations
          recommendations={analysis.recommendations}
          skillGaps={analysis.skillGaps}
        />
      </div>

      {/* Formatting Section */}
      <div className="p-6">
        <Formatting
          formatIssues={analysis.formatIssues}
          improvementSuggestions={analysis.improvementSuggestions}
        />
      </div>
    </div>
  );
}