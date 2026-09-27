import WorkoutLibraryClient from "@/components/WorkoutLibraryClient";
import { getWorkouts } from "@/lib/api";

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <section className="px-5 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Section heading */}
        {/* <div className="mb-8">
          <h2
            className="
              font-display
              text-[30px]
              font-semibold
              uppercase
              leading-none
              text-[#F4F4F5]
            "
          >
            THE LIBRARY
          </h2>

          <p className="mt-2 text-[13px] text-white/45">
            Twelve lifts covering every major muscle group.
          </p>
        </div> */}

        <WorkoutLibraryClient workouts={workouts} />
      </div>
    </section>
  );
}