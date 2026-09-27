import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock3,
  Dumbbell,
  Flame,
  Gauge,
  Repeat2,
  Star,
} from "lucide-react";

import WorkoutActions from "@/components/WorkoutActions";
import { getWorkoutById } from "@/lib/api";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkoutById(id);
  } catch {
    notFound();
  }

  if (!workout) {
    notFound();
  }

  const specs = [
    {
      label: "Equipment",
      value: workout.equipment,
      icon: Dumbbell,
    },
    {
      label: "Difficulty",
      value: workout.difficulty,
      icon: Gauge,
    },
    {
      label: "Duration",
      value: `${workout.duration} min`,
      icon: Clock3,
    },
    {
      label: "Calories",
      value: `${workout.caloriesBurned} kcal`,
      icon: Flame,
    },
    {
      label: "Sets",
      value: workout.sets,
      icon: Repeat2,
    },
    {
      label: "Reps",
      value: workout.reps,
      icon: Repeat2,
    },
    {
      label: "Rating",
      value: workout.rating,
      icon: Star,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      <section className="px-4 pb-24 pt-8 sm:px-5 md:px-6 md:pt-10 lg:px-8 lg:pt-12">
        <div
          className="
            mx-auto
            grid
            max-w-[1200px]
            grid-cols-1
            gap-10
            lg:grid-cols-2
            lg:gap-12
          "
        >
          {/* Workout image */}
          <div
            className="
              relative
              aspect-[1.45/1]
              w-full
              overflow-hidden
              rounded-[16px]
              border
              border-[#292D35]
              bg-[#191C22]
              md:aspect-[3.15/1]
              lg:sticky
              lg:top-[102px]
              lg:aspect-[4/5]
              lg:self-start
            "
          >
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Workout details */}
          <div className="min-w-0">
            {/* Title */}
            <h1
              className="
                font-display
                text-[36px]
                font-semibold
                uppercase
                leading-[1.05]
                tracking-[-0.01em]
                text-[#F4F4F5]
                sm:text-[42px]
                lg:text-[48px]
              "
            >
              {workout.name}
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-[650px]
                text-[14px]
                leading-[1.7]
                text-[#A5A8AF]
                sm:text-[15px]
              "
            >
              {workout.description}
            </p>

            {/* Muscle groups */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="
                    rounded-full
                    bg-[#CCFF00]
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-black
                    uppercase
                    leading-none
                    text-[#090B0E]
                  "
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Workout specifications */}
            <div
              className="
                mt-7
                overflow-hidden
                rounded-[16px]
                border
                border-[#292D35]
                bg-[#191C22]
              "
            >
              {specs.map((spec, index) => {
                const Icon = spec.icon;

                return (
                  <div
                    key={spec.label}
                    className={`
                      px-4
                      py-4
                      md:grid
                      md:grid-cols-2
                      md:items-center
                      md:px-5
                      ${
                        index !== specs.length - 1
                          ? "border-b border-[#292D35]"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2.5
                        text-[13px]
                        text-[#858991]
                      "
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                      <span>{spec.label}</span>
                    </div>

                    <div
                      className="
                        mt-2
                        text-[14px]
                        font-medium
                        text-[#F4F4F5]
                        md:mt-0
                      "
                    >
                      {spec.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="mt-9">
              <h2
                className="
                  font-display
                  text-[25px]
                  font-semibold
                  uppercase
                  text-[#F4F4F5]
                "
              >
                INSTRUCTIONS
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={`${workout.id}-${index}`}
                      className="flex items-start gap-4"
                    >
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#CCFF00]
                          text-[12px]
                          font-bold
                          text-[#090B0E]
                        "
                      >
                        {index + 1}
                      </span>

                      <p
                        className="
                          pt-[2px]
                          text-[14px]
                          leading-[1.7]
                          text-[#B3B5BA]
                        "
                      >
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </section>
    </main>
  );
}