import React, { useState, useRef } from "react";
import { toast } from "@lib/store";
import { Button } from "@components/Button";
import { CVUploader } from "@components/cover-letter/CVUploader";
import { generateATSRecommendations } from "@lib/openai";
import { JobDescriptionForm } from "@components/ats-optimizer/JobDescriptionForm";
import { ActionButtons } from "@components/ats-optimizer/ActionButtons";
import { AnalysisResult } from "@components/ats-optimizer/AnalysisResult";
import { useATSOptimizerStore } from "@lib/store/ats-optimizer";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthProvider";

export function ATSOptimizer() {
  const { user } = useAuth();
  const {
    cvContent,
    jobDescription,
    analysis: atsAnalysis,
    setCvContent,
    setJobDescription,
    setAnalysis,
    reset,
  } = useATSOptimizerStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (text: string) => {
    setCvContent(text);
  };

  const handleGenerate = async () => {
    if (!cvContent) {
      toast.error("Please upload your CV");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please enter the job description");
      return;
    }
    try {
      setIsGenerating(true);
      const analysis = await generateATSRecommendations(
        cvContent,
        jobDescription
      );
      setAnalysis(analysis);
      toast.success("ATS analysis generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("ats_optimizer_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.ats_optimizer_count || 0) + 1;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ ats_optimizer_count: newCount })
        .eq("id", user?.id);

      if (updateError) {
        console.error("Database update error:", updateError);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate ATS analysis"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">
            ATS Resume Optimizer
          </h1>
          <p className="mt-1 text-sm text-upwork-gray-light">
            {atsAnalysis
              ? "Review your ATS analysis and optimization suggestions below."
              : "Upload your CV and enter the job description to get a detailed ATS analysis with actionable tips."}
          </p>
        </div>
        {atsAnalysis && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Start New Analysis
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
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
        </div>

        {/* Preview Section - Fixed height and scrollable */}
        <div className="h-[calc(100vh-12rem)] sticky top-24">
          {atsAnalysis ? (
            <div className="h-full overflow-y-auto bg-white rounded-lg shadow-sm">
              <AnalysisResult analysis={atsAnalysis} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
              <div className="text-center text-upwork-gray-light">
                <p className="text-lg mb-2">
                  Your ATS analysis will appear here
                </p>
                <p className="text-sm">
                  Upload your CV and enter the job description to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
