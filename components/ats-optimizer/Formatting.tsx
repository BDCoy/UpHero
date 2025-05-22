import React from 'react';
import { Edit3, Lightbulb } from 'lucide-react';
import type { FormattingProps } from './types';

export function Formatting({ formatIssues, improvementSuggestions }: FormattingProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-upwork-gray">Format & Structure</h2>

      <div className="grid gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Edit3 className="h-5 w-5 text-indigo-500" />
            <span className="font-medium text-upwork-gray">Format Issues</span>
          </div>
          <div className="grid gap-3">
            {formatIssues.map((issue, idx) => (
              <div
                key={idx}
                className="bg-indigo-50 rounded-lg p-4 text-upwork-gray-light"
              >
                {issue}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-upwork-gray">Improvement Suggestions</span>
          </div>
          <div className="grid gap-3">
            {improvementSuggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="bg-orange-50 rounded-lg p-4 text-upwork-gray-light"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}