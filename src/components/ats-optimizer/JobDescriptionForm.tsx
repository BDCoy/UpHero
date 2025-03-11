import React from 'react';
import type { JobDescriptionFormProps } from './types';

export function JobDescriptionForm({ jobDescription, onJobDescriptionChange }: JobDescriptionFormProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <label htmlFor="job-description" className="block text-lg font-semibold text-upwork-gray mb-2">
        Job Description
      </label>
      <textarea
        id="job-description"
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        rows={8}
        className="mt-1 block w-full rounded-md border border-upwork-gray-lighter shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-2 focus:ring-upwork-green focus:border-upwork-green resize-none"
        placeholder="Paste the job description here..."
      />
    </div>
  );
}