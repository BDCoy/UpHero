import React, { useState, useRef } from 'react';
import { toast } from '@lib/store';
import { Button } from '@components/Button';
import { CVUploader } from '@components/cover-letter/CVUploader';
import { generateATSRecommendations } from '@lib/openai';
import { JobDescriptionForm } from '@components/ats-optimizer/JobDescriptionForm';
import { ActionButtons } from '@components/ats-optimizer/ActionButtons';
import { AnalysisResult } from '@components/ats-optimizer/AnalysisResult';
import { useATSOptimizerStore } from '@lib/store/ats-optimizer';

export function ATSOptimizer() {
  const {
    cvContent,
    jobDescription,
    analysis: atsAnalysis,
    setCvContent,
    setJobDescription,
    setAnalysis,
    reset
  } = useATSOptimizerStore();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (text: string) => {
    setCvContent(text);
  };

  const handleGenerate = async () => {
    if (!cvContent) {
      toast.error('Please upload your CV');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Please enter the job description');
      return;
    }
    try {
      setIsGenerating(true);
      const analysis = await generateATSRecommendations(cvContent, jobDescription);
      setAnalysis(analysis);
      toast.success('ATS analysis generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to generate ATS analysis'
      );
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">
            ATS Resume Optimizer
          </h1>
          <p className="mt-1 text-sm text-upwork-gray-light">
            {atsAnalysis 
              ? 'Review your ATS analysis and optimization suggestions below.'
              : 'Upload your CV and enter the job description to get a detailed ATS analysis with actionable tips.'}
          </p>
        </div>
        {atsAnalysis && (
          <Button variant="outline" onClick={handleReset} className="shrink-0">
            Start New Analysis
          </Button>
        )}
      </div>

      {!atsAnalysis ? (
        // Input Form View
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <section className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <CVUploader
                cvContent={cvContent}
                onFileChange={handleFileChange}
                fileInputRef={fileInputRef}
              />
            </div>

            <JobDescriptionForm
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
            />

            <ActionButtons
              onGenerate={handleGenerate}
              onReset={handleReset}
              isGenerating={isGenerating}
              isDisabled={!cvContent || !jobDescription}
            />
          </section>

          <section className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-center h-full p-6 text-center text-upwork-gray-light">
              <p className="text-lg">ATS analysis will appear here once generated.</p>
            </div>
          </section>
        </div>
      ) : (
        // Analysis Result View
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <AnalysisResult analysis={atsAnalysis} />
        </div>
      )}
    </div>
  );
}