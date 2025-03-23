import React, { useRef } from "react";
import { createCoverLetter } from "@lib/openai";
import { toast } from "@lib/store";
import { useCoverLetterStore } from "@lib/store/cover-letter";
import { CVUploader } from "@components/cover-letter/CVUploader";
import { JobDetailsForm } from "@components/cover-letter/JobDetailsForm";
import { ActionButtons } from "@components/cover-letter/ActionButtons";
import { Preview } from "@components/cover-letter/Preview";
import type { FormData } from "@components/cover-letter/types";
import { useAuth } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supabase";

export function CoverLetter() {
  const {
    cvContent,
    formData,
    generatedLetter,
    setCV,
    setFormData,
    setGeneratedLetter,
    reset,
  } = useCoverLetterStore();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (text: string) => {
    setCV(text);
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGenerate = async () => {
    if (!cvContent) {
      toast.error("Please upload your CV");
      return;
    }

    if (!formData.jobDescription) {
      toast.error("Please enter the job description");
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
      toast.success("Cover letter generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("cover_letter_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.cover_letter_count || 0) + 1;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ cover_letter_count: newCount })
        .eq("id", user?.id);

      if (updateError) {
        console.error("Database update error:", updateError);
      }
    } catch (error) {
      toast.error("Failed to generate cover letter: " + error);
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
      <div>
        <h1 className="text-2xl font-bold text-upwork-gray">
          Cover Letter Generator
        </h1>
        <p className="mt-1 text-sm text-upwork-gray-light">
          Generate a professional cover letter tailored to your CV and the job
          description
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CVUploader
            cvContent={cvContent}
            onFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          <JobDetailsForm formData={formData} onFormChange={handleFormChange} />

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
