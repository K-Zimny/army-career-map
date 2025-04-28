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
    }),
    {
      name: "questionnaire-store", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useQuestionnaireStore;
