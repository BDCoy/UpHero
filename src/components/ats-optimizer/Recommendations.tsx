import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import type { RecommendationsProps } from './types';

export function Recommendations({ recommendations, skillGaps }: RecommendationsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <span className="font-medium text-upwork-gray">Recommendations</span>
        </div>
        <ul className="mt-2 ml-8 list-disc text-upwork-gray-light">
          {recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </div>

      {skillGaps.length > 0 && (
        <div>
          <div className="flex items-center space-x-2">
            <Info className="h-6 w-6 text-blue-500" />
            <span className="font-medium text-upwork-gray">Skill Gaps</span>
          </div>
          <ul className="mt-2 ml-8 list-disc text-upwork-gray-light">
            {skillGaps.map((gap, idx) => (
              <li key={idx}>
                <span className="font-medium">{gap.skill}</span> ({gap.importance}) – {gap.context}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}