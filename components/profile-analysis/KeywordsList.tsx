import React from 'react';

interface KeywordsListProps {
  title: string;
  items: string[];
  variant?: 'default' | 'highlight';
}

export function KeywordsList({ title, items, variant = 'default' }: KeywordsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-upwork-gray mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${
              variant === 'highlight'
                ? 'bg-upwork-green/10 text-upwork-green'
                : 'bg-upwork-background text-upwork-gray'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}