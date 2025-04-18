import React from 'react';
import { Button } from '@components/ui/Button';
import type { ActionButtonsProps } from './types';

export function ActionButtons({ onGenerate, onReset, isGenerating, isDisabled }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={onGenerate}
        disabled={isGenerating || isDisabled}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <span className="mr-2 animate-spin">⏳</span>
            Generating...
          </>
        ) : (
          'Generate ATS Tips'
        )}
      </Button>
      <Button variant="outline" onClick={onReset} className="w-full">
        Reset
      </Button>
    </div>
  );
}