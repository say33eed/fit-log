"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Search,
  Star,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { useWorkout } from "@/context/WorkoutContext";
import type { Workout } from "@/types/workout";

type TabType = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const sortLabels: Record<SortOption, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

function MyPlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    removeFromSaved,
  } = useWorkout();

  const requestedTab = searchParams.get("tab");

  const activeTab: TabType =
    requestedTab === "saved" ? "saved" : "plan";

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [sortOpen, setSortOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const sortRef = useRef<HTMLDivElement>(null);

  /*
   * Close the sorting dropdown when the user
   * clicks anywhere outside it.
   */
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
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
   * Clear the search when switching between
   * Today's Plan and Saved.
   */
  useEffect(() => {
    setSearchQuery("");
  }, [activeTab]);

  const activeWorkouts =
    activeTab === "plan" ? plan : saved;

  /*
   * Live summary values.
   */
  const totalExercises = activeWorkouts.length;

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = activeWorkouts.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  /*
   * Search first, then sort the matching workouts.
   *
   * Search works with:
   * - workout name
   * - muscle-group tags
   */
  const filteredAndSortedWorkouts = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    const filtered = activeWorkouts.filter(
      (workout) => {
        if (!query) {
          return true;
        }

        const matchesName = workout.name
          .toLowerCase()
          .includes(query);

        const matchesTag =
          workout.muscleGroups.some((group) =>
            group
              .toLowerCase()
              .includes(query)
          );

        return matchesName || matchesTag;
      }
    );

    return [...filtered].sort((a, b) => {
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
    });
  }, [
    activeWorkouts,
    searchQuery,
    sortBy,
  ]);

  const handleTabChange = (tab: TabType) => {
    router.push(`/my-plan?tab=${tab}`);
  };

  const handleRemove = (workout: Workout) => {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);

      toast.success(
        `${workout.name} removed from today's plan`
      );

      return;
    }

    removeFromSaved(workout.id);

    toast.success(
      `${workout.name} removed from saved workouts`
    );
  };

  const handleDone = (workout: Workout) => {
    removeFromPlan(workout.id);

    toast.success(
      "Workout logged — nice work"
    );
  };

  const hasSearchQuery =
    searchQuery.trim().length > 0;

  const noSearchResults =
    activeWorkouts.length > 0 &&
    hasSearchQuery &&
    filteredAndSortedWorkouts.length === 0;

  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      <section className="px-4 pb-24 pt-8 sm:px-5 md:px-6 md:pt-10 lg:px-8 lg:pt-12">
        <div className="mx-auto max-w-[1200px]">
          {/* Page heading */}
          <div>
            <h1
              className="
                font-display
                text-[34px]
                font-medium
                uppercase
                leading-none
                text-[#F4F4F5]
                sm:text-[38px]
                lg:text-[42px]
              "
            >
              MY PLAN
            </h1>

            <p className="mt-3 max-w-[620px] text-[14px] leading-[1.6] text-[#8E929B] sm:text-[15px]">
              Keep up to five lifts in today&apos;s plan,
              save workouts for later, and track the
              work as it adds up.
            </p>
          </div>

          {/* Tabs + sort */}
          <div
            className="
              mt-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Tabs */}
            <div
              className="
                inline-flex
                w-full
                rounded-[12px]
                border
                border-[#292D35]
                bg-[#171A20]
                p-1
                sm:w-auto
              "
            >
              <button
                type="button"
                onClick={() =>
                  handleTabChange("plan")
                }
                className={`
                  flex-1
                  rounded-[9px]
                  px-5
                  py-2.5
                  text-[13px]
                  font-semibold
                  transition-colors
                  sm:flex-none
                  ${
                    activeTab === "plan"
                      ? "bg-[#CCFF00] text-[#090B0E]"
                      : "text-[#A4A7AE] hover:text-white"
                  }
                `}
              >
                TODAY&apos;S PLAN
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTabChange("saved")
                }
                className={`
                  flex-1
                  rounded-[9px]
                  px-5
                  py-2.5
                  text-[13px]
                  font-semibold
                  transition-colors
                  sm:flex-none
                  ${
                    activeTab === "saved"
                      ? "bg-[#CCFF00] text-[#090B0E]"
                      : "text-[#A4A7AE] hover:text-white"
                  }
                `}
              >
                SAVED
              </button>
            </div>

            {/* Sort dropdown */}
            <div
              ref={sortRef}
              className="relative"
            >
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() =>
                  setSortOpen((open) => !open)
                }
                className="
                  flex
                  h-[42px]
                  w-full
                  items-center
                  justify-between
                  gap-4
                  rounded-[11px]
                  border
                  border-[#292D35]
                  bg-[#171A20]
                  px-4
                  text-[13px]
                  text-[#D5D6D9]
                  transition-colors
                  hover:border-[#3A3E47]
                  sm:w-[180px]
                "
              >
                <span>
                  Sort: {sortLabels[sortBy]}
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`
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
                    top-[48px]
                    z-30
                    w-full
                    overflow-hidden
                    rounded-[11px]
                    border
                    border-[#292D35]
                    bg-[#171A20]
                    p-1
                    shadow-xl
                    sm:w-[180px]
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
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-[8px]
                        px-3
                        py-2.5
                        text-left
                        text-[13px]
                        transition-colors
                        ${
                          sortBy === option
                            ? "bg-[#252931] text-[#CCFF00]"
                            : "text-[#D5D6D9] hover:bg-[#20242B] hover:text-white"
                        }
                      `}
                    >
                      {sortLabels[option]}

                      {sortBy === option && (
                        <Check
                          size={14}
                          strokeWidth={2.2}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
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
                className="
                  shrink-0
                  text-[#8E929B]
                "
                aria-hidden="true"
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
                aria-label={
                  activeTab === "plan"
                    ? "Search today's plan by workout name or muscle group"
                    : "Search saved workouts by workout name or muscle group"
                }
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
                  onClick={() =>
                    setSearchQuery("")
                  }
                  aria-label="Clear search"
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
                  />
                </button>
              )}
            </div>
          </div>

          {/* Live summary */}
          <div
            className="
              mt-8
              grid
              grid-cols-1
              overflow-hidden
              rounded-[16px]
              border
              border-[#292D35]
              bg-[#171A20]
              sm:grid-cols-3
            "
          >
            <div className="px-5 py-5 sm:px-6">
              <p
                className="
                  font-display
                  text-[12px]
                  uppercase
                  text-[#8E929B]
                "
              >
                EXERCISES
              </p>

              <p
                className="
                  mt-2
                  text-[24px]
                  font-semibold
                  text-[#F4F4F5]
                "
              >
                {totalExercises}
              </p>
            </div>

            <div
              className="
                border-t
                border-[#292D35]
                px-5
                py-5
                sm:border-l
                sm:border-t-0
                sm:px-6
              "
            >
              <p
                className="
                  font-display
                  text-[12px]
                  uppercase
                  text-[#8E929B]
                "
              >
                MINUTES
              </p>

              <p
                className="
                  mt-2
                  text-[24px]
                  font-semibold
                  text-[#F4F4F5]
                "
              >
                {totalMinutes}
              </p>
            </div>

            <div
              className="
                border-t
                border-[#292D35]
                px-5
                py-5
                sm:border-l
                sm:border-t-0
                sm:px-6
              "
            >
              <p
                className="
                  font-display
                  text-[12px]
                  uppercase
                  text-[#8E929B]
                "
              >
                CALORIES
              </p>

              <p
                className="
                  mt-2
                  text-[24px]
                  font-semibold
                  text-[#F4F4F5]
                "
              >
                {totalCalories}
              </p>
            </div>
          </div>

          {/* Loading */}
          {!isLoaded && (
            <div
              className="
                mt-8
                flex
                min-h-[260px]
                items-center
                justify-center
                rounded-[16px]
                border
                border-[#292D35]
                bg-[#171A20]
              "
            >
              <p className="text-[14px] text-[#8E929B]">
                Loading workouts...
              </p>
            </div>
          )}

          {/* Empty / no search results */}
          {isLoaded &&
            filteredAndSortedWorkouts.length ===
              0 && (
              <div
                className="
                  mt-8
                  flex
                  min-h-[300px]
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
                  <h2
                    className="
                      font-display
                      text-[24px]
                      font-medium
                      uppercase
                      text-[#F4F4F5]
                    "
                  >
                    {noSearchResults
                      ? "NO WORKOUTS FOUND"
                      : "NOTHING HERE YET"}
                  </h2>

                  <p
                    className="
                      mt-3
                      text-[14px]
                      leading-[1.6]
                      text-[#8E929B]
                    "
                  >
                    {noSearchResults
                      ? "Try searching by another workout name or muscle group."
                      : activeTab === "plan"
                        ? "Browse the library and add a lift to get today moving."
                        : "Save a workout from the library and it will show up here."}
                  </p>

                  {noSearchResults ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchQuery("")
                      }
                      className="
                        mt-6
                        inline-flex
                        h-[42px]
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#CCFF00]
                        px-5
                        text-[13px]
                        font-bold
                        text-[#090B0E]
                        transition
                        hover:brightness-90
                      "
                    >
                      CLEAR SEARCH
                    </button>
                  ) : (
                    <Link
                      href="/#library"
                      className="
                        mt-6
                        inline-flex
                        h-[42px]
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#CCFF00]
                        px-5
                        text-[13px]
                        font-bold
                        text-[#090B0E]
                        transition
                        hover:brightness-90
                      "
                    >
                      BROWSE WORKOUTS
                    </Link>
                  )}
                </div>
              </div>
            )}

          {/* Workout list */}
          {isLoaded &&
            filteredAndSortedWorkouts.length >
              0 && (
              <div className="mt-8 space-y-4">
                {filteredAndSortedWorkouts.map(
                  (workout) => (
                    <article
                      key={workout.id}
                      className="
                        overflow-hidden
                        rounded-[16px]
                        border
                        border-[#292D35]
                        bg-[#171A20]
                      "
                    >
                      <div
                        className="
                          grid
                          grid-cols-1
                          md:grid-cols-[190px_1fr]
                          lg:grid-cols-[220px_1fr_auto]
                        "
                      >
                        {/* Image */}
                        <Link
                          href={`/workout/${workout.id}`}
                          className="
                            relative
                            block
                            aspect-[16/9]
                            overflow-hidden
                            md:aspect-auto
                            md:min-h-[190px]
                          "
                        >
                          <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            sizes="
                              (max-width: 767px) 100vw,
                              (max-width: 1023px) 190px,
                              220px
                            "
                            className="
                              object-cover
                              transition-transform
                              duration-300
                              hover:scale-[1.03]
                            "
                          />
                        </Link>

                        {/* Workout information */}
                        <div className="min-w-0 p-5 sm:p-6">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {workout.muscleGroups.map(
                              (group) => (
                                <span
                                  key={group}
                                  className="
                                    rounded-full
                                    bg-[#CCFF00]
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-bold
                                    leading-none
                                    text-[#090B0E]
                                  "
                                >
                                  {group}
                                </span>
                              )
                            )}
                          </div>

                          <Link
                            href={`/workout/${workout.id}`}
                            className="
                              mt-4
                              inline-block
                              font-display
                              text-[22px]
                              font-medium
                              uppercase
                              leading-tight
                              text-[#F4F4F5]
                              transition-colors
                              hover:text-[#CCFF00]
                            "
                          >
                            {workout.name}
                          </Link>

                          <p
                            className="
                              mt-2
                              line-clamp-2
                              max-w-[650px]
                              text-[13px]
                              leading-[1.55]
                              text-[#8E929B]
                            "
                          >
                            {workout.description}
                          </p>

                          {/* Metrics */}
                          <div
                            className="
                              mt-5
                              flex
                              flex-wrap
                              gap-x-5
                              gap-y-2
                              text-[12px]
                              text-[#B5B7BC]
                            "
                          >
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                              "
                            >
                              <Clock3
                                size={15}
                                strokeWidth={2}
                                className="text-[#8E929B]"
                              />

                              {workout.duration} min
                            </span>

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                              "
                            >
                              <Flame
                                size={15}
                                strokeWidth={2}
                                className="text-[#8E929B]"
                              />

                              {
                                workout.caloriesBurned
                              }{" "}
                              kcal
                            </span>

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                              "
                            >
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
                            flex
                            items-center
                            gap-2
                            border-t
                            border-[#292D35]
                            px-5
                            py-4
                            sm:px-6
                            lg:flex-col
                            lg:justify-center
                            lg:border-l
                            lg:border-t-0
                            lg:px-5
                          "
                        >
                          {activeTab === "plan" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleDone(
                                  workout
                                )
                              }
                              className="
                                inline-flex
                                h-[40px]
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-[10px]
                                bg-[#CCFF00]
                                px-4
                                text-[12px]
                                font-bold
                                text-[#090B0E]
                                transition
                                hover:brightness-90
                                lg:w-[145px]
                                lg:flex-none
                              "
                            >
                              <Check
                                size={15}
                                strokeWidth={2.5}
                              />

                              MARK AS DONE
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(
                                workout
                              )
                            }
                            aria-label={`Remove ${workout.name}`}
                            className="
                              inline-flex
                              h-[40px]
                              w-[40px]
                              shrink-0
                              items-center
                              justify-center
                              rounded-[10px]
                              border
                              border-[#353942]
                              text-[#A4A7AE]
                              transition-colors
                              hover:border-[#555B66]
                              hover:bg-[#20242B]
                              hover:text-white
                              lg:w-[145px]
                            "
                          >
                            <X
                              size={17}
                              strokeWidth={2}
                            />

                            <span className="ml-2 hidden text-[12px] font-semibold lg:inline">
                              REMOVE
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
        </div>
      </section>
    </main>
  );
}

function MyPlanLoading() {
  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      <section className="px-4 pb-24 pt-8 sm:px-5 md:px-6 md:pt-10 lg:px-8 lg:pt-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="h-10 w-40 animate-pulse rounded-lg bg-[#191C22]" />

          <div className="mt-4 h-4 w-full max-w-[520px] animate-pulse rounded bg-[#191C22]" />

          <div className="mt-8 h-[46px] w-full max-w-[420px] animate-pulse rounded-[12px] bg-[#191C22]" />

          <div className="mt-8 h-[120px] animate-pulse rounded-[16px] bg-[#191C22]" />

          <div className="mt-8 h-[220px] animate-pulse rounded-[16px] bg-[#191C22]" />
        </div>
      </section>
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<MyPlanLoading />}>
      <MyPlanContent />
    </Suspense>
  );
}