"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCoverLetterStore } from "@lib/store/cover-letter";
import { JobDetailsForm } from "@/components/cover-letter/JobDetailsForm";
import { ActionButtons } from "@/components/cover-letter/ActionButtons";
import { Preview } from "@/components/cover-letter/Preview";
import type { FormData } from "@/components/cover-letter/types";
import { createCoverLetter } from "@/lib/openai/cover-letter";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { CVUploader } from "@/components/cover-letter/CVUploader";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { toast } from "@/lib/store/toast";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function CoverLetter() {
  const supabase = createClient();
  const {
    cvContent,
    formData,
    generatedLetter,
    setCV,
    setFormData,
    setGeneratedLetter,
    reset,
  } = useCoverLetterStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getData = useCallback(async () => {
    try {
      const [userData, subscriptionData] = await Promise.all([
        getUser(supabase),
        getSubscription(supabase),
      ]);
      setUser(userData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

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
    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "cover_letter_count"
    );

    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
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
        .from("users")
        .select("cover_letter_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.cover_letter_count || 0) + 1;

      const { error } = await supabase.functions.invoke(
        "update-profile-count", // Name of the edge function
        {
          body: {
            analysisType: "cover_letter_count", // Specify the analysis type
            user_id: user.id, // Pass the user_id to the Edge Function
            new_count: newCount, // Pass the new count
          },
        }
      );

      if (error) {
        console.error("Error invoking edge function:", error);
        return;
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
      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}
