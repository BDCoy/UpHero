import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthProvider";
import { supabase } from "../lib/supabase";
import { TrendingUp, Users, FileText, Star } from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

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

    fetchProfile();
  }, [user]);

  const stats = [
    {
      label: "Profile Analyses",
      value: profile ? profile.profile_analysis_count : 0,
      icon: Users,
    },
    {
      label: "Cover Letters",
      value: profile ? profile.cover_letter_count : 0,
      icon: FileText,
    },
    {
      label: "ATS Optimizations",
      value: profile ? profile.ats_optimizer_count : 0,
      icon: Star,
    },
    {
      label: "Proposals Generated",
      value: profile ? profile.proposal_generator_count : 0,
      icon: TrendingUp,
    },
  ];

  if (loadingProfile) {
    return (
      <div className="space-y-6 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
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
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );
}
