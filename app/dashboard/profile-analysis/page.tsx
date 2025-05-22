"use client";

import { useCallback, useEffect, useState } from "react";
import { useProfileAnalysisStore } from "@lib/store/profile-analysis";
import { analyzeUpworkProfile } from "@/lib/openai/profile-analysis";
import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { PreviewSection } from "@/components/profile-analysis/PreviewSection";
import { ManualAnalysisForm } from "@/components/profile-analysis/ManualAnalysisForm";
import { UrlAnalysisForm } from "@/components/profile-analysis/UrlAnalysisForm";
import { TabNavigation } from "@/components/profile-analysis/TabNavigation";
import { AnalysisHeader } from "@/components/profile-analysis/AnalysisHeader";
import { createClient } from "@/utils/supabase/client";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { User } from "@supabase/auth-js";
import { toast } from "@/lib/store/toast";

interface FreelancerData {
  Name: string;
  Headline: string;
  Body: string;
  ProfileImageSrc: string;
  HourlyRate: string;
  TotalJobs: number;
  Country: string;
  TotalHours: number;
  ProfileURL: string;
}

export default function ProfileAnalysis() {
  const supabase = createClient();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"url" | "manual">("url");
  const [profileUrl, setProfileUrl] = useState("");
  const [profileData, setProfileData] = useState<FreelancerData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {
    fullName,
    currentHeadline,
    currentDescription,
    analysis,
    setCurrentHeadline,
    setCurrentDescription,
    setAnalysis,
    reset,
  } = useProfileAnalysisStore();

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

  const handleUrlAnalysis = async () => {
    if (!profileUrl.trim()) {
      toast.error("Please enter your Upwork profile URL");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "profile_analysis_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsAnalyzing(true);
      const { data, error } = await supabase.functions.invoke(
        "profile-analysis",
        { body: { url: profileUrl } }
      );
      if (error) throw error;
      const tmp = JSON.parse(data);
      setProfileData(tmp);
      setShowResults(false);
    } catch (error) {
      console.error("Error analyzing profile:", error);
      toast.error("Failed to analyze profile URL");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualAnalysis = async () => {
    if (!currentHeadline.trim() || !currentDescription.trim()) {
      toast.error("Please provide both headline and description");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }

    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "profile_analysis_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeUpworkProfile(
        currentHeadline,
        currentDescription,
        fullName
      );
      setAnalysis(result);

      // Update usage count for manual analysis
      const { data, error: fetchError } = await supabase
        .from("users")
        .select("profile_analysis_count")
        .eq("id", user?.id)
        .single();
      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.profile_analysis_count || 0) + 1;
      const { error } = await supabase.functions.invoke(
        "update-profile-count",
        {
          body: {
            analysisType: "profile_analysis_count",
            user_id: user.id,
            new_count: newCount,
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

  const handleViewResults = async () => {
    if (!profileData) return;
    try {
      setIsAnalyzing(true);
      const result = await analyzeUpworkProfile(
        profileData.Headline,
        profileData.Body,
        profileData.Name
      );
      setAnalysis(result);
      setShowResults(true);

      // Update usage count for URL analysis
      if (user) {
        const { data, error: fetchError } = await supabase
          .from("users")
          .select("profile_analysis_count")
          .eq("id", user.id)
          .single();
        if (fetchError) {
          console.error("Error fetching current count:", fetchError);
          return;
        }
        const newCount = (data?.profile_analysis_count || 0) + 1;
        await supabase.functions.invoke("update-profile-count", {
          body: {
            analysisType: "profile_analysis_count",
            user_id: user.id,
            new_count: newCount,
          },
        });
      }
    } catch (error) {
      console.error("Error analyzing profile data:", error);
      toast.error("Failed to analyze profile data");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnalysisHeader analysis={analysis} reset={reset} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {activeTab === "url" ? (
            <UrlAnalysisForm
              profileUrl={profileUrl}
              setProfileUrl={setProfileUrl}
              isAnalyzing={isAnalyzing}
              handleUrlAnalysis={handleUrlAnalysis}
              profileData={profileData}
              showResults={showResults}
              handleViewResults={handleViewResults}
            />
          ) : (
            <ManualAnalysisForm
              currentHeadline={currentHeadline}
              setCurrentHeadline={setCurrentHeadline}
              currentDescription={currentDescription}
              setCurrentDescription={setCurrentDescription}
              isAnalyzing={isAnalyzing}
              handleManualAnalysis={handleManualAnalysis}
            />
          )}
        </div>

        <div className="h-[calc(100vh-12rem)] sticky top-24">
          {analysis && <PreviewSection analysis={analysis} />}
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}
