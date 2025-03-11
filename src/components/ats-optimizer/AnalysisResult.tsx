import React from 'react';
import { ScoreCard } from './ScoreCard';
import { KeywordsSection } from './KeywordsSection';
import { Recommendations } from './Recommendations';
import { Formatting } from './Formatting';
import type { AnalysisResultProps } from './types';

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Score Card - Full width */}
      <div className="lg:col-span-2">
        <ScoreCard score={analysis.score} />
      </div>

      {/* Keywords Section */}
      <div className="bg-white rounded-lg p-4">
        <KeywordsSection
          foundKeywords={analysis.foundKeywords}
          missingKeywords={analysis.missingKeywords}
        />
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-lg p-4">
        <Recommendations
          recommendations={analysis.recommendations}
          skillGaps={analysis.skillGaps}
        />
      </div>

      {/* Formatting Section - Full width */}
      <div className="lg:col-span-2 bg-white rounded-lg p-4">
        <Formatting
          formatIssues={analysis.formatIssues}
          improvementSuggestions={analysis.improvementSuggestions}
        />
      </div>
    </div>
  );
}