import React from 'react';
import { TONE_OPTIONS } from './constants';
import type { JobDetailsFormProps } from './types';

export function JobDetailsForm({ formData, onFormChange }: JobDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-6">
      <h2 className="text-lg font-semibold text-upwork-gray">Job Details</h2>
      
      <div>
        <label className="block text-sm font-medium text-upwork-gray mb-2">
          Job Description
        </label>
        <textarea
          value={formData.jobDescription}
          onChange={(e) => onFormChange('jobDescription', e.target.value)}
          rows={8}
          className="mt-1 block w-full rounded-md border-upwork-gray-lighter shadow-sm focus:border-upwork-green focus:ring-2 focus:ring-upwork-green/20 focus:ring-offset-0 resize-none"
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => onFormChange('companyName', e.target.value)}
            className="mt-1 block w-full rounded-md border-upwork-gray-lighter shadow-sm focus:border-upwork-green focus:ring-2 focus:ring-upwork-green/20 focus:ring-offset-0"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-2">
            Hiring Manager
          </label>
          <input
            type="text"
            value={formData.hiringManager}
            onChange={(e) => onFormChange('hiringManager', e.target.value)}
            className="mt-1 block w-full rounded-md border-upwork-gray-lighter shadow-sm focus:border-upwork-green focus:ring-2 focus:ring-upwork-green/20 focus:ring-offset-0"
            placeholder="Enter hiring manager's name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-upwork-gray mb-3">
          Tone
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3">
          {TONE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.tone === option.value
                  ? 'border-upwork-green bg-upwork-background ring-2 ring-upwork-green ring-opacity-50'
                  : 'border-upwork-gray-lighter hover:border-upwork-green hover:bg-upwork-background'
              }`}
            >
              <input
                type="radio"
                name="tone"
                value={option.value}
                checked={formData.tone === option.value}
                onChange={(e) => onFormChange('tone', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-upwork-gray">
                    {option.label}
                  </p>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    formData.tone === option.value
                      ? 'border-upwork-green bg-upwork-green'
                      : 'border-upwork-gray-lighter'
                  }`}>
                    {formData.tone === option.value && (
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
    </div>
  );
}