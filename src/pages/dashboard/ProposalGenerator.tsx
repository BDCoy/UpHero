import { useState } from "react";
import { Button } from "@components/Button";
import { RefreshCw } from "lucide-react";
import { toast } from "@lib/store";
import { useProposalStore } from "@lib/store/proposal";
import { generateProposal } from "@lib/openai/proposal";
import { ProposalForm } from "@components/proposal/ProposalForm";
import { ProposalPreview } from "@components/proposal/ProposalPreview";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthProvider";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { checkSubscriptionStatus } from "@/lib/auth/authUtils";

export function ProposalGenerator() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user } = useAuth();
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
        .from("profiles")
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
        .from("profiles")
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
                  Fill in the form and click "Generate Proposal" to get started
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
