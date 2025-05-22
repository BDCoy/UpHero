import React from 'react';
import { Target } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col items-center justify-center h-full text-center text-upwork-gray-light py-12">
        <Target className="w-12 h-12 mb-4" />
        <p className="text-lg mb-2">Ready to optimize your profile?</p>
        <p className="text-sm">
          Enter your current profile content to get AI-powered recommendations
        </p>
      </div>
    </div>
  );
}