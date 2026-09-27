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

  /* =================================
     FILTER WORKOUTS
  ================================= */

  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return workouts;
    }

    return workouts.filter((workout) => {
      const matchesName = workout.name
        .toLowerCase()
        .includes(query);

      const matchesMuscleGroup =
        workout.muscleGroups.some((group) =>
          group.toLowerCase().includes(query)
        );

      return matchesName || matchesMuscleGroup;
    });
  }, [workouts, searchQuery]);

  return (
    <>
      {/* =================================
          LIBRARY HEADER + SEARCH
      ================================= */}

      <div
        className="
          mb-7
          flex
          w-full
          flex-col
          gap-5

          md:flex-row
          md:items-center
          md:justify-between
          md:gap-8
        "
      >
        {/* Library title */}
        <div className="shrink-0">
          <h2
            className="
              font-display
              text-[28px]
              font-medium
              uppercase
              leading-none
              tracking-[-0.01em]
              text-[#F4F4F5]

              sm:text-[30px]
            "
          >
            THE LIBRARY
          </h2>

          <p
            className="
              mt-3
              text-[12px]
              leading-[1.5]
              text-[#777B84]

              sm:text-[13px]
            "
          >
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Search */}
        <div
          className="
            flex
            h-[46px]
            w-full
            min-w-0
            items-center
            rounded-[12px]
            border
            border-[#292D35]
            bg-[#171A20]
            px-4
            transition-colors
            focus-within:border-[#D5D5D5]

            md:w-[380px]
            md:shrink-0

            lg:w-[420px]
          "
        >
          <Search
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            className="
              shrink-0
              text-[#8E929B]
            "
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
              text-[13px]
              text-[#F4F4F5]
              outline-none
              placeholder:text-[#6F737C]

              sm:text-[14px]
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
              <X
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>

      {/* =================================
          WORKOUT GRID
      ================================= */}

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
        /* =================================
           NO SEARCH RESULTS
        ================================= */

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
            <Search
              size={25}
              strokeWidth={1.6}
              aria-hidden="true"
              className="
                mx-auto
                text-[#626771]
              "
            />

            <h3
              className="
                font-display
                mt-4
                text-[20px]
                font-semibold
                uppercase
                text-[#F4F4F5]
              "
            >
              No workouts found
            </h3>

            <p
              className="
                mt-2
                text-[13px]
                leading-relaxed
                text-[#8E929B]
              "
            >
              Try searching by another workout name or muscle group.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="
                mt-5
                rounded-full
                border
                border-[#343943]
                px-5
                py-2.5
                text-[12px]
                font-medium
                text-[#E2E3E5]
                transition-colors
                hover:border-[#555B66]
                hover:bg-[#20242B]
              "
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </>
  );
}