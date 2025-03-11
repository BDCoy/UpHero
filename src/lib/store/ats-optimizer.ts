import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ATSAnalysis } from '@components/ats-optimizer/types';

interface ATSOptimizerState {
  cvContent: string;
  jobDescription: string;
  analysis: ATSAnalysis | null;
  setCvContent: (content: string) => void;
  setJobDescription: (description: string) => void;
  setAnalysis: (analysis: ATSAnalysis | null) => void;
  reset: () => void;
}

const initialState = {
  cvContent: '',
  jobDescription: '',
  analysis: null,
};

export const useATSOptimizerStore = create<ATSOptimizerState>()(
  persist(
    (set) => ({
      ...initialState,
      setCvContent: (content) => set({ cvContent: content }),
      setJobDescription: (description) => set({ jobDescription: description }),
      setAnalysis: (analysis) => set({ analysis }),
      reset: () => set(initialState),
    }),
    {
      name: 'ats-optimizer-storage',
    }
  )
);