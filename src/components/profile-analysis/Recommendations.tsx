import React from 'react';
import { CheckCircle } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-upwork-gray mb-4">Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-upwork-green flex-shrink-0 mt-1" />
            <p className="text-upwork-gray-light">{recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}