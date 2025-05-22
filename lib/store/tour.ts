import { createClient } from "@/utils/supabase/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const supabase = createClient();

interface TourStep {
  target: string;
  title: string;
  content: string;
}

interface TourState {
  isActive: boolean;
  currentStep: number;
  hasCompletedTour: boolean;
  steps: TourStep[];
  startTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTour: () => Promise<void>;
  completeTour: () => Promise<void>;
}

const tourSteps: TourStep[] = [
  {
    target: "dashboard-link",
    title: "Dashboard Overview",
    content:
      "Welcome to your dashboard! Here you can view your activity summary and key metrics at a glance.",
  },
  {
    target: "profile-analysis-link",
    title: "Profile Analysis",
    content:
      "Get AI-powered insights on your Upwork profile. Improve your visibility and attract more clients.",
  },
  {
    target: "cover-letter-link",
    title: "Cover Letter Generator",
    content:
      "Create professional, tailored cover letters that help you stand out from the competition.",
  },
  {
    target: "ats-optimizer-link",
    title: "ATS Optimizer",
    content:
      "Optimize your resume for Applicant Tracking Systems to increase your chances of getting noticed.",
  },
  {
    target: "proposal-generator-link",
    title: "Proposal Generator",
    content:
      "Generate winning proposals quickly with our AI-powered tool. Save time and win more projects.",
  },
];

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      isActive: false,
      currentStep: 0,
      hasCompletedTour: false,
      steps: tourSteps,
      startTour: () => set({ isActive: true, currentStep: 0 }),
      nextStep: () => {
        const { currentStep, steps } = get();
        if (currentStep < steps.length - 1) {
          set({ currentStep: currentStep + 1 });
        } else {
          get().completeTour();
        }
      },
      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },
      skipTour: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("users")
            .update({ has_completed_tour: true })
            .eq("id", user.id);
        }
        set({ isActive: false, hasCompletedTour: true });
      },
      completeTour: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("users")
            .update({ has_completed_tour: true })
            .eq("id", user.id);
        }
        set({ isActive: false, hasCompletedTour: true });
      },
    }),
    {
      name: "tour-storage",
      getStorage: () => localStorage,  // explicitly use localStorage
    }
  )
);
