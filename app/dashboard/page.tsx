"use client";
import { useCallback, useEffect, useState } from "react";

import {
  TrendingUp,
  Users,
  FileText,
  Star,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { useTrainingStore } from "@/lib/store/training";

import { getSubscription, getUserDetails } from "@/utils/supabase/queries";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const extractFeatures = (featuresString: string | undefined) => {
  if (!featuresString || typeof featuresString !== "string") {
    return []; // Return empty array if features string is not available or not a string
  }

  // Clean the features string by removing "features:" and extra characters
  const cleanedString = featuresString
    .replace(/^features:\s*\[/, "[") // Remove "features:" prefix
    .replace(/,\s*]$/, "]"); // Remove any trailing commas before closing bracket

  // Try to parse the cleaned string as JSON
  let features = [];
  try {
    features = JSON.parse(cleanedString); // Parse the cleaned string into an array
  } catch (error) {
    console.error("Error parsing features:", error);
    return []; // Return empty array if JSON parsing fails
  }

  return features;
};

export default function Dashboard() {
  const supabase = createClient();
  const { moduleProgress } = useTrainingStore();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<any>(null);

  const getData = useCallback(async () => {
    try {
      const [userData, subscriptionData] = await Promise.all([
        getUserDetails(supabase),
        getSubscription(supabase),
      ]);
      setUser(userData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingProfile(false);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

  const metadata = subscription?.prices?.products?.metadata;

  const completedModules = moduleProgress.filter(Boolean).length;
  const totalModules = moduleProgress.length;
  const completionPercentage = totalModules
    ? Math.round((completedModules / totalModules) * 100)
    : 0;

  const stats = [
    {
      label: "Profile Analyses",
      value: user?.profile_analysis_count ?? 0,
      limit: metadata?.profile_analysis_limit ?? 0,
      icon: Users,
    },
    {
      label: "Cover Letters",
      value: user?.cover_letter_count ?? 0,
      limit: metadata?.cover_letter_limit ?? 0,
      icon: FileText,
    },
    {
      label: "ATS Optimizations",
      value: user?.ats_optimizer_count ?? 0,
      limit: metadata?.ats_optimizer_limit ?? 0,
      icon: Star,
    },
    {
      label: "Proposals Generated",
      value: user?.proposal_generator_count ?? 0,
      limit: metadata?.proposal_generator_limit ?? 0,
      icon: TrendingUp,
    },
    {
      label: "Client Messages",
      value: user?.client_messages_count ?? 0,
      limit: metadata?.client_messages_limit ?? 0,
      icon: MessageSquare,
    },
  ];

  if (loadingProfile) {
    return (
      <div className="space-y-6 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <ul className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="h-16 bg-gray-200 rounded"></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.full_name || user?.email}
          </h2>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const percentage = (stat.value / stat.limit) * 100;
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className="absolute rounded-md bg-upwork-green p-3">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </dt>
              <dd className="ml-16 flex flex-col">
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="ml-2 text-sm text-gray-500">/ {stat.limit}</p>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                  <div
                    className="h-full rounded-full bg-upwork-green transition-all duration-300"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Training Progress Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-upwork-background rounded-lg">
              <BookOpen className="h-6 w-6 text-upwork-green" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-upwork-gray">
                Training Progress
              </h3>
              <p className="text-sm text-upwork-gray-light">
                Complete all modules to master Upwork success
              </p>
            </div>
          </div>
          <Link href="/dashboard/personalized-training">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Continue Training
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-upwork-gray">
              {completedModules} of {totalModules} modules completed
            </span>
            <span className="text-sm font-medium text-upwork-gray">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-upwork-background rounded-full h-2.5">
            <div
              className="bg-upwork-green h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
