import { useState } from "react";
import { Button } from "@components/Button";
import { toast } from "@lib/store";
import { useProfileAnalysisStore } from "@lib/store/profile-analysis";
import { RefreshCw } from "lucide-react";
import { ProfileForm } from "@components/profile-analysis/ProfileForm";
import { EmptyState } from "@components/profile-analysis/EmptyState";
import { OptimizedContent } from "@components/profile-analysis/OptimizedContent";
import { Recommendations } from "@components/profile-analysis/Recommendations";
import { KeywordsList } from "@components/profile-analysis/KeywordsList";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthProvider";
import { analyzeUpworkProfile } from "@/lib/openai/profile-analysis";
import { checkSubscriptionStatus } from "@/lib/auth/authUtils";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";

export function ProfileAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user } = useAuth();
  const {
    fullName,
    currentHeadline,
    currentDescription,
    analysis,
    setFullName,
    setCurrentHeadline,
    setCurrentDescription,
    setAnalysis,
    reset,
  } = useProfileAnalysisStore();

  const handleAnalyze = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!currentHeadline.trim() || !currentDescription.trim()) {
      toast.error("Please provide both headline and description");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }

    // Check subscription status
    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      "profile_analysis_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsAnalyzing(true);

      // Perform the profile analysis
      const result = await analyzeUpworkProfile(
        currentHeadline,
        currentDescription,
        fullName
      );
      setAnalysis(result);

      toast.success("Profile analysis completed successfully!");

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("profile_analysis_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.profile_analysis_count || 0) + 1;
      // Call the Supabase Edge Function to update the profile count

      const { error } = await supabase.functions.invoke(
        "update-profile-count", // Name of the edge function
        {
          body: {
            analysisType: "profile_analysis_count", // Specify the analysis type
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
      console.error("Analysis error:", error);
      toast.error("Failed to analyze profile. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">
            Profile Analysis
          </h1>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Optimize your Upwork profile with AI-powered recommendations
          </p>
        </div>
        {analysis && (
          <Button
            variant="outline"
            onClick={reset}
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
        <div>
          <ProfileForm
            fullName={fullName}
            currentHeadline={currentHeadline}
            currentDescription={currentDescription}
            isAnalyzing={isAnalyzing}
            onFullNameChange={setFullName}
            onHeadlineChange={setCurrentHeadline}
            onDescriptionChange={setCurrentDescription}
            onAnalyze={handleAnalyze}
          />
        </div>

        {/* Preview Section - Fixed height and scrollable */}
        <div className="h-[calc(100vh-12rem)] sticky top-24">
          {analysis ? (
            <div className="h-full overflow-y-auto space-y-6">
              <OptimizedContent analysis={analysis} />
              <Recommendations recommendations={analysis.recommendations} />
              <KeywordsList
                title="Keyword Suggestions"
                items={analysis.keywordSuggestions}
              />
              <KeywordsList
                title="Skills to Highlight"
                items={analysis.skillHighlights}
                variant="highlight"
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 h-full">
              <EmptyState />
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
