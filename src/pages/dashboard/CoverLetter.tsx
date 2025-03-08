import React, { useRef } from 'react';
import { createCoverLetter } from '@lib/openai';
import { toast } from '@lib/store';
import { useCoverLetterStore } from '@lib/store/cover-letter';
import { CVUploader } from '@components/cover-letter/CVUploader';
import { JobDetailsForm } from '@components/cover-letter/JobDetailsForm';
import { ActionButtons } from '@components/cover-letter/ActionButtons';
import { Preview } from '@components/cover-letter/Preview';
import type { FormData } from '@components/cover-letter/types';

export function CoverLetter() {
  const {
    cvContent,
    formData,
    generatedLetter,
    setCV,
    setFormData,
    setGeneratedLetter,
    reset
  } = useCoverLetterStore();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (text: string) => {
    setCV(text);
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGenerate = async () => {
    if (!cvContent) {
      toast.error('Please upload your CV');
      return;
    }

    if (!formData.jobDescription) {
      toast.error('Please enter the job description');
      return;
    }

    try {
      setIsGenerating(true);
      const letter = await createCoverLetter(
        cvContent,
        formData.jobDescription,
        formData.tone,
        formData.companyName,
        formData.hiringManager
      );
      setGeneratedLetter(letter);
      toast.success('Cover letter generated successfully!');
    } catch (error) {
      toast.error('Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-upwork-gray">Cover Letter Generator</h1>
        <p className="mt-1 text-sm text-upwork-gray-light">
          Generate a professional cover letter tailored to your CV and the job description
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CVUploader
            cvContent={cvContent}
            onFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />
          
          <JobDetailsForm
            formData={formData}
            onFormChange={handleFormChange}
          />

          <ActionButtons
            onGenerate={handleGenerate}
            onReset={handleReset}
            isGenerating={isGenerating}
            isDisabled={!cvContent || !formData.jobDescription}
          />
        </div>

        <Preview generatedLetter={generatedLetter} />
      </div>
    </div>
  );
}