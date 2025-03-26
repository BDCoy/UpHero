import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthProvider";
import { supabase } from "../lib/supabase";
import { TrendingUp, Users, FileText, Star, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { useTrainingStore } from "@/lib/store/training";
import { getCurrentSubscription } from "@/lib/revolut";
import { SUBSCRIPTION_PLANS } from "@/lib/revolut/constants";

export function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const { moduleProgress } = useTrainingStore();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          console.error("Error fetching profile", error);
        } else {
          setProfile(data);
        }
      }
      setLoadingProfile(false);
    };

    const fetchSubscription = async () => {
      if (user) {
        const data = await getCurrentSubscription(user.id);
        setSubscription(data);
      }
    };

    fetchProfile();
    fetchSubscription();
  }, [user]);

  // Get the current plan's limits
  const currentPlan = SUBSCRIPTION_PLANS.find(
    (plan) => plan.id === subscription?.selected_plan
  ) || SUBSCRIPTION_PLANS[0]; // Default to free plan if no subscription

  // Calculate completed modules percentage
  const completedModules = moduleProgress.filter(Boolean).length;
  const totalModules = moduleProgress.length;
  const completionPercentage = Math.round((completedModules / totalModules) * 100);

  const stats = [
    {
      label: "Profile Analyses",
      value: profile?.profile_analysis_count || 0,
      limit: currentPlan.profile_analysis_limit || 0,
      icon: Users,
    },
    {
      label: "Cover Letters",
      value: profile?.cover_letter_count || 0,
      limit: currentPlan.cover_letter_limit || 0,
      icon: FileText,
    },
    {
      label: "ATS Optimizations",
      value: profile?.ats_optimizer_count || 0,
      limit: currentPlan.ats_optimizer_limit || 0,
      icon: Star,
    },
    {
      label: "Proposals Generated",
      value: profile?.proposal_generator_count || 0,
      limit: currentPlan.proposal_generator_limit || 0,
      icon: TrendingUp,
    },
    {
      label: "Client Messages",
      value: profile?.client_messages_count || 0,
      limit: currentPlan.client_messages_limit || 0,
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
            Welcome back, {profile?.full_name || user?.email}
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
              <h3 className="text-lg font-semibold text-upwork-gray">Training Progress</h3>
              <p className="text-sm text-upwork-gray-light">
                Complete all modules to master Upwork success
              </p>
            </div>
          </div>
          <Link to="/dashboard/personalized-training">
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
