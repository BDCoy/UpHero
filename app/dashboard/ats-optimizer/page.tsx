"use client";

import { useState, useRef, useCallback, useEffect } from "react";

import { CVUploader } from "@/components/cover-letter/CVUploader";
import { JobDescriptionForm } from "@/components/ats-optimizer/JobDescriptionForm";
import { ActionButtons } from "@/components/ats-optimizer/ActionButtons";
import { AnalysisResult } from "@/components/ats-optimizer/AnalysisResult";
import { useATSOptimizerStore } from "@lib/store/ats-optimizer";
import { RefreshCw } from "lucide-react";

import { generateATSRecommendations } from "@/lib/openai/ats-optimizer";

import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { toast } from "@/lib/store/toast";
import { Button } from "@/components/ui/Button";

export default function ATSOptimizer() {
  const supabase = createClient();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const {
    cvContent,
    jobDescription,
    analysis: atsAnalysis,
    setCvContent,
    setJobDescription,
    setAnalysis,
    reset,
  } = useATSOptimizerStore();

  const [subscription, setSubscription] = useState<any | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (text: string) => {
    setCvContent(text);
  };

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

  const handleGenerate = async () => {
    if (!cvContent) {
      toast.error("Please upload your CV");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please enter the job description");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }
    // Check subscription status
    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "ats_optimizer_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
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
        .from("users")
        .select("ats_optimizer_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.ats_optimizer_count || 0) + 1;

      const { error } = await supabase.functions.invoke(
        "update-profile-count", // Name of the edge function
        {
          body: {
            analysisType: "ats_optimizer_count", // Specify the analysis type
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
      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}
