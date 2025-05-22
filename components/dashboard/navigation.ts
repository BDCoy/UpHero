import {
  BarChart,
  FileSearch,
  FileText,
  CheckSquare,
  MessageSquare,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: BarChart,
  },
  {
    name: "Profile Analysis",
    path: "/dashboard/profile-analysis",
    icon: FileSearch,
  },
  {
    name: "Cover Letter",
    path: "/dashboard/cover-letter",
    icon: FileText,
  },
  {
    name: "ATS Optimizer",
    path: "/dashboard/ats-optimizer",
    icon: CheckSquare,
  },
  {
    name: "Proposal Generator",
    path: "/dashboard/proposal-generator",
    icon: MessageSquare,
  },
  {
    name: "Client Messages",
    path: "/dashboard/client-messages",
    icon: MessageCircle,
  },
  {
    name: "Personalized Training",
    path: "/dashboard/personalized-training",
    icon: BookOpen,
  },
] as const;
