import React from 'react';
import { Star } from 'lucide-react';
import type { ScoreCardProps } from './types';

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="bg-upwork-green/10 p-3 rounded-full">
          <Star className="h-8 w-8 text-upwork-green" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-upwork-gray">ATS Score</h2>
          <p className="text-sm text-upwork-gray-light">Based on keyword matches and formatting</p>
        </div>
      </div>
      <div className="text-4xl font-bold text-upwork-green">{score}/100</div>
    </div>
  );
}