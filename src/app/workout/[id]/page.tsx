import Image from "next/image";
import { notFound } from "next/navigation";
import { Bookmark, CalendarPlus } from "lucide-react";

import Navbar from "@/components/Navbar";
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

    const specs = [
        ["Equipment", workout.equipment],
        ["Difficulty", workout.difficulty],
        ["Sets", workout.sets],
        ["Reps", workout.reps],
        ["Duration", `${workout.duration} min`],
        ["Calories", `${workout.caloriesBurned} kcal`],
        ["Rating", workout.rating],
    ];

    return (
        <main className="min-h-screen bg-[#0D0F13] text-white">
            <Navbar />

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
    md:aspect-[3.15/1]
    lg:aspect-[4/5]
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

                    {/* Workout information */}
                    <div className="min-w-0">
                        <h1
                            className="
                font-display
                text-[36px]
                font-medium
                uppercase
                leading-[1.08]
                text-[#F4F4F5]
                md:text-[40px]
                lg:text-[42px]
              "
                        >
                            {workout.name}
                        </h1>

                        <p className="mt-4 min-h-[50px] max-w-[620px] text-[16px] leading-[1.55] text-[#A5A7AD]">
                            {workout.description}
                        </p>

                        {/* Muscle groups */}
                        <div className="mt-4 flex flex-wrap gap-2.5">
                            {workout.muscleGroups.map((group) => (
                                <span
                                    key={group}
                                    className="
                    rounded-full
                    bg-[#CCFF00]
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-bold
                    leading-none
                    text-[#090B0E]
                  "
                                >
                                    {group}
                                </span>
                            ))}
                        </div>

                        {/* Specs */}
                        <div className="mt-7 overflow-hidden rounded-[16px] border border-[#292D35] bg-[#191C22]">
                            {specs.map(([label, value], index) => (
                                <div
                                    key={label}
                                    className={`
                    px-4
                    py-4
                    md:grid
                    md:grid-cols-2
                    md:items-center
                    md:px-5
                    ${index !== specs.length - 1
                                            ? "border-b border-[#292D35]"
                                            : ""
                                        }
                  `}
                                >
                                    <p className="font-display text-[13px] uppercase text-[#A2A5AD]">
                                        {label}
                                    </p>

                                    <p className="mt-1 text-[15px] text-[#F0F0F1] md:mt-0">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Instructions */}
                        <div className="mt-8">
                            <h2 className="font-display text-[24px] font-medium uppercase text-[#F4F4F5]">
                                INSTRUCTIONS
                            </h2>

                            <ol className="mt-5 list-decimal space-y-3 pl-5 text-[15px] leading-[1.55] text-[#D0D1D4]">
                                {workout.instructions.map((instruction, index) => (
                                    <li key={index} className="pl-1">
                                        {instruction}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Actions — functionality comes next */}
                        <div className="mt-7 flex flex-col gap-3 md:flex-row">
                            <button
                                type="button"
                                className="
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
                  hover:brightness-90
                  md:w-auto
                "
                            >
                                <CalendarPlus size={17} strokeWidth={2} />
                                Add to today&apos;s plan
                            </button>

                            <button
                                type="button"
                                className="
                  inline-flex
                  h-[44px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#5A5E67]
                  bg-transparent
                  px-5
                  text-[14px]
                  font-medium
                  text-[#F4F4F5]
                  transition
                  hover:bg-white/[0.04]
                  md:w-auto
                "
                            >
                                <Bookmark size={16} strokeWidth={2} />
                                Save for later
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}