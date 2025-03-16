import { useAuth } from "../lib/AuthProvider";
import {
  TrendingUp,
  Users,
  FileText,
  Star,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();

  console.log(user);

  const stats = [
    {
      label: "Profile Views",
      value: "245",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      label: "Proposal Success Rate",
      value: "68%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Active Proposals",
      value: "12",
      change: "-2",
      trend: "down",
      icon: FileText,
    },
    {
      label: "Client Rating",
      value: "4.9",
      change: "+0.2",
      trend: "up",
      icon: Star,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "proposal",
      title: "React Native Developer",
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

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.email}
          </h2>
        </div>
      </div>

      {/* Stats */}
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
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  <ArrowUpRight
                    className={`h-4 w-4 ${
                      stat.trend === "up" ? "rotate-0" : "rotate-90"
                    }`}
                  />
                </p>
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
                  <p className="ml-2 text-sm text-gray-500">{activity.time}</p>
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
    </div>
  );
}
