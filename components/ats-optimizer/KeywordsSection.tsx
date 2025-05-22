import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { KeywordsSectionProps } from './types';

export function KeywordsSection({ foundKeywords, missingKeywords }: KeywordsSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-upwork-gray">Keywords Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-upwork-green" />
            <span className="font-medium text-upwork-gray">Found Keywords</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {foundKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-upwork-green/10 text-upwork-green rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="font-medium text-upwork-gray">Missing Keywords</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}