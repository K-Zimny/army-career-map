import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSimulationStore = create(
  persist(
    (set, get) => ({
      path: [],
      currentMilestone: null,
      choices: [],
      setPath: (newMilestone) => {
        if (!newMilestone || typeof newMilestone !== "object") {
          console.error("Invalid milestone:", newMilestone);
          return;
        }

        set((state) => {
          const currentPath = Array.isArray(state.path) ? state.path : [];
          let updatedPath = [...currentPath, newMilestone];
          console.log("Updated path in store:", updatedPath);
          return { path: updatedPath };
        });
      },
      setCurrentMilestone: (milestone) => {
        console.log("Setting current milestone:", milestone);
        set({ currentMilestone: milestone });
      },
      addChoice: (choice) => {
        set((state) => ({
          choices: [...state.choices, choice],
        }));
      },
      resetSession: () => {
        console.log("Resetting session...");
        set({
          path: [],
          currentMilestone: null,
          choices: [],
        });
      },
    }),
    {
      name: "simulation-store", // Key for localStorage
      onRehydrateStorage: () => () => {
        console.log("Rehydrating state..."); // Debugging log

        persist.clearStorage("simulation-store"); // Clear storage on rehydration

        set({
          path: [],
          currentMilestone: null,
          choices: [],
        });

        console.log("Session reset on rehydration.");
      },
    }
  )
);

export default useSimulationStore;
