import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProfileAnalysis {
  score: number;
  optimizedHeadline: string;
  optimizedDescription: string;
  recommendations: string[];
  keywordSuggestions: string[];
  skillHighlights: string[];
}

interface ProfileAnalysisState {
  fullName: string;
  currentHeadline: string;
  currentDescription: string;
  analysis: ProfileAnalysis | null;
  setFullName: (name: string) => void;
  setCurrentHeadline: (headline: string) => void;
  setCurrentDescription: (description: string) => void;
  setAnalysis: (analysis: ProfileAnalysis | null) => void;
  reset: () => void;
}

const initialState = {
  fullName: '',
  currentHeadline: '',
  currentDescription: '',
  analysis: null,
};

export const useProfileAnalysisStore = create<ProfileAnalysisState>()(
  persist(
    (set) => ({
      ...initialState,
      setFullName: (name) => set({ fullName: name }),
      setCurrentHeadline: (headline) => set({ currentHeadline: headline }),
      setCurrentDescription: (description) => set({ currentDescription: description }),
      setAnalysis: (analysis) => set({ analysis }),
      reset: () => set(initialState),
    }),
    {
      name: 'profile-analysis-storage',
    }
  )
);