import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthProvider";
import { supabase } from "../lib/supabase";
import {
  TrendingUp,
  Users,
  FileText,
  Star,
  // ArrowUpRight,
  Clock,
  // Loader2,
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch profile data when the user is available
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

  // Build stats using profile data; default to 0 if not available
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

  // Sample recent activity data (you can update this to use real data)
  const recentActivity = [
    {
      id: 1,
      type: "proposal",
      title: "Proposal sent for React Native Developer",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "profile",
      title: "Profile viewed by potential client",
      time: "4 hours ago",
      status: "info",
    },
    {
      id: 3,
      type: "contract",
      title: "New contract received",
      time: "1 day ago",
      status: "success",
    },
  ];


  if (loadingProfile) {
    return (
      <div className="space-y-6 p-4">
        <div className="animate-pulse">
          {/* Skeleton Header */}
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          {/* Skeleton grid for stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          {/* Skeleton for Recent Activity */}
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
            Welcome back, {user?.email}
          </h2>
        </div>
      </div>

      {/* Profile Loading State */}
      {loadingProfile ? (
        <div className="text-center text-gray-500">Loading profile...</div>
      ) : (
        <>
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
                    <div className="absolute rounded-md bg-blue-500 p-3">
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
                    {/* If you later add percentage changes/trends, you can display them here */}
                  </dd>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Recent Activity
              </h3>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li
                  key={activity.id}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <p className="ml-2 text-sm text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : activity.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
