"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { MouseEvent } from "react";

export default function Hero() {
  const handleBrowseWorkouts = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const library = document.getElementById("library");

    if (library) {
      library.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(
        null,
        "",
        "/#library"
      );
    }
  };

  return (
    <section
      id="hero"
      className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8"
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1200px]
          overflow-hidden
          rounded-[16px]
          border
          border-white/[0.07]
          bg-[#191C22]

          lg:min-h-[490px]
          lg:grid-cols-[1.05fr_0.95fr]
        "
      >
        {/* Hero content */}
        <div
          className="
            flex
            items-center
            px-6
            py-10

            sm:px-10
            sm:py-12

            md:px-12
            md:py-14

            lg:px-[52px]
            lg:py-16
          "
        >
          <div className="w-full">
            {/* Eyebrow */}
            <p
              className="
                font-display
                text-[12px]
                font-semibold
                uppercase
                tracking-[-0.01em]
                text-[#CCFF00]

                sm:text-[13px]
                lg:text-[14px]
              "
            >
              WORKOUT LIBRARY
            </p>

            {/* Hero heading */}
            <h1
              className="
                font-display
                mt-5
                origin-left
                scale-x-[0.92]
                font-bold
                uppercase
                leading-[1.08]
                tracking-[-0.07em]
                text-[#F4F4F5]

                text-[32px]
                min-[400px]:text-[36px]

                sm:mt-6
                sm:text-[42px]

                md:text-[48px]

                lg:mt-7
                lg:text-[46px]

                xl:text-[54px]
              "
            >
              <span className="sm:whitespace-nowrap">
                TRAIN WITH INTENT. LOG
              </span>

              <br />

              <span>EVERY SET.</span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-[510px]
                text-[14px]
                leading-[1.6]
                text-[#C1C2C5]

                sm:mt-6
                sm:text-[15px]

                lg:text-[16px]
              "
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Browse Workouts CTA */}
            <a
              href="#library"
              onClick={handleBrowseWorkouts}
              className="
                mt-6
                inline-flex
                h-[44px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#CCFF00]
                px-[18px]
                text-[13px]
                font-bold
                text-[#090B0E]
                transition
                hover:brightness-90

                sm:text-[14px]
              "
            >
              <ArrowDown
                size={17}
                strokeWidth={2.2}
                aria-hidden="true"
              />

              <span>BROWSE WORKOUTS</span>
            </a>
          </div>
        </div>

        {/* Hero artwork */}
        <div
          className="
            relative
            flex
            min-h-[300px]
            items-center
            justify-center
            px-6
            pb-8
            pt-2

            sm:min-h-[360px]
            sm:px-8
            sm:pb-10

            md:min-h-[400px]

            lg:min-h-0
            lg:px-8
            lg:py-10
          "
        >
          <Image
            src="/banner.png"
            alt="Muscular anatomy illustration using gym equipment"
            width={560}
            height={560}
            priority
            sizes="(max-width: 1023px) 90vw, 45vw"
            className="
              h-auto
              w-full
              max-w-[360px]
              object-contain

              sm:max-w-[430px]
              md:max-w-[480px]
              lg:max-w-[500px]
            "
          />
        </div>
      </div>
    </section>
  );
}