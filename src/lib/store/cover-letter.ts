import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormData, GeneratedLetter } from '@components/cover-letter/types';

interface CoverLetterState {
  cvContent: string;
  formData: FormData;
  generatedLetter: GeneratedLetter | null;
  setCV: (content: string) => void;
  setFormData: (data: FormData) => void;
  setGeneratedLetter: (letter: GeneratedLetter | null) => void;
  reset: () => void;
}

const initialState = {
  cvContent: '',
  formData: {
    jobDescription: '',
    companyName: '',
    hiringManager: '',
    tone: 'neutral',
  },
  generatedLetter: null,
};

export const useCoverLetterStore = create<CoverLetterState>()(
  persist(
    (set) => ({
      ...initialState,
      setCV: (content) => set({ cvContent: content }),
      setFormData: (data) => set({ formData: data }),
      setGeneratedLetter: (letter) => set({ generatedLetter: letter }),
      reset: () => set(initialState),
    }),
    {
      name: 'cover-letter-storage',
    }
  )
);