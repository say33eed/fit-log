"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "@/types/workout";

const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";
const MAX_PLAN_SIZE = 5;

type AddToPlanResult =
  | "added"
  | "already-added"
  | "plan-full";

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => AddToPlanResult;
  removeFromPlan: (id: number) => void;
  toggleSaved: (workout: Workout) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const WorkoutContext =
  createContext<WorkoutContextType | undefined>(undefined);

interface WorkoutProviderProps {
  children: ReactNode;
}

function parseStoredWorkouts(
  value: string | null,
  limit?: number
): Workout[] {
  if (!value) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    const workouts = parsedValue as Workout[];

    if (typeof limit === "number") {
      return workouts.slice(0, limit);
    }

    return workouts;
  } catch (error) {
    console.error("Failed to parse stored workouts:", error);
    return [];
  }
}

export function WorkoutProvider({
  children,
}: WorkoutProviderProps) {
  /*
   * IMPORTANT:
   *
   * The initial state must be identical on the server
   * and during the client's first render.
   *
   * Reading localStorage directly inside useState would
   * cause a hydration mismatch:
   *
   * Server -> []
   * Client -> stored workouts
   */
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * Load localStorage after hydration.
   *
   * The setTimeout moves the state updates into an
   * asynchronous callback instead of calling setState
   * synchronously inside the effect body.
   *
   * This keeps SSR hydration safe and avoids the
   * react-hooks/set-state-in-effect lint error.
   */
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedPlan = parseStoredWorkouts(
          window.localStorage.getItem(PLAN_STORAGE_KEY),
          MAX_PLAN_SIZE
        );

        const storedSaved = parseStoredWorkouts(
          window.localStorage.getItem(SAVED_STORAGE_KEY)
        );

        setPlan(storedPlan);
        setSaved(storedSaved);
      } catch (error) {
        console.error(
          "Failed to load FitLog data:",
          error
        );
      } finally {
        setIsLoaded(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  /*
   * Persist Today's Plan only after the initial
   * localStorage hydration has completed.
   *
   * Without the isLoaded guard, the initial empty
   * state would overwrite the stored workouts.
   */
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        PLAN_STORAGE_KEY,
        JSON.stringify(plan)
      );
    } catch (error) {
      console.error(
        "Failed to save FitLog plan:",
        error
      );
    }
  }, [plan, isLoaded]);

  /*
   * Persist Saved workouts.
   */
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(saved)
      );
    } catch (error) {
      console.error(
        "Failed to save FitLog saved workouts:",
        error
      );
    }
  }, [saved, isLoaded]);

  /*
   * Keep multiple browser tabs synchronized.
   *
   * When localStorage changes in another tab,
   * the browser fires the storage event here.
   */
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea !== window.localStorage
      ) {
        return;
      }

      if (event.key === PLAN_STORAGE_KEY) {
        const updatedPlan = parseStoredWorkouts(
          event.newValue,
          MAX_PLAN_SIZE
        );

        setPlan(updatedPlan);
        return;
      }

      if (event.key === SAVED_STORAGE_KEY) {
        const updatedSaved = parseStoredWorkouts(
          event.newValue
        );

        setSaved(updatedSaved);
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  /*
   * Add workout to Today's Plan.
   *
   * Maximum: 5 workouts.
   */
  const addToPlan = (
    workout: Workout
  ): AddToPlanResult => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      return "already-added";
    }

    if (plan.length >= MAX_PLAN_SIZE) {
      return "plan-full";
    }

    setPlan((currentPlan) => {
      const alreadyExists = currentPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return currentPlan;
      }

      if (currentPlan.length >= MAX_PLAN_SIZE) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });

    return "added";
  };

  /*
   * Remove workout from Today's Plan.
   *
   * Mark as Done can use this function.
   * Because Navbar reads plan.length from this same
   * context, its counter updates automatically.
   */
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );
  };

  /*
   * Add/remove workout from Saved.
   *
   * Saved workouts do not have the five-workout limit.
   */
  const toggleSaved = (workout: Workout) => {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        return currentSaved.filter(
          (item) => item.id !== workout.id
        );
      }

      return [...currentSaved, workout];
    });
  };

  const isInPlan = (id: number) => {
    return plan.some(
      (workout) => workout.id === id
    );
  };

  const isSaved = (id: number) => {
    return saved.some(
      (workout) => workout.id === id
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used within a WorkoutProvider"
    );
  }

  return context;
}