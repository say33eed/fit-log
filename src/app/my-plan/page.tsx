"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Suspense,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { useWorkout } from "@/context/WorkoutContext";
import type { Workout } from "@/types/workout";

type Tab = "plan" | "saved";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

function MyPlanContent() {
  const {
    plan,
    saved,
    removeFromPlan,
    toggleSaved,
    isLoaded,
  } = useWorkout();

  const searchParams = useSearchParams();

  /*
   * Navbar controls which tab opens:
   *
   * /my-plan?tab=plan
   * /my-plan?tab=saved
   *
   * If no tab is supplied, Today's Plan
   * is selected by default.
   */
  const activeTab: Tab =
    searchParams.get("tab") === "saved"
      ? "saved"
      : "plan";

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [sortOpen, setSortOpen] =
    useState(false);

  /*
   * Use the currently selected tab's workouts.
   *
   * Today's Plan -> plan
   * Saved        -> saved
   */
  const activeWorkouts =
    activeTab === "plan" ? plan : saved;

  /*
   * LIVE SUMMARY
   *
   * This now calculates from activeWorkouts,
   * so switching between Today's Plan and Saved
   * immediately updates:
   *
   * - Exercises
   * - Minutes
   * - Calories
   */
  const summary = useMemo(() => {
    return activeWorkouts.reduce(
      (total, workout) => {
        total.minutes += workout.duration;
        total.calories +=
          workout.caloriesBurned;

        return total;
      },
      {
        minutes: 0,
        calories: 0,
      }
    );
  }, [activeWorkouts]);

  /*
   * Sort only the workouts belonging to the
   * currently active tab.
   */
  const sortedWorkouts = useMemo(() => {
    return [...activeWorkouts].sort(
      (a, b) => {
        if (sortBy === "duration") {
          return a.duration - b.duration;
        }

        if (sortBy === "calories") {
          return (
            a.caloriesBurned -
            b.caloriesBurned
          );
        }

        return b.rating - a.rating;
      }
    );
  }, [activeWorkouts, sortBy]);

  const sortLabels: Record<
    SortOption,
    string
  > = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  const handleMarkAsDone = (
    workout: Workout
  ) => {
    removeFromPlan(workout.id);

    toast.success(
      "Workout logged — nice work"
    );
  };

  const handleRemove = (
    workout: Workout
  ) => {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);

      toast.success(
        "Workout removed from your plan"
      );

      return;
    }

    toggleSaved(workout);

    toast.success(
      "Workout removed from saved"
    );
  };

  return (
    <main className="bg-[#0D0F12]">
      <section
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-4
          pb-16
          pt-8
          sm:px-5
          sm:pt-9
          md:px-8
          md:pb-20
          md:pt-10
          lg:px-8
          lg:pb-24
          lg:pt-10
          xl:px-0
        "
      >
        {/* Heading */}
        <div>
          <h1
            className="
              font-display
              text-[34px]
              font-medium
              uppercase
              leading-none
              text-[#F4F4F5]
              md:text-[36px]
            "
          >
            My Plan
          </h1>

          <p className="mt-3 text-[14px] leading-[1.5] text-[#8E929B] md:text-[15px]">
            Cap of five lifts for today.
            Finish them, then load more.
          </p>
        </div>

        {/* Live summary */}
        <div
          className="
            mt-9
            overflow-hidden
            rounded-[16px]
            border
            border-[#252931]
            bg-[#171A20]
            md:grid
            md:grid-cols-3
          "
        >
          {/* Exercises */}
          <div
            className="
              relative
              px-6
              py-5
              md:px-7
              md:py-7
              lg:px-7
            "
          >
            <p className="text-[12px] text-[#8E929B]">
              Exercises
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#CCFF00]">
              {activeWorkouts.length}
            </p>

            <span
              className="
                absolute
                right-0
                top-1/2
                hidden
                h-[50px]
                w-px
                -translate-y-1/2
                bg-[#252931]
                md:block
              "
            />
          </div>

          {/* Minutes */}
          <div
            className="
              relative
              border-t
              border-[#252931]
              px-6
              py-5
              md:border-t-0
              md:px-7
              md:py-7
              lg:px-7
            "
          >
            <p className="text-[12px] text-[#8E929B]">
              Minutes
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#F4F4F5]">
              {summary.minutes}
            </p>

            <span
              className="
                absolute
                right-0
                top-1/2
                hidden
                h-[50px]
                w-px
                -translate-y-1/2
                bg-[#252931]
                md:block
              "
            />
          </div>

          {/* Calories */}
          <div
            className="
              border-t
              border-[#252931]
              px-6
              py-5
              md:border-t-0
              md:px-7
              md:py-7
              lg:px-7
            "
          >
            <p className="text-[12px] text-[#8E929B]">
              Calories
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#F4F4F5]">
              {summary.calories}
            </p>
          </div>
        </div>

        {/* Tabs + sorting */}
        <div
          className="
            mt-7
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-start
            md:justify-between
            lg:items-center
          "
        >
          {/* Tabs */}
          <div
            className="
              inline-flex
              h-[48px]
              w-fit
              items-center
              rounded-[15px]
              border
              border-[#252931]
              bg-[#171A20]
              p-[3px]
            "
          >
            <Link
              href="/my-plan?tab=plan"
              className={`
                flex
                h-[40px]
                min-w-[124px]
                items-center
                justify-center
                whitespace-nowrap
                rounded-[11px]
                border
                px-4
                text-[13px]
                transition-colors
                ${
                  activeTab === "plan"
                    ? "border-[#30343D] bg-[#242832] font-semibold text-[#F4F4F5]"
                    : "border-transparent bg-transparent text-[#858A94] hover:text-[#F4F4F5]"
                }
              `}
            >
              Today&apos;s Plan
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className={`
                flex
                h-[40px]
                min-w-[88px]
                items-center
                justify-center
                whitespace-nowrap
                rounded-[11px]
                border
                px-4
                text-[13px]
                transition-colors
                ${
                  activeTab === "saved"
                    ? "border-[#30343D] bg-[#242832] font-semibold text-[#F4F4F5]"
                    : "border-transparent bg-transparent text-[#858A94] hover:text-[#F4F4F5]"
                }
              `}
            >
              Saved
            </Link>
          </div>

          {/* Sort */}
          <div
            className="
              flex
              w-full
              flex-col
              gap-2
              md:w-auto
              md:flex-row
              md:items-center
              md:gap-3
            "
          >
            <span className="text-[14px] text-[#A3A6AD] md:text-[12px]">
              Sort By
            </span>

            <div className="relative w-full md:w-[126px]">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() =>
                  setSortOpen(
                    (current) => !current
                  )
                }
                className="
                  flex
                  h-[44px]
                  w-full
                  items-center
                  justify-between
                  rounded-[12px]
                  border
                  border-[#30343D]
                  bg-[#171A20]
                  px-3.5
                  text-[13px]
                  text-[#F4F4F5]
                  outline-none
                  transition-colors
                  hover:border-[#454A55]
                "
              >
                <span>
                  {sortLabels[sortBy]}
                </span>

                <ChevronDown
                  size={15}
                  strokeWidth={2}
                  className={`
                    text-[#C8CBD0]
                    transition-transform
                    ${
                      sortOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {sortOpen && (
                <div
                  role="listbox"
                  className="
                    absolute
                    right-0
                    top-[50px]
                    z-40
                    w-full
                    min-w-[160px]
                    rounded-[12px]
                    border
                    border-[#252931]
                    bg-[#0D0F12]
                    p-2
                    shadow-2xl
                  "
                >
                  {(
                    [
                      "duration",
                      "calories",
                      "rating",
                    ] as SortOption[]
                  ).map((option) => {
                    const selected =
                      sortBy === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={
                          selected
                        }
                        onClick={() => {
                          setSortBy(option);
                          setSortOpen(false);
                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          gap-2
                          rounded-[9px]
                          px-3
                          py-2.5
                          text-left
                          text-[13px]
                          transition-colors
                          ${
                            selected
                              ? "bg-[#242832] text-[#F4F4F5]"
                              : "text-[#F4F4F5] hover:bg-[#191C22]"
                          }
                        `}
                      >
                        <span className="w-3">
                          {selected
                            ? "✓"
                            : ""}
                        </span>

                        <span>
                          {
                            sortLabels[
                              option
                            ]
                          }
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading */}
        {!isLoaded && (
          <div className="mt-8 flex min-h-[180px] items-center justify-center rounded-[16px] border border-[#252931] bg-[#171A20]">
            <p className="text-[14px] text-[#8E929B]">
              Loading workouts...
            </p>
          </div>
        )}

        {/* Empty state */}
        {isLoaded &&
          sortedWorkouts.length === 0 && (
            <div
              className="
                mt-7
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-[16px]
                border
                border-[#252931]
                bg-[#171A20]
                px-6
                py-12
                text-center
              "
            >
              <h2 className="font-display text-[24px] font-medium uppercase text-[#F4F4F5]">
                Nothing Here Yet
              </h2>

              <p className="mt-3 text-[14px] text-[#8E929B]">
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save a workout from the library and it will show up here."}
              </p>

              <Link
                href="/#library"
                className="
                  mt-6
                  inline-flex
                  h-[44px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#CCFF00]
                  px-6
                  text-[13px]
                  font-bold
                  text-[#090B0E]
                  transition
                  hover:brightness-90
                "
              >
                Go to workouts
              </Link>
            </div>
          )}

        {/* Workout list */}
        {isLoaded &&
          sortedWorkouts.length > 0 && (
            <div className="mt-7 space-y-4">
              {sortedWorkouts.map(
                (workout) => (
                  <article
                    key={workout.id}
                    className="
                      rounded-[16px]
                      border
                      border-[#252931]
                      bg-[#171A20]
                      p-4
                      md:grid
                      md:grid-cols-[140px_minmax(0,1fr)]
                      md:gap-5
                      md:p-4
                      lg:flex
                      lg:min-h-[112px]
                      lg:items-center
                      lg:gap-4
                    "
                  >
                    {/* Image */}
                    <div
                      className="
                        relative
                        aspect-[3.6/1]
                        w-full
                        overflow-hidden
                        rounded-[12px]
                        md:aspect-auto
                        md:h-[104px]
                        md:w-[140px]
                        lg:h-[80px]
                        lg:w-[140px]
                        lg:shrink-0
                      "
                    >
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="
                          (max-width: 767px) 100vw,
                          (max-width: 1023px) 140px,
                          140px
                        "
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="
                        mt-4
                        min-w-0
                        md:mt-0
                        md:flex
                        md:flex-col
                        md:justify-center
                        lg:flex
                        lg:flex-1
                        lg:flex-row
                        lg:items-center
                      "
                    >
                      {/* Workout info */}
                      <div className="min-w-0 lg:flex-1">
                        <h2
                          className="
                            font-display
                            text-[20px]
                            font-medium
                            uppercase
                            leading-tight
                            text-[#F4F4F5]
                            md:text-[19px]
                            lg:text-[18px]
                          "
                        >
                          {workout.name}
                        </h2>

                        <p className="mt-1 text-[13px] leading-none text-[#8E929B]">
                          {workout.equipment}
                        </p>

                        {/* Metrics */}
                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                            text-[12px]
                            text-[#C4C6CB]
                          "
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock3
                              size={15}
                              strokeWidth={2}
                              className="text-[#CCFF00]"
                            />

                            {workout.duration} min
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Flame
                              size={15}
                              strokeWidth={0}
                              fill="currentColor"
                              className="text-[#CCFF00]"
                            />

                            {workout.caloriesBurned}{" "}
                            kcal
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Star
                              size={15}
                              strokeWidth={2}
                              className="text-[#CCFF00]"
                            />

                            {workout.rating}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-2.5
                          md:mt-4
                          lg:ml-5
                          lg:mt-0
                          lg:flex-nowrap
                        "
                      >
                        <Link
                          href={`/workout/${workout.id}`}
                          className="
                            inline-flex
                            h-[38px]
                            items-center
                            justify-center
                            whitespace-nowrap
                            rounded-full
                            border
                            border-[#444A55]
                            px-5
                            text-[12px]
                            text-[#F4F4F5]
                            transition-colors
                            hover:border-[#6B717C]
                          "
                        >
                          View Details
                        </Link>

                        {activeTab ===
                          "plan" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMarkAsDone(
                                workout
                              )
                            }
                            className="
                              inline-flex
                              h-[38px]
                              items-center
                              justify-center
                              gap-2
                              whitespace-nowrap
                              rounded-full
                              bg-[#CCFF00]
                              px-5
                              text-[12px]
                              font-semibold
                              text-[#090B0E]
                              transition
                              hover:brightness-90
                            "
                          >
                            <Check
                              size={15}
                              strokeWidth={2.5}
                            />

                            Mark as Done
                          </button>
                        )}

                        <button
                          type="button"
                          aria-label={
                            activeTab === "plan"
                              ? `Remove ${workout.name} from today's plan`
                              : `Remove ${workout.name} from saved workouts`
                          }
                          onClick={() =>
                            handleRemove(
                              workout
                            )
                          }
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-[#858A94]
                            transition-colors
                            hover:text-[#F4F4F5]
                          "
                        >
                          <X
                            size={17}
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
      </section>
    </main>
  );
}

function MyPlanFallback() {
  return (
    <main className="min-h-screen bg-[#0D0F12]">
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-[14px] text-[#8E929B]">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<MyPlanFallback />}>
      <MyPlanContent />
    </Suspense>
  );
}