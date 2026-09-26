// import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      {/* <Navbar /> */}

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

          {/* Details skeleton */}
          <div>
            {/* Title */}
            <div className="h-12 w-[75%] animate-pulse rounded-lg bg-[#191C22]" />

            {/* Description */}
            <div className="mt-5 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-[#191C22]" />
              <div className="h-4 w-[65%] animate-pulse rounded bg-[#191C22]"/>
            </div>

            {/* Tags */}
            <div className="mt-5 flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-[#191C22]" />
              <div className="h-6 w-14 animate-pulse rounded-full bg-[#191C22]" />
            </div>

            {/* Specs */}
            <div className="mt-7 overflow-hidden rounded-[16px] border border-[#292D35] bg-[#191C22]">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className={`
                    px-4
                    py-5
                    md:grid
                    md:grid-cols-2
                    md:px-5
                    ${
                      index !== 6
                        ? "border-b border-[#292D35]"
                        : ""
                    }
                  `}
                >
                  <div className="h-3 w-20 animate-pulse rounded bg-white/[0.07]" />

                  <div className="mt-2 h-4 w-28 animate-pulse rounded bg-white/[0.07] md:mt-0" />
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-9">
              <div className="h-7 w-36 animate-pulse rounded bg-[#191C22]" />

              <div className="mt-5 space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-full animate-pulse rounded bg-[#191C22]"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
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