export default function Loading() {
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
          {/* Image skeleton */}
          <div
            className="
              relative
              aspect-[1.45/1]
              w-full
              animate-pulse
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
          />

          {/* Workout details skeleton */}
          <div className="min-w-0">
            {/* Title */}
            <div
              className="
                h-[38px]
                w-[75%]
                animate-pulse
                rounded-lg
                bg-[#191C22]
                sm:h-[44px]
                lg:h-[50px]
              "
            />

            {/* Description */}
            <div className="mt-5 space-y-2">
              <div className="h-[17px] w-full animate-pulse rounded bg-[#191C22]" />

              <div className="h-[17px] w-[65%] animate-pulse rounded bg-[#191C22]" />
            </div>

            {/* Muscle groups */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="h-[23px] w-[72px] animate-pulse rounded-full bg-[#191C22]" />

              <div className="h-[23px] w-[64px] animate-pulse rounded-full bg-[#191C22]" />
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
              {Array.from({ length: 7 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className={`
                      px-4
                      py-4
                      md:grid
                      md:grid-cols-2
                      md:items-center
                      md:px-5

                      ${
                        index !== 6
                          ? "border-b border-[#292D35]"
                          : ""
                      }
                    `}
                  >
                    {/* Spec label */}
                    <div className="flex items-center gap-2.5">
                      {/* Icon */}
                      <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-white/[0.07]" />

                      {/* Label */}
                      <div className="h-[13px] w-20 animate-pulse rounded bg-white/[0.07]" />
                    </div>

                    {/* Spec value */}
                    <div
                      className="
                        mt-2
                        h-[14px]
                        w-28
                        animate-pulse
                        rounded
                        bg-white/[0.07]
                        md:mt-0
                      "
                    />
                  </div>
                )
              )}
            </div>

            {/* Instructions */}
            <div className="mt-9">
              {/* Instructions heading */}
              <div className="h-[27px] w-36 animate-pulse rounded bg-[#191C22]" />

              {/* Instruction rows */}
              <div className="mt-5 space-y-4">
                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      {/* Number circle */}
                      <div
                        className="
                          h-7
                          w-7
                          shrink-0
                          animate-pulse
                          rounded-full
                          bg-[#191C22]
                        "
                      />

                      {/* Instruction text */}
                      <div className="min-w-0 flex-1 pt-[2px]">
                        <div className="h-[15px] w-full animate-pulse rounded bg-[#191C22]" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-7 flex flex-col gap-3 md:flex-row">
              <div className="h-11 w-full animate-pulse rounded-xl bg-[#191C22] md:w-44" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-[#191C22] md:w-36" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}