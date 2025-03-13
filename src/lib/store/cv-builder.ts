import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CVData, CVStyles } from '@components/cv-builder/types';

interface CVBuilderState {
  cvData: CVData;
  styles: CVStyles;
  setCVData: (data: Partial<CVData>) => void;
  setStyles: (styles: Partial<CVStyles>) => void;
  reset: () => void;
}

const initialCVData: CVData = {
  fullName: '',
  title: '',
  contact: {
    email: '',
    phone: '',
    location: '',
    website: ''
  },
  socialLinks: [],
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  achievements: [],
  languages: []
};

const initialStyles: CVStyles = {
  fontFamily: 'Inter',
  fontSize: {
    headline: '24px',
    section: '18px',
    body: '14px'
  },
  colors: {
    primary: '#14a800',
    text: '#001e00',
    background: '#ffffff'
  },
  spacing: {
    section: '24px',
    item: '16px'
  }
};

export const useCVBuilderStore = create<CVBuilderState>()(
  persist(
    (set) => ({
      cvData: initialCVData,
      styles: initialStyles,
      setCVData: (data) =>
        set((state) => ({
          cvData: { ...state.cvData, ...data }
        })),
      setStyles: (styles) =>
        set((state) => ({
          styles: { ...state.styles, ...styles }
        })),
      reset: () => set({ cvData: initialCVData, styles: initialStyles })
    }),
    {
      name: 'cv-builder-storage'
    }
  )
);