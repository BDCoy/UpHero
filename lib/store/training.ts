import create from "zustand";
import { persist } from "zustand/middleware";

interface TrainingStore {
  moduleProgress: boolean[];
  completed: boolean;
  setModuleProgress: (index: number, completed: boolean) => void;
  setCompleted: (completed: boolean) => void;
}

// Initial state (not including methods here)
const initialState = {
  moduleProgress: new Array(10).fill(false), // Assuming 10 modules for simplicity
  completed: false,
};

export const useTrainingStore = create<TrainingStore>()(
  persist(
    (set) => ({
      ...initialState, // Spread the initialState into the store
      setModuleProgress: (index, completed) =>
        set((state) => {
          // Create a new array to maintain immutability
          const newModuleProgress = [...state.moduleProgress];
          newModuleProgress[index] = completed;

          // Check if all modules are completed
          const allCompleted = newModuleProgress.every((progress) => progress);

          // Return the updated state
          return {
            moduleProgress: newModuleProgress,
            completed: allCompleted,
          };
        }),
      setCompleted: (completed) => set({ completed }),
    }),
    {
      name: "training-progress", // The name of the storage key
      getStorage: () => localStorage, // Use localStorage for persistence, can change to sessionStorage
    }
  )
);
