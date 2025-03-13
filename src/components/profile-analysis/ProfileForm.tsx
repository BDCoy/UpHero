import React from 'react';
import { Button } from '@components/Button';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  fullName: string;
  currentHeadline: string;
  currentDescription: string;
  isAnalyzing: boolean;
  onFullNameChange: (name: string) => void;
  onHeadlineChange: (headline: string) => void;
  onDescriptionChange: (description: string) => void;
  onAnalyze: () => void;
}

export function ProfileForm({
  fullName,
  currentHeadline,
  currentDescription,
  isAnalyzing,
  onFullNameChange,
  onHeadlineChange,
  onDescriptionChange,
  onAnalyze
}: ProfileFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-upwork-gray mb-4">
        Current Profile Content
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-2">
            Profile Headline
          </label>
          <input
            type="text"
            value={currentHeadline}
            onChange={(e) => onHeadlineChange(e.target.value)}
            className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
            placeholder="Enter your current Upwork profile headline"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-2">
            Profile Description
          </label>
          <textarea
            value={currentDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={8}
            className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green resize-none"
            placeholder="Enter your current Upwork profile description"
          />
        </div>
      </div>

      <Button
        onClick={onAnalyze}
        disabled={isAnalyzing || !fullName.trim() || !currentHeadline.trim() || !currentDescription.trim()}
        className="mt-6 w-full"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing Profile...
          </>
        ) : (
          'Analyze Profile'
        )}
      </Button>
    </div>
  );
}