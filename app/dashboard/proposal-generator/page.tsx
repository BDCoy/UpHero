"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useProposalStore } from "@lib/store/proposal";
import { generateProposal } from "@lib/openai/proposal";
import { ProposalForm } from "@/components/proposal/ProposalForm";
import { ProposalPreview } from "@/components/proposal/ProposalPreview";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { User } from "@supabase/supabase-js";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/lib/store/toast";
import { Button } from "@/components/ui/Button";

export default function ProposalGenerator() {
  const supabase = createClient();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
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
    reset,
  } = useProposalStore();
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

  const handleGenerate = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!profileDescription.trim()) {
      toast.error("Please provide your profile description");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please provide the job description");
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
      "proposal_generator_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      const result = await generateProposal(
        fullName,
        profileDescription,
        jobDescription,
        clientQuestions.map((q) => q.text),
        tone
      );
      setGeneratedProposal(result);
      toast.success("Proposal generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("proposal_generator_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.proposal_generator_count || 0) + 1;

      const { error } = await supabase.functions.invoke(
        "update-profile-count", // Name of the edge function
        {
          body: {
            analysisType: "proposal_generator_count", // Specify the analysis type
            user_id: user.id, // Pass the user_id to the Edge Function
            new_count: newCount, // Pass the new count
          },
        }
      );

      if (error) {
        console.error("Error invoking edge function:", error);
        return;
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({ proposal_generator_count: newCount })
        .eq("id", user?.id);

      if (updateError) {
        console.error("Database update error:", updateError);
      }
    } catch (error) {
      console.error("Error generating proposal:", error);
      toast.error("Failed to generate proposal. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddQuestion = () => {
    addQuestion("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">
            Proposal Generator
          </h1>
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
                <p className="text-lg mb-2">
                  Your generated proposal will appear here
                </p>
                <p className="text-sm">
                  Fill in the form and click &quot;Generate Proposal&ldquo; to
                  get started
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
