import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuestionnaireStore = create(
  persist(
    (set) => ({
      answers: {},

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),

      resetAnswers: () => set({ answers: {} }),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "questionnaire-store", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrating questionnaire store...");
        state?.setHydrated();
      },
    }
  )
);

export default useQuestionnaireStore;
