"use client";

import toast from "react-hot-toast";
import {
  Bookmark,
  CalendarCheck,
  CalendarPlus,
} from "lucide-react";

import { useWorkout } from "@/context/WorkoutContext";
import type { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    toggleSaved,
    isInPlan,
    isSaved,
  } = useWorkout();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    if (result === "already-added") {
      toast.error("Already in your plan");
      return;
    }

    if (result === "plan-full") {
      toast.error(
        "Today's plan is full — maximum 5 workouts"
      );
      return;
    }

    toast.success("Added to today's plan");
  };

  const handleToggleSaved = () => {
    toggleSaved(workout);

    if (saved) {
      toast.success("Removed from saved");
    } else {
      toast.success("Saved for later");
    }
  };

  return (
    <div className="mt-7 flex flex-col gap-3 md:flex-row">
      {/* Add to Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        aria-disabled={inPlan}
        className={`
          inline-flex
          h-[44px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#CCFF00]
          px-5
          text-[14px]
          font-bold
          text-[#090B0E]
          transition
          md:w-auto
          ${
            inPlan
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:brightness-90"
          }
        `}
      >
        {inPlan ? (
          <CalendarCheck
            size={17}
            strokeWidth={2}
          />
        ) : (
          <CalendarPlus
            size={17}
            strokeWidth={2}
          />
        )}

        {inPlan
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

      {/* Save for Later */}
      <button
        type="button"
        onClick={handleToggleSaved}
        className={`
          inline-flex
          h-[44px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          px-5
          text-[14px]
          font-medium
          transition
          md:w-auto
          ${
            saved
              ? "border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00]"
              : "border-[#5A5E67] bg-transparent text-[#F4F4F5] hover:bg-white/[0.04]"
          }
        `}
      >
        <Bookmark
          size={16}
          strokeWidth={2}
          fill={saved ? "currentColor" : "none"}
        />

        {saved
          ? "Saved for later"
          : "Save for later"}
      </button>
    </div>
  );
}