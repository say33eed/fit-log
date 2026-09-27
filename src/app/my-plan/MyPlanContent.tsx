"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";
import {
    Check,
    ChevronDown,
    Clock3,
    Flame,
    Search,
    Star,
    X,
} from "lucide-react";

import { useWorkout } from "@/context/WorkoutContext";
import type { Workout } from "@/types/workout";

type Tab = "plan" | "saved";

type SortOption =
    | "duration"
    | "calories"
    | "rating";

const sortLabels: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
};

export default function MyPlanContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        plan,
        saved,
        isLoaded,
        removeFromPlan,
        toggleSaved,
    } = useWorkout();


    const activeTab: Tab =
        searchParams.get("tab") === "saved"
            ? "saved"
            : "plan";

    const [searchQuery, setSearchQuery] =
        useState("");

    const [sortBy, setSortBy] =
        useState<SortOption>("duration");

    const [sortOpen, setSortOpen] =
        useState(false);

    /* =================================
       TAB CHANGE
    ================================== */

    const handleTabChange = (tab: Tab) => {
        setSearchQuery("");
        setSortOpen(false);

        router.replace(`/my-plan?tab=${tab}`, {
            scroll: false,
        });
    };

    /* =================================
       WORKOUT ACTIONS
    ================================== */

    const handleDone = (workout: Workout) => {
        removeFromPlan(workout.id);
    };

    const handleRemove = (workout: Workout) => {
        if (activeTab === "plan") {
            removeFromPlan(workout.id);
            return;
        }

        toggleSaved(workout);
    };

    /* =================================
       ACTIVE WORKOUTS
    ================================== */

    const activeWorkouts =
        activeTab === "plan" ? plan : saved;

    /* =================================
       LIVE DATA / SUMMARY
    ================================== */

    const summary = useMemo(() => {
        return activeWorkouts.reduce(
            (totals, workout) => {
                return {
                    exercises: totals.exercises + 1,
                    minutes:
                        totals.minutes + workout.duration,
                    calories:
                        totals.calories +
                        workout.caloriesBurned,
                };
            },
            {
                exercises: 0,
                minutes: 0,
                calories: 0,
            }
        );
    }, [activeWorkouts]);

    /* =================================
       SEARCH
    ================================== */

    const filteredWorkouts = useMemo(() => {
        const query = searchQuery
            .trim()
            .toLowerCase();

        if (!query) {
            return activeWorkouts;
        }

        return activeWorkouts.filter((workout) => {
            const searchableValues = [
                workout.name,
                workout.equipment,
                workout.difficulty,
                ...workout.muscleGroups,
            ];

            return searchableValues.some((value) =>
                value.toLowerCase().includes(query)
            );
        });
    }, [activeWorkouts, searchQuery]);

    /* =================================
       SORT
    ================================== */

    const displayedWorkouts = useMemo(() => {
        const workouts = [...filteredWorkouts];

        switch (sortBy) {
            case "calories":
                return workouts.sort(
                    (a, b) =>
                        b.caloriesBurned -
                        a.caloriesBurned
                );

            case "rating":
                return workouts.sort(
                    (a, b) => b.rating - a.rating
                );

            case "duration":
            default:
                return workouts.sort(
                    (a, b) =>
                        a.duration - b.duration
                );
        }
    }, [filteredWorkouts, sortBy]);

    /* =================================
       LOADING
    ================================== */

    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-[#0D0F13] text-white">
                <section className="px-4 py-8 sm:px-6 md:px-8 md:py-10 lg:py-12">
                    <div className="mx-auto max-w-[1200px]">
                        <div className="h-9 w-40 animate-pulse rounded-lg bg-[#171A20]" />

                        <div className="mt-3 h-4 w-[320px] max-w-full animate-pulse rounded bg-[#171A20]" />

                        <div className="mt-8 h-[118px] animate-pulse rounded-[16px] border border-[#252932] bg-[#171A20]" />

                        <div className="mt-8 h-[42px] animate-pulse rounded-[10px] bg-[#171A20]" />

                        <div className="mt-6 space-y-3">
                            <div className="h-[118px] animate-pulse rounded-[16px] border border-[#252932] bg-[#171A20]" />

                            <div className="h-[118px] animate-pulse rounded-[16px] border border-[#252932] bg-[#171A20]" />
                        </div>
                    </div>
                </section>
            </main>
        );
    }


    return (
        <main className="min-h-screen bg-[#0D0F13] text-white">
            <section
                className="
          px-4
          pb-16
          pt-8

          sm:px-6
          sm:pb-20
          sm:pt-10

          md:px-8

          lg:pb-24
          lg:pt-12
        "
            >
                <div className="mx-auto max-w-[1200px]">
                    {/* PAGE HEADER */}

                    <header>
                        <h1
                            className="
                font-display
                text-[28px]
                font-semibold
                uppercase
                leading-none
                tracking-[-0.01em]
                text-[#F4F4F5]

                sm:text-[30px]
                lg:text-[32px]
              "
                        >
                            MY PLAN
                        </h1>

                        <p
                            className="
                mt-3
                text-[12px]
                leading-[1.6]
                text-[#858991]

                sm:text-[13px]
              "
                        >
                            Cap of five lifts for today. Finish
                            them, then load more.
                        </p>
                    </header>

                    {/* LIVE DATA */}

                    <div
                        className="
              mt-7
              grid
              grid-cols-3
              overflow-hidden
              rounded-[16px]
              border
              border-[#252932]
              bg-[#171A20]

              sm:mt-8
            "
                    >
                        <div
                            className="
                flex min-w-0 flex-col items-center
                justify-center px-2 py-5 text-center
                sm:px-6 sm:py-6 lg:px-8 lg:py-7
              "
                        >
                            <p className="w-full truncate text-center text-[9px] text-[#777B84] sm:text-[11px]">
                                Exercises
                            </p>

                            <p className="font-display mt-2 text-center text-[27px] font-semibold leading-none text-[#CCFF00] sm:text-[31px] lg:text-[34px]">
                                {summary.exercises}
                            </p>
                        </div>

                        <div
                            className="
                flex min-w-0 flex-col items-center
                justify-center border-l border-[#252932]
                px-2 py-5 text-center
                sm:px-6 sm:py-6 lg:px-8 lg:py-7
              "
                        >
                            <p className="w-full truncate text-center text-[9px] text-[#777B84] sm:text-[11px]">
                                Minutes
                            </p>

                            <p className="font-display mt-2 text-center text-[27px] font-semibold leading-none text-[#F4F4F5] sm:text-[31px] lg:text-[34px]">
                                {summary.minutes}
                            </p>
                        </div>

                        <div
                            className="
                flex min-w-0 flex-col items-center
                justify-center border-l border-[#252932]
                px-2 py-5 text-center
                sm:px-6 sm:py-6 lg:px-8 lg:py-7
              "
                        >
                            <p className="w-full truncate text-center text-[9px] text-[#777B84] sm:text-[11px]">
                                Calories
                            </p>

                            <p className="font-display mt-2 text-center text-[27px] font-semibold leading-none text-[#F4F4F5] sm:text-[31px] lg:text-[34px]">
                                {summary.calories}
                            </p>
                        </div>
                    </div>

                    {/* TABS / SEARCH / SORT */}

                    <div
                        className="
              mt-6 flex flex-col gap-3
              md:mt-7 md:flex-row md:items-center md:gap-3
              lg:mt-8 lg:gap-5
            "
                    >
                        <div
                            className="
                inline-flex w-fit shrink-0
                rounded-[10px] border border-[#242830]
                bg-[#171A20] p-[3px]
              "
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    handleTabChange("plan")
                                }
                                className={`
                  rounded-[7px]
                  px-4
                  py-[7px]
                  text-[11px]
                  transition-colors
                  md:px-4
                  md:text-[11px]
                  lg:px-5
                  lg:text-[12px]
                  ${activeTab === "plan"
                                        ? "bg-[#292D35] font-semibold text-[#F4F4F5]"
                                        : "text-[#777B84] hover:text-[#F4F4F5]"
                                    }
                `}
                            >
                                Today&apos;s Plan
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleTabChange("saved")
                                }
                                className={`
                  rounded-[7px]
                  px-4
                  py-[7px]
                  text-[11px]
                  transition-colors
                  md:px-4
                  md:text-[11px]
                  lg:px-5
                  lg:text-[12px]
                  ${activeTab === "saved"
                                        ? "bg-[#292D35] font-semibold text-[#F4F4F5]"
                                        : "text-[#777B84] hover:text-[#F4F4F5]"
                                    }
                `}
                            >
                                Saved
                            </button>
                        </div>

                        {/* SEARCH */}

                        <div
                            className="
                flex
                h-[40px]
                w-full
                min-w-0
                items-center
                rounded-[10px]
                border
                border-[#292D35]
                bg-[#15181E]
                px-3
                transition-colors
                focus-within:border-[#555B66]

                md:mx-auto
                md:max-w-[360px]
                md:flex-1
              "
                        >
                            <Search
                                size={15}
                                strokeWidth={1.8}
                                aria-hidden="true"
                                className="shrink-0 text-[#777B84]"
                            />

                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    activeTab === "plan"
                                        ? "Search today's plan..."
                                        : "Search saved workouts..."
                                }
                                aria-label="Search workouts"
                                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2.5
                  text-[11px]
                  text-[#F4F4F5]
                  outline-none
                  placeholder:text-[#656A73]

                  lg:text-[12px]
                "
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSearchQuery("")
                                    }
                                    aria-label="Clear search"
                                    className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-[#777B84]
                    transition-colors
                    hover:bg-[#242830]
                    hover:text-white
                  "
                                >
                                    <X
                                        size={14}
                                        aria-hidden="true"
                                    />
                                </button>
                            )}
                        </div>

                        {/* SORT */}

                        <div
                            className="
                flex
                shrink-0
                items-center
                justify-start
                gap-3
                md:justify-end
              "
                        >
                            <span className="shrink-0 whitespace-nowrap text-[10px] text-[#777B84] lg:text-[11px]">
                                Sort By
                            </span>

                            <div className="relative">
                                <button
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded={sortOpen}
                                    onClick={() =>
                                        setSortOpen(
                                            (open) => !open
                                        )
                                    }
                                    className="
                    flex
                    h-[40px]
                    min-w-[105px]
                    items-center
                    justify-between
                    gap-3
                    rounded-[10px]
                    border
                    border-[#292D35]
                    bg-[#15181E]
                    px-3
                    text-[11px]
                    text-[#D5D6D9]
                    transition-colors
                    hover:border-[#444A55]

                    lg:min-w-[115px]
                    lg:gap-4
                    lg:px-4
                    lg:text-[12px]
                  "
                                >
                                    <span>
                                        {sortLabels[sortBy]}
                                    </span>

                                    <ChevronDown
                                        size={14}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                        className={`shrink-0 transition-transform ${sortOpen
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                    />
                                </button>

                                {sortOpen && (
                                    <div
                                        role="listbox"
                                        className="
                      absolute
                      left-0
                      top-[46px]
                      z-30
                      min-w-[145px]
                      overflow-hidden
                      rounded-[10px]
                      border
                      border-[#292D35]
                      bg-[#171A20]
                      p-1
                      shadow-xl

                      md:left-auto
                      md:right-0
                    "
                                    >
                                        {(
                                            Object.keys(
                                                sortLabels
                                            ) as SortOption[]
                                        ).map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                role="option"
                                                aria-selected={
                                                    sortBy === option
                                                }
                                                onClick={() => {
                                                    setSortBy(option);
                                                    setSortOpen(false);
                                                }}
                                                className={`block w-full rounded-[7px] px-3 py-2 text-left text-[12px] transition-colors ${sortBy === option
                                                        ? "bg-[#292D35] text-white"
                                                        : "text-[#A4A7AE] hover:bg-[#20242B] hover:text-white"
                                                    }`}
                                            >
                                                {sortLabels[option]}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* WORKOUT LIST */}

                    <div className="mt-5 space-y-3 sm:mt-6">
                        {displayedWorkouts.length > 0 ? (
                            displayedWorkouts.map(
                                (workout) => (
                                    <article
                                        key={workout.id}
                                        className="
                      overflow-hidden
                      rounded-[16px]
                      border
                      border-[#252932]
                      bg-[#171A20]
                    "
                                    >
                                        <div
                                            className="
                        grid
                        grid-cols-1

                        md:min-h-[118px]
                        md:grid-cols-[150px_minmax(0,1fr)_auto]
                        md:items-center

                        lg:grid-cols-[168px_minmax(0,1fr)_auto]
                      "
                                        >
                                            <Link
                                                href={`/workout/${workout.id}`}
                                                aria-label={`View ${workout.name} details`}
                                                className="
                          relative
                          mx-[16px]
                          mt-[16px]
                          block
                          aspect-[16/9]
                          overflow-hidden
                          rounded-[11px]

                          md:mx-0
                          md:ml-[14px]
                          md:my-[16px]
                          md:h-[78px]
                          md:w-[122px]
                          md:aspect-auto

                          lg:ml-[18px]
                          lg:h-[86px]
                          lg:w-[150px]
                        "
                                            >
                                                <Image
                                                    src={workout.image}
                                                    alt={workout.name}
                                                    fill
                                                    sizes="
                            (max-width: 767px) calc(100vw - 64px),
                            (max-width: 1023px) 122px,
                            150px
                          "
                                                    className="
                            object-cover
                            transition-transform
                            duration-300
                            hover:scale-[1.03]
                          "
                                                />
                                            </Link>

                                            <div
                                                className="
                          min-w-0
                          px-[16px]
                          py-[15px]

                          md:flex
                          md:min-h-[118px]
                          md:flex-col
                          md:justify-center
                          md:px-[14px]
                          md:py-0

                          lg:px-[18px]
                        "
                                            >
                                                <Link
                                                    href={`/workout/${workout.id}`}
                                                    className="
                            block
                            w-fit
                            max-w-full
                            truncate
                            font-display
                            text-[16px]
                            font-semibold
                            uppercase
                            leading-[1.05]
                            text-[#F4F4F5]
                            transition-colors
                            hover:text-[#CCFF00]

                            lg:text-[17px]
                          "
                                                >
                                                    {workout.name}
                                                </Link>

                                                <p className="mt-[5px] truncate text-[11px] leading-none text-[#8B8E96] lg:text-[12px]">
                                                    {workout.equipment}
                                                </p>

                                                <div className="mt-[11px] flex flex-wrap items-center gap-x-[10px] gap-y-[7px] lg:gap-x-[14px]">
                                                    <div className="flex items-center gap-[5px] whitespace-nowrap text-[10px] leading-none text-[#B2B4B9] lg:gap-[6px] lg:text-[12px]">
                                                        <Clock3
                                                            size={14}
                                                            strokeWidth={2}
                                                            aria-hidden="true"
                                                            className="shrink-0 text-[#CCFF00] lg:h-[15px] lg:w-[15px]"
                                                        />

                                                        <span>
                                                            {workout.duration} min
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-[5px] whitespace-nowrap text-[10px] leading-none text-[#B2B4B9] lg:gap-[6px] lg:text-[12px]">
                                                        <Flame
                                                            size={14}
                                                            strokeWidth={1.8}
                                                            fill="currentColor"
                                                            aria-hidden="true"
                                                            className="shrink-0 text-[#CCFF00] lg:h-[15px] lg:w-[15px]"
                                                        />

                                                        <span>
                                                            {workout.caloriesBurned} kcal
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-[5px] whitespace-nowrap text-[10px] leading-none text-[#B2B4B9] lg:gap-[6px] lg:text-[12px]">
                                                        <Star
                                                            size={14}
                                                            strokeWidth={2}
                                                            aria-hidden="true"
                                                            className="shrink-0 text-[#CCFF00] lg:h-[15px] lg:w-[15px]"
                                                        />

                                                        <span>
                                                            {workout.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ACTIONS */}

                                            <div
                                                className="
                          flex
                          min-w-0
                          items-center
                          gap-[8px]
                          border-t
                          border-[#252932]
                          px-[16px]
                          py-[14px]

                          md:border-t-0
                          md:gap-[7px]
                          md:py-0
                          md:pl-[6px]
                          md:pr-[12px]

                          lg:gap-[12px]
                          lg:pl-[12px]
                          lg:pr-[18px]
                        "
                                            >
                                                <Link
                                                    href={`/workout/${workout.id}`}
                                                    className="
                            inline-flex
                            h-[36px]
                            shrink-0
                            items-center
                            justify-center
                            whitespace-nowrap
                            rounded-full
                            border
                            border-[#3A404B]
                            px-[15px]
                            text-[11px]
                            font-medium
                            text-[#E2E3E5]
                            transition-colors
                            hover:border-[#5A616D]
                            hover:bg-[#20242B]
                            hover:text-white

                            md:h-[34px]
                            md:px-[12px]
                            md:text-[10px]

                            lg:h-[38px]
                            lg:px-[20px]
                            lg:text-[12px]
                          "
                                                >
                                                    View Details
                                                </Link>

                                                {activeTab === "plan" && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDone(workout)
                                                        }
                                                        className="
                              inline-flex
                              h-[36px]
                              shrink-0
                              items-center
                              justify-center
                              gap-[6px]
                              whitespace-nowrap
                              rounded-full
                              bg-[#CCFF00]
                              px-[13px]
                              text-[11px]
                              font-bold
                              text-[#090B0E]
                              transition
                              hover:brightness-90

                              md:h-[34px]
                              md:gap-[5px]
                              md:px-[11px]
                              md:text-[10px]

                              lg:h-[38px]
                              lg:gap-[7px]
                              lg:px-[20px]
                              lg:text-[12px]
                            "
                                                    >
                                                        <Check
                                                            size={13}
                                                            strokeWidth={3}
                                                            aria-hidden="true"
                                                            className="shrink-0"
                                                        />

                                                        <span>
                                                            Mark as Done
                                                        </span>
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(workout)
                                                    }
                                                    aria-label={
                                                        activeTab === "plan"
                                                            ? `Remove ${workout.name} from today's plan`
                                                            : `Remove ${workout.name} from saved workouts`
                                                    }
                                                    title={
                                                        activeTab === "plan"
                                                            ? "Remove from plan"
                                                            : "Remove from saved"
                                                    }
                                                    className="
                            ml-auto
                            flex
                            h-[30px]
                            w-[30px]
                            shrink-0
                            items-center
                            justify-center
                            text-[#656A74]
                            transition-colors
                            hover:text-[#F4F4F5]

                            md:ml-0
                            md:h-[26px]
                            md:w-[26px]

                            lg:h-[30px]
                            lg:w-[30px]
                          "
                                                >
                                                    <X
                                                        size={17}
                                                        strokeWidth={1.8}
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                )
                            )
                        ) : (
                            <div
                                className="
                  flex
                  min-h-[220px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[16px]
                  border
                  border-[#252932]
                  bg-[#171A20]
                  px-6
                  py-12
                  text-center
                "
                            >
                                {searchQuery ? (
                                    <>
                                        <Search
                                            size={25}
                                            strokeWidth={1.6}
                                            aria-hidden="true"
                                            className="text-[#626771]"
                                        />

                                        <h2 className="font-display mt-4 text-[18px] font-semibold uppercase text-[#F4F4F5]">
                                            No workouts found
                                        </h2>

                                        <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-[#777B84]">
                                            No workouts match &quot;
                                            {searchQuery}&quot;.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSearchQuery("")
                                            }
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
                                    </>
                                ) : activeTab === "plan" ? (
                                    <>
                                        <h2 className="font-display text-[18px] font-semibold uppercase text-[#F4F4F5]">
                                            Your plan is empty
                                        </h2>

                                        <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-[#777B84]">
                                            Add workouts from the
                                            library to build today&apos;s
                                            training plan.
                                        </p>

                                        <Link
                                            href="/#library"
                                            className="
                        mt-5
                        inline-flex
                        h-[40px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[#CCFF00]
                        px-5
                        text-[12px]
                        font-bold
                        text-[#090B0E]
                        transition
                        hover:brightness-90
                      "
                                        >
                                            Browse Workouts
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="font-display text-[18px] font-semibold uppercase text-[#F4F4F5]">
                                            No saved workouts
                                        </h2>

                                        <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-[#777B84]">
                                            Save workouts from the
                                            library and they&apos;ll
                                            appear here.
                                        </p>

                                        <Link
                                            href="/#library"
                                            className="
                        mt-5
                        inline-flex
                        h-[40px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[#CCFF00]
                        px-5
                        text-[12px]
                        font-bold
                        text-[#090B0E]
                        transition
                        hover:brightness-90
                      "
                                        >
                                            Browse Workouts
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}