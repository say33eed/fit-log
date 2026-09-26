"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan } = useWorkout();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const summary = useMemo(() => {
    return plan.reduce(
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
  }, [plan]);

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
    sortOptions.find((option) => option.value === sortBy)?.label ??
    "Duration";

  return (
    <main className="min-h-screen bg-[#0D0F12] text-[#F4F4F5]">
      <section className="mx-auto max-w-[1200px] px-4 pb-16 pt-9 sm:px-5 md:pt-10 lg:px-0 lg:pb-20 lg:pt-11">
        {/* Heading */}
        <div>
          <h1 className="font-display text-[32px] font-medium uppercase leading-none tracking-[0.01em] text-[#F4F4F5] md:text-[34px]">
            My Plan
          </h1>

          <p className="mt-3 text-[14px] leading-[1.5] text-[#8E929B] md:text-[15px]">
            Cap of five lifts for today. Finish them, then load more.
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
          <div
            className="
              px-6
              py-5
              md:relative
              md:px-6
              md:py-7
              lg:px-7
            "
          >
            <p className="text-[12px] text-[#8E929B]">
              Exercises
            </p>

            <p className="font-display mt-2 text-[34px] font-semibold leading-none text-[#CCFF00]">
              {plan.length}
            </p>

            <span className="absolute right-0 top-1/2 hidden h-[50px] w-px -translate-y-1/2 bg-[#292D35] md:block" />
          </div>

          {/* Minutes */}
          <div
            className="
              border-t
              border-[#252931]
              px-6
              py-5
              md:relative
              md:border-t-0
              md:px-6
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

            <span className="absolute right-0 top-1/2 hidden h-[50px] w-px -translate-y-1/2 bg-[#292D35] md:block" />
          </div>

          {/* Calories */}
          <div
            className="
              border-t
              border-[#252931]
              px-6
              py-5
              md:border-t-0
              md:px-6
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

        {/* Tabs + Sort */}
        <div
          className="
            mt-7
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
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

            <div
              ref={sortRef}
              className="relative w-full md:w-[112px]"
            >
              {/* Sort Trigger */}
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((open) => !open)}
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

              {/* Sort Dropdown */}
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
                    const selected = sortBy === option.value;

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
                              aria-hidden="true"
                            />
                          )}
                        </span>

                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Workout list goes here */}
        <div className="mt-6" />
      </section>
    </main>
  );
}