"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

interface WorkoutLibraryClientProps {
  workouts: Workout[];
}

export default function WorkoutLibraryClient({
  workouts,
}: WorkoutLibraryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return workouts;
    }

    return workouts.filter((workout) => {
      const matchesName = workout.name
        .toLowerCase()
        .includes(query);

      const matchesTag = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(query)
      );

      return matchesName || matchesTag;
    });
  }, [workouts, searchQuery]);

  return (
    <>
      {/* Search */}
      <div className="mb-7">
        <div
          className="
            flex
            h-[46px]
            w-full
            max-w-[420px]
            items-center
            rounded-[12px]
            border
            border-[#292D35]
            bg-[#171A20]
            px-4
            transition-colors
            focus-within:border-[#CCFF00]/60
          "
        >
          <Search
            size={18}
            strokeWidth={2}
            className="shrink-0 text-[#8E929B]"
            aria-hidden="true"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search by workout or muscle group..."
            aria-label="Search workouts by name or muscle group"
            className="
              h-full
              min-w-0
              flex-1
              bg-transparent
              px-3
              text-[14px]
              text-[#F4F4F5]
              outline-none
              placeholder:text-[#6F737C]
            "
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear workout search"
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[#8E929B]
                transition-colors
                hover:bg-[#252931]
                hover:text-[#F4F4F5]
              "
            >
              <X size={15} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Workout grid */}
      {filteredWorkouts.length > 0 ? (
        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            flex
            min-h-[220px]
            items-center
            justify-center
            rounded-[16px]
            border
            border-[#292D35]
            bg-[#171A20]
            px-6
            text-center
          "
        >
          <div>
            <h3
              className="
                font-display
                text-[20px]
                font-semibold
                uppercase
                text-[#F4F4F5]
              "
            >
              No workouts found
            </h3>

            <p className="mt-2 text-[13px] text-[#8E929B]">
              Try searching by another workout name or muscle group.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="
                mt-5
                text-[13px]
                font-semibold
                text-[#CCFF00]
                transition-opacity
                hover:opacity-80
              "
            >
              Clear search
            </button>
          </div>
        </div>
      )}
    </>
  );
}