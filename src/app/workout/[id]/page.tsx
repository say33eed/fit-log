export default function WorkoutDetailsLoading() {
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
              aspect-[1.45/1]
              w-full
              animate-pulse
              rounded-[16px]
              bg-[#191C22]
              md:aspect-[3.15/1]
              lg:aspect-[4/5]
            "
          />

          {/* Content skeleton */}
          <div className="min-w-0">
            {/* Title */}
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-[#191C22]" />

            {/* Description */}
            <div className="mt-5 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-[#191C22]" />
              <div className="h-4 w-[90%] animate-pulse rounded bg-[#191C22]" />
            </div>

            {/* Muscle groups */}
            <div className="mt-5 flex gap-2.5">
              <div className="h-7 w-20 animate-pulse rounded-full bg-[#191C22]" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-[#191C22]" />
            </div>

            {/* Specs */}
            <div className="mt-7 overflow-hidden rounded-[16px] border border-[#292D35] bg-[#191C22]">
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
                    <div className="h-4 w-20 animate-pulse rounded bg-[#252931]" />

                    <div className="mt-2 h-4 w-28 animate-pulse rounded bg-[#252931] md:mt-0" />
                  </div>
                )
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <div className="h-7 w-40 animate-pulse rounded bg-[#191C22]" />

              <div className="mt-5 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-[#191C22]" />
                <div className="h-4 w-[95%] animate-pulse rounded bg-[#191C22]" />
                <div className="h-4 w-[85%] animate-pulse rounded bg-[#191C22]" />
                <div className="h-4 w-[90%] animate-pulse rounded bg-[#191C22]" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="h-11 w-32 animate-pulse rounded-full bg-[#191C22]" />
              <div className="h-11 w-36 animate-pulse rounded-full bg-[#191C22]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}