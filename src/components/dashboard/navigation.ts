import { BarChart, FileSearch, FileText, CheckSquare, FileSpreadsheet, MessageSquare } from 'lucide-react';

export const sidebarLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: BarChart
  },
  {
    name: 'Profile Analysis',
    path: '/dashboard/profile-analysis',
    icon: FileSearch
  },
  {
    name: 'Cover Letter',
    path: '/dashboard/cover-letter',
    icon: FileText
  },
  {
    name: 'ATS Optimizer',
    path: '/dashboard/ats-optimizer',
    icon: CheckSquare
  },
  {
    name: 'CV Builder',
    path: '/dashboard/cv-builder',
    icon: FileSpreadsheet
  },
  {
    name: 'Proposal Generator',
    path: '/dashboard/proposal-generator',
    icon: MessageSquare
  }
] as const;