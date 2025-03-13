import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import type { RecommendationsProps } from './types';

export function Recommendations({ recommendations, skillGaps }: RecommendationsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-upwork-gray">Improvement Suggestions</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="font-medium text-upwork-gray">Recommendations</span>
          </div>
          <div className="grid gap-3">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-yellow-50 rounded-lg p-4 text-upwork-gray-light"
              >
                {rec}
              </div>
            ))}
          </div>
        </div>

        {skillGaps.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-upwork-gray">Skill Gaps</span>
            </div>
            <div className="grid gap-3">
              {skillGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-upwork-gray">{gap.skill}</span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      gap.importance === 'high'
                        ? 'bg-red-100 text-red-700'
                        : gap.importance === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {gap.importance}
                    </span>
                  </div>
                  <p className="text-upwork-gray-light">{gap.context}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}