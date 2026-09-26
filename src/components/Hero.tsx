import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="px-5 pt-8 sm:px-6 lg:px-8">
            <div
                className="
          mx-auto
          grid
          min-h-[490px]
          max-w-[1200px]
          overflow-hidden
          rounded-[16px]
          border
          border-white/[0.07]
          bg-[#191C22]
          lg:grid-cols-[1.05fr_0.95fr]
        "
            >
                {/* Hero*/}
                <div className="flex items-center px-8 py-14 sm:px-12 lg:px-[52px] lg:py-16">
                    <div>
                        <p className="font-display text-[14px] font-semibold uppercase tracking-[-0.01em] text-[#CCFF00]">
                            WORKOUT LIBRARY
                        </p>

                        <h1
                            className="
                font-display
                mt-7
                max-w-[550px]
                text-[48px]
                font-medium
                uppercase
                leading-[1.08]
                tracking-[0.01em]
                text-[#F4F4F5]
                sm:text-[48px]
                lg:text-[54px]
              "
                        >
                            TRAIN WITH INTENT. LOG
                            <br className="hidden lg:block" />
                            {" "}EVERY SET.
                        </h1>

                        <p className="mt-6 max-w-[510px] text-[16px] leading-[1.6] text-[#C1C2C5]">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                        </p>

                        <Link
                            href="#library"
                            className="
                mt-6
                inline-flex
                h-[44px]
                items-center
                justify-center
                rounded-xl
                bg-[#CCFF00]
                px-[18px]
                text-[14px]
                font-bold
                text-[#090B0E]
                transition
                hover:brightness-90
              "
                        >
                            Browse Workouts
                        </Link>
                    </div>
                </div>

                {/* Hero artwork */}
                <div className="relative flex min-h-[400px] items-center justify-center px-6 py-8 lg:min-h-0 lg:px-8 lg:py-10">
                    <Image
                        src="/banner.png"
                        alt="Muscular anatomy illustration using gym equipment"
                        width={560}
                        height={560}
                        priority
                        className="h-auto w-full max-w-[500px] object-contain"
                    />
                </div>
            </div>
        </section>
    );
}