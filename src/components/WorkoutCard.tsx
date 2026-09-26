import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="
        group
        block
        overflow-hidden
        rounded-[20px]
        border
        border-[#292D35]
        bg-[#12151B]
        transition-colors
        hover:border-white/20
      "
    >
      {/* Workout image */}
      <div className="relative aspect-[1.9/1] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-7">
        {/* Muscle groups */}
        <div className="flex flex-wrap items-center gap-2.5">
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

        {/* Workout information */}
        <h3
          className="
            font-display
            mt-6
            text-[22px]
            font-semibold
            uppercase
            leading-none
            text-[#F4F4F5]
          "
        >
          {workout.name}
        </h3>

        <p className="mt-3 text-[14px] leading-none text-[#81848C]">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-[#262A31]" />

        {/* Stats */}
        <div className="flex items-center gap-7 text-[14px] text-[#92959D]">
          <span className="flex items-center gap-2">
            <Clock3 size={17} strokeWidth={2} />
            <span>{workout.duration} min</span>
          </span>

          <span className="flex items-center gap-2">
            <Flame size={17} strokeWidth={2} fill="currentColor"/>
            <span>{workout.caloriesBurned} kcal</span>
          </span>

          <span className="flex items-center gap-2">
            <Star size={18} strokeWidth={2} />
            <span>{workout.rating}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}