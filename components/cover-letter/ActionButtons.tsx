import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import type { ActionButtonsProps } from './types';
import { Button } from '../ui/Button';

export function ActionButtons({ onGenerate, onReset, isGenerating, isDisabled }: ActionButtonsProps) {
  return (
    <div className="flex space-x-4">
      <Button
        onClick={onGenerate}
        disabled={isGenerating || isDisabled}
        className="flex-1"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Generating...
          </>
        ) : (
          'Generate Cover Letter'
        )}
      </Button>
      <Button variant="outline" onClick={onReset} className="px-3">
        <RefreshCw className="w-5 h-5" />
      </Button>
    </div>
  );
}