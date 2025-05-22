import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ClientQuestion {
  id: string;
  text: string;
}

export interface ProposalResponse {
  coverLetter: string;
  questionResponses: {
    question: string;
    answer: string;
  }[];
  suggestedRate: {
    min: number;
    max: number;
    rationale: string;
  };
  keyPoints: string[];
  estimatedDuration: {
    value: number;
    unit: string;
    rationale: string;
  };
}

interface ProposalState {
  fullName: string;
  profileDescription: string;
  jobDescription: string;
  tone: string;
  clientQuestions: ClientQuestion[];
  generatedProposal: ProposalResponse | null;
  setFullName: (name: string) => void;
  setProfileDescription: (description: string) => void;
  setJobDescription: (description: string) => void;
  setTone: (tone: string) => void;
  addQuestion: (question: string) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, text: string) => void;
  setGeneratedProposal: (proposal: ProposalResponse | null) => void;
  reset: () => void;
}

const initialState = {
  fullName: '',
  profileDescription: '',
  jobDescription: '',
  tone: 'professional',
  clientQuestions: [],
  generatedProposal: null,
};

export const useProposalStore = create<ProposalState>()(
  persist(
    (set) => ({
      ...initialState,
      setFullName: (name) => set({ fullName: name }),
      setProfileDescription: (description) => set({ profileDescription: description }),
      setJobDescription: (description) => set({ jobDescription: description }),
      setTone: (tone) => set({ tone }),
      addQuestion: (question) =>
        set((state) => ({
          clientQuestions: [
            ...state.clientQuestions,
            { id: Math.random().toString(36).substr(2, 9), text: question }
          ],
        })),
      removeQuestion: (id) =>
        set((state) => ({
          clientQuestions: state.clientQuestions.filter((q) => q.id !== id),
        })),
      updateQuestion: (id, text) =>
        set((state) => ({
          clientQuestions: state.clientQuestions.map((q) =>
            q.id === id ? { ...q, text } : q
          ),
        })),
      setGeneratedProposal: (proposal) => set({ generatedProposal: proposal }),
      reset: () => set(initialState),
    }),
    {
      name: 'proposal-storage',
    }
  )
);