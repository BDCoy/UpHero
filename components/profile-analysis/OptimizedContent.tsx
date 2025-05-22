import React from 'react';
import { Star, Target, Lightbulb } from 'lucide-react';
import type { ProfileAnalysis } from '@lib/store/profile-analysis';

interface OptimizedContentProps {
  analysis: ProfileAnalysis;
}

export function OptimizedContent({ analysis }: OptimizedContentProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-upwork-gray">Profile Score</h2>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="text-2xl font-bold text-upwork-gray">{analysis.score}/100</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-upwork-gray mb-2 flex items-center">
            <Target className="w-4 h-4 mr-2 text-upwork-green" />
            Optimized Headline
          </h3>
          <div className="bg-upwork-background rounded-lg p-4">
            <p className="text-upwork-gray">{analysis.optimizedHeadline}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-upwork-gray mb-2 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-upwork-green" />
            Optimized Description
          </h3>
          <div className="bg-upwork-background rounded-lg p-4">
            <p className="text-upwork-gray whitespace-pre-wrap">{analysis.optimizedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}