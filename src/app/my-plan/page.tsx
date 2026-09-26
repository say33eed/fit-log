"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Flame,
  Star,
  Timer,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { useWorkout } from "@/context/WorkoutContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    toggleSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] =
    useState<Tab>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [sortOpen, setSortOpen] =
    useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * The summary follows the currently selected tab.
   *
   * Today's Plan:
   *   Exercises = plan.length
   *   Minutes = total plan duration
   *   Calories = total plan calories
   *
   * Saved:
   *   Exercises = saved.length
   *   Minutes = total saved duration
   *   Calories = total saved calories
   */
  const summaryWorkouts =
    activeTab === "plan" ? plan : saved;

  const summary = useMemo(() => {
    return summaryWorkouts.reduce(
      (total, workout) => {
        total.minutes += workout.duration;
        total.calories += workout.caloriesBurned;

        return total;
      },
      {
        minutes: 0,
        calories: 0,
      }
    );
  }, [summaryWorkouts]);

  const sortOptions: {
    value: SortOption;
    label: string;
  }[] = [
    {
      value: "duration",
      label: "Duration",
    },
    {
      value: "calories",
      label: "Calories",
    },
    {
      value: "rating",
      label: "Rating",
    },
  ];

  const selectedSortLabel =
    sortOptions.find(
      (option) => option.value === sortBy
    )?.label ?? "Duration";

  const activeWorkouts =
    activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...activeWorkouts].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return (
          a.caloriesBurned - b.caloriesBurned
        );
      }

      return b.rating - a.rating;
    });
  }, [activeWorkouts, sortBy]);

  const handleMarkAsDone = (id: number) => {
    removeFromPlan(id);

    toast.success("Workout logged — nice work", {
      duration: 3000,
      style: {
        background: "#171A20",
        color: "#F4F4F5",
        border: "1px solid #2A2E36",
        borderRadius: "8px",
        padding: "12px 14px",
        fontSize: "14px",
      },
      iconTheme: {
        primary: "#4CCB57",
        secondary: "#FFFFFF",
      },
    });
  };

  const handleRemoveFromPlan = (
    id: number,
    name: string
  ) => {
    removeFromPlan(id);

    toast.success(
      `Removed ${name} from your plan`
    );
  };

  const handleRemoveFromSaved = (
    workout: (typeof saved)[number]
  ) => {
    toggleSaved(workout);

    toast.success(
      `Removed ${workout.name} from saved`
    );
  };

  return (
    <main className="min-h-screen bg-[#0D0F12] text-[#F4F4F5]">
      <section className="mx-auto max-w-[1200px] px-4 pb-16 pt-9 sm:px-5 md:pt-10 lg:px-0 lg:pb-20 lg:pt-11">
        {/* Heading */}
        <div>
          <h1 className="font-display text-[32px] font-medium uppercase leading-none tracking-[0.01em] text-[#F4F4F5] md:text-[34px]">
            My Plan
          </h1>

          <p className="mt-3 text-[14px] leading-[1.5] text-[#8E929B] md:text-[15px]">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* Summary */}
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
          <div className="px-6 py-5 md:relative md:px-6 md:py-7 lg:px-7">
            <p className="text-[12px] text-[#8E929B]">
              Exercises
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#CCFF00]">
              {summaryWorkouts.length}
            </p>

            <span className="absolute right-0 top-1/2 hidden h-[50px] w-px -translate-y-1/2 bg-[#292D35] md:block" />
          </div>

          {/* Minutes */}
          <div className="border-t border-[#252931] px-6 py-5 md:relative md:border-t-0 md:px-6 md:py-7 lg:px-7">
            <p className="text-[12px] text-[#8E929B]">
              Minutes
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#F4F4F5]">
              {summary.minutes}
            </p>

            <span className="absolute right-0 top-1/2 hidden h-[50px] w-px -translate-y-1/2 bg-[#292D35] md:block" />
          </div>

          {/* Calories */}
          <div className="border-t border-[#252931] px-6 py-5 md:border-t-0 md:px-6 md:py-7 lg:px-7">
            <p className="text-[12px] text-[#8E929B]">
              Calories
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#F4F4F5]">
              {summary.calories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Tabs */}
          <div
            className="
              inline-grid
              h-[44px]
              w-[220px]
              grid-cols-[1.15fr_0.85fr]
              items-center
              rounded-[14px]
              border
              border-[#252931]
              bg-[#171A20]
              p-[3px]
            "
          >
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`
                flex
                h-[36px]
                items-center
                justify-center
                whitespace-nowrap
                rounded-[11px]
                border
                px-4
                text-[13px]
                outline-none
                transition-colors
                ${
                  activeTab === "plan"
                    ? "border-[#30343D] bg-[#242832] font-semibold text-[#F4F4F5]"
                    : "border-transparent bg-transparent text-[#858A94] hover:text-[#F4F4F5]"
                }
              `}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`
                flex
                h-[36px]
                items-center
                justify-center
                whitespace-nowrap
                rounded-[11px]
                border
                px-4
                text-[13px]
                outline-none
                transition-colors
                ${
                  activeTab === "saved"
                    ? "border-[#30343D] bg-[#242832] font-semibold text-[#F4F4F5]"
                    : "border-transparent bg-transparent text-[#858A94] hover:text-[#F4F4F5]"
                }
              `}
            >
              Saved
            </button>
          </div>

          {/* Sort */}
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-3">
            <span className="text-[14px] text-[#A3A6AD] md:text-[12px]">
              Sort By
            </span>

            <div
              ref={sortRef}
              className="relative w-full md:w-[112px]"
            >
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() =>
                  setSortOpen((open) => !open)
                }
                className={`
                  flex
                  h-[42px]
                  w-full
                  items-center
                  justify-between
                  rounded-[12px]
                  border
                  bg-[#171A20]
                  px-3
                  text-left
                  text-[13px]
                  text-[#F4F4F5]
                  outline-none
                  transition-colors
                  ${
                    sortOpen
                      ? "border-[#8E929B]"
                      : "border-[#30343D] hover:border-[#555B65]"
                  }
                `}
              >
                <span>{selectedSortLabel}</span>

                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                  className={`
                    text-[#D5D7DB]
                    transition-transform
                    ${sortOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {sortOpen && (
                <div
                  role="listbox"
                  aria-label="Sort workouts"
                  className="
                    absolute
                    right-0
                    top-[48px]
                    z-40
                    flex
                    w-full
                    min-w-[160px]
                    flex-col
                    gap-1.5
                    rounded-[14px]
                    border
                    border-[#252931]
                    bg-[#0D0F12]
                    p-2
                    shadow-[0_14px_35px_rgba(0,0,0,0.35)]
                  "
                >
                  {sortOptions.map((option) => {
                    const selected =
                      sortBy === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`
                          flex
                          h-[36px]
                          w-full
                          items-center
                          gap-2
                          rounded-[10px]
                          border
                          px-3
                          text-left
                          text-[13px]
                          outline-none
                          transition-colors
                          ${
                            selected
                              ? "border-[#30343D] bg-[#24262C] text-[#F4F4F5]"
                              : "border-transparent text-[#F4F4F5] hover:border-[#292D35] hover:bg-[#1A1D22]"
                          }
                        `}
                      >
                        <span className="flex w-[14px] shrink-0 items-center justify-center">
                          {selected && (
                            <Check
                              size={13}
                              strokeWidth={2}
                            />
                          )}
                        </span>

                        <span>
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Workout List */}
        <div className="mt-6">
          {!isLoaded ? (
            <div className="flex min-h-[220px] items-center justify-center rounded-[16px] border border-[#252931] bg-[#171A20]">
              <p className="text-[14px] text-[#8E929B]">
                Loading workouts...
              </p>
            </div>
          ) : sortedWorkouts.length === 0 ? (
            /* Empty State */
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[16px] border border-[#252931] bg-[#171A20] px-6 text-center md:min-h-[300px]">
              <h2 className="font-display text-[22px] font-medium uppercase tracking-[0.01em] text-[#F4F4F5]">
                Nothing Here Yet
              </h2>

              <p className="mt-3 max-w-[390px] text-[14px] leading-[1.6] text-[#8E929B]">
                Browse the library and add a lift to
                get today moving.
              </p>

              <Link
                href="/"
                className="
                  mt-6
                  inline-flex
                  h-[44px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#CCFF00]
                  px-7
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
          ) : (
            <div className="space-y-4">
              {sortedWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className="
                    rounded-[16px]
                    border
                    border-[#252931]
                    bg-[#171A20]
                    p-4
                    md:flex
                    md:min-h-[112px]
                    md:items-center
                    md:gap-4
                  "
                >
                  {/* Image */}
                  <div
                    className="
                      relative
                      aspect-[1.85/1]
                      w-full
                      shrink-0
                      overflow-hidden
                      rounded-[12px]
                      bg-[#101216]
                      md:h-[80px]
                      md:w-[142px]
                      md:aspect-auto
                    "
                  >
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="(max-width: 767px) 100vw, 142px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Workout Information */}
                  <div className="mt-4 min-w-0 md:mt-0">
                    <h2 className="font-display text-[20px] font-medium uppercase leading-[1.1] tracking-[0.01em] text-[#F4F4F5] md:text-[17px]">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-[13px] leading-none text-[#8E929B] md:text-[12px]">
                      {workout.equipment}
                    </p>

                    {/* Stats */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-2 md:gap-x-3">
                      <div className="flex items-center gap-1.5 whitespace-nowrap text-[12px] text-[#C5C7CC]">
                        <Timer
                          size={15}
                          strokeWidth={2}
                          className="shrink-0 text-[#CCFF00]"
                        />

                        <span>
                          {workout.duration} min
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 whitespace-nowrap text-[12px] text-[#C5C7CC]">
                        <Flame
                          size={15}
                          strokeWidth={2}
                          fill="currentColor"
                          className="shrink-0 text-[#CCFF00]"
                        />

                        <span>
                          {workout.caloriesBurned} kcal
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 whitespace-nowrap text-[12px] text-[#C5C7CC]">
                        <Star
                          size={15}
                          strokeWidth={2}
                          className="shrink-0 text-[#CCFF00]"
                        />

                        <span>
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-2 md:ml-auto md:mt-0 md:shrink-0">
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
                        border-[#4A505B]
                        px-5
                        text-[12px]
                        font-medium
                        text-[#F4F4F5]
                        transition-colors
                        hover:border-[#747B87]
                        sm:px-6
                        md:h-[34px]
                        md:px-5
                      "
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleMarkAsDone(
                            workout.id
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
                          border
                          border-[#CCFF00]
                          bg-[#CCFF00]
                          px-5
                          text-[12px]
                          font-semibold
                          text-[#090B0E]
                          transition
                          hover:brightness-90
                          sm:px-6
                          md:h-[34px]
                          md:px-5
                        "
                      >
                        <Check
                          size={14}
                          strokeWidth={2.5}
                        />

                        Mark as Done
                      </button>
                    )}

                    <button
                      type="button"
                      aria-label={
                        activeTab === "plan"
                          ? `Remove ${workout.name} from plan`
                          : `Remove ${workout.name} from saved`
                      }
                      onClick={() => {
                        if (activeTab === "plan") {
                          handleRemoveFromPlan(
                            workout.id,
                            workout.name
                          );
                        } else {
                          handleRemoveFromSaved(
                            workout
                          );
                        }
                      }}
                      className="
                        ml-1
                        inline-flex
                        h-[34px]
                        w-[34px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[#777C86]
                        transition-colors
                        hover:text-[#F4F4F5]
                      "
                    >
                      <X
                        size={16}
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}