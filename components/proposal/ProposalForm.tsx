import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ClientQuestion } from '@lib/store/proposal';
import { Button } from '../ui/Button';

const TONE_OPTIONS = [
  {
    value: 'casual',
    label: 'Casual',
    description: 'Friendly and approachable while maintaining professionalism'
  },
  {
    value: 'confident',
    label: 'Confident',
    description: 'Project authority and expertise in your field'
  },
  {
    value: 'enthusiastic',
    label: 'Enthusiastic',
    description: 'Show genuine excitement and passion for the project'
  },
  {
    value: 'professional',
    label: 'Professional',
    description: 'Polished and business-appropriate'
  },
  {
    value: 'formal',
    label: 'Formal',
    description: 'Traditional business tone'
  }
];

interface ProposalFormProps {
  fullName: string;
  profileDescription: string;
  jobDescription: string;
  tone: string;
  clientQuestions: ClientQuestion[];
  isGenerating: boolean;
  onFullNameChange: (name: string) => void;
  onProfileDescriptionChange: (description: string) => void;
  onJobDescriptionChange: (description: string) => void;
  onToneChange: (tone: string) => void;
  onAddQuestion: () => void;
  onRemoveQuestion: (id: string) => void;
  onUpdateQuestion: (id: string, text: string) => void;
  onGenerate: () => void;
}

export function ProposalForm({
  fullName,
  profileDescription,
  jobDescription,
  tone,
  clientQuestions,
  isGenerating,
  onFullNameChange,
  onProfileDescriptionChange,
  onJobDescriptionChange,
  onToneChange,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onGenerate,
}: ProposalFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-upwork-gray mb-4">
        Proposal Details
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
            Profile Description
          </label>
          <textarea
            value={profileDescription}
            onChange={(e) => onProfileDescriptionChange(e.target.value)}
            rows={4}
            className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green resize-none"
            placeholder="Enter your professional profile description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            rows={6}
            className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green resize-none"
            placeholder="Paste the job description here"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-3">
            Proposal Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TONE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  tone === option.value
                    ? 'border-upwork-green bg-upwork-background ring-2 ring-upwork-green ring-opacity-50'
                    : 'border-upwork-gray-lighter hover:border-upwork-green hover:bg-upwork-background'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={tone === option.value}
                  onChange={(e) => onToneChange(e.target.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-upwork-gray">
                      {option.label}
                    </p>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      tone === option.value
                        ? 'border-upwork-green bg-upwork-green'
                        : 'border-upwork-gray-lighter'
                    }`}>
                      {tone === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-upwork-gray-light line-clamp-2">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-upwork-gray">
              Client Questions
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddQuestion}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </Button>
          </div>
          
          <div className="space-y-3">
            {clientQuestions.map((question) => (
              <div key={question.id} className="flex gap-3">
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => onUpdateQuestion(question.id, e.target.value)}
                  className="flex-1 rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                  placeholder="Enter client question"
                />
                <button
                  onClick={() => onRemoveQuestion(question.id)}
                  className="p-2 text-upwork-gray-light hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {clientQuestions.length === 0 && (
              <p className="text-sm text-upwork-gray-light italic">
                No client questions added yet
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={onGenerate}
        disabled={isGenerating || !fullName || !profileDescription || !jobDescription}
        className="mt-6 w-full"
      >
        {isGenerating ? 'Generating Proposal...' : 'Generate Proposal'}
      </Button>
    </div>
  );
}