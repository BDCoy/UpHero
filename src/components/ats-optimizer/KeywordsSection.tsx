import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { KeywordsSectionProps } from './types';

export function KeywordsSection({ foundKeywords, missingKeywords }: KeywordsSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-upwork-green" />
          <span className="font-medium text-upwork-gray">Found Keywords</span>
        </div>
        <ul className="mt-2 ml-8 list-disc text-upwork-gray-light">
          {foundKeywords.map((keyword, idx) => (
            <li key={idx}>{keyword}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <XCircle className="h-6 w-6 text-red-500" />
          <span className="font-medium text-upwork-gray">Missing Keywords</span>
        </div>
        <ul className="mt-2 ml-8 list-disc text-upwork-gray-light">
          {missingKeywords.map((keyword, idx) => (
            <li key={idx}>{keyword}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}