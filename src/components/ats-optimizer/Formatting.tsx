import React from 'react';
import { Edit3, Lightbulb } from 'lucide-react';
import type { FormattingProps } from './types';

export function Formatting({ formatIssues, improvementSuggestions }: FormattingProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div>
        <div className="flex items-center space-x-2">
          <Edit3 className="h-6 w-6 text-indigo-500" />
          <span className="font-medium text-upwork-gray">Format Issues</span>
        </div>
        <ul className="mt-2 ml-8 list-disc text-upwork-gray-light">
          {formatIssues.map((issue, idx) => (
            <li key={idx}>{issue}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-6 w-6 text-orange-500" />
          <span className="font-medium text-upwork-gray">Improvement Suggestions</span>
        </div>
        <ul className="mt-2 ml-8 list-disc text-upwork-gray-light">
          {improvementSuggestions.map((suggestion, idx) => (
            <li key={idx}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}