import React, { useState } from 'react';
import { Button } from '@components/Button';
import { RefreshCw } from 'lucide-react';
import { toast } from '@lib/store';
import { useProposalStore } from '@lib/store/proposal';
import { generateProposal } from '@lib/openai/proposal';
import { ProposalForm } from '@components/proposal/ProposalForm';
import { ProposalPreview } from '@components/proposal/ProposalPreview';

export function ProposalGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    fullName,
    profileDescription,
    jobDescription,
    tone,
    clientQuestions,
    generatedProposal,
    setFullName,
    setProfileDescription,
    setJobDescription,
    setTone,
    addQuestion,
    removeQuestion,
    updateQuestion,
    setGeneratedProposal,
    reset
  } = useProposalStore();

  const handleGenerate = async () => {
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!profileDescription.trim()) {
      toast.error('Please provide your profile description');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Please provide the job description');
      return;
    }

    try {
      setIsGenerating(true);
      const result = await generateProposal(
        fullName,
        profileDescription,
        jobDescription,
        clientQuestions.map(q => q.text),
        tone
      );
      setGeneratedProposal(result);
      toast.success('Proposal generated successfully!');
    } catch (error) {
      console.error('Error generating proposal:', error);
      toast.error('Failed to generate proposal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddQuestion = () => {
    addQuestion('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">Proposal Generator</h1>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Generate winning proposals tailored to specific job requirements
          </p>
        </div>
        {generatedProposal && (
          <Button 
            variant="outline" 
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start New Proposal
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div>
          <ProposalForm
            fullName={fullName}
            profileDescription={profileDescription}
            jobDescription={jobDescription}
            tone={tone}
            clientQuestions={clientQuestions}
            isGenerating={isGenerating}
            onFullNameChange={setFullName}
            onProfileDescriptionChange={setProfileDescription}
            onJobDescriptionChange={setJobDescription}
            onToneChange={setTone}
            onAddQuestion={handleAddQuestion}
            onRemoveQuestion={removeQuestion}
            onUpdateQuestion={updateQuestion}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Preview Section - Fixed height and scrollable */}
        <div className="h-[calc(100vh-12rem)] sticky top-24">
          {generatedProposal ? (
            <div className="h-full overflow-y-auto">
              <ProposalPreview proposal={generatedProposal} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
              <div className="text-center text-upwork-gray-light">
                <p className="text-lg mb-2">Your generated proposal will appear here</p>
                <p className="text-sm">
                  Fill in the form and click "Generate Proposal" to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}