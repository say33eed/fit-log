import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        flex
        min-h-[calc(100vh-70px)]
        items-center
        justify-center
        px-5
        py-12
        sm:px-6
        lg:px-8
      "
    >
      <section className="flex w-full max-w-[620px] flex-col items-center text-center">
        {/* Illustration card */}
        <div
          className="
            flex
            h-[270px]
            w-full
            max-w-[390px]
            items-center
            justify-center
            rounded-[28px]
            bg-[#191C22]
            p-7
            sm:h-[300px]
            sm:max-w-[420px]
          "
        >
          {/* Inner illustration area */}
          <div
            className="
              relative
              flex
              h-full
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-[20px]
              border
              border-[#343943]
              bg-[#0D0F12]
            "
          >
            {/* Barbell */}
            <div
              className="
                relative
                flex
                w-[82%]
                items-center
                justify-center
              "
              aria-hidden="true"
            >
              {/* Left weight */}
              <div className="relative z-10 h-[94px] w-[94px] shrink-0 rounded-full border-[6px] border-[#CCFF00] sm:h-[104px] sm:w-[104px]">
                {/* Left outer sleeve */}
                <span
                  className="
                    absolute
                    left-[-12px]
                    top-1/2
                    h-[44px]
                    w-[17px]
                    -translate-y-1/2
                    rounded-[4px]
                    bg-[#F4F4F5]
                  "
                />

                {/* Left inner connection */}
                <span
                  className="
                    absolute
                    right-[-17px]
                    top-1/2
                    h-[22px]
                    w-[21px]
                    -translate-y-1/2
                    rounded-[5px]
                    bg-[#CCFF00]
                  "
                />
              </div>

              {/* Bar */}
              <div
                className="
                  relative
                  z-20
                  h-[22px]
                  flex-1
                  bg-[#CCFF00]
                "
              />

              {/* Right weight */}
              <div className="relative z-10 h-[94px] w-[94px] shrink-0 rounded-full border-[6px] border-[#CCFF00] sm:h-[104px] sm:w-[104px]">
                {/* Right inner connection */}
                <span
                  className="
                    absolute
                    left-[-17px]
                    top-1/2
                    h-[22px]
                    w-[21px]
                    -translate-y-1/2
                    rounded-[5px]
                    bg-[#CCFF00]
                  "
                />

                {/* Right outer sleeve */}
                <span
                  className="
                    absolute
                    right-[-12px]
                    top-1/2
                    h-[44px]
                    w-[17px]
                    -translate-y-1/2
                    rounded-[4px]
                    bg-[#F4F4F5]
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* 404 title */}
        <h1
          className="
            font-display
            mt-8
            text-[32px]
            font-medium
            uppercase
            leading-[1.1]
            tracking-[0.01em]
            text-[#F4F4F5]
            sm:text-[38px]
            lg:text-[40px]
          "
        >
          404 — MISSED THAT LIFT
        </h1>

        {/* Description */}
        <p
          className="
            mt-6
            max-w-[500px]
            text-[15px]
            leading-[1.6]
            text-[#A3A6AD]
            sm:text-[16px]
          "
        >
          The page you wanted is not in the library. Head back to
          the floor and pick a workout that exists.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="
            mt-7
            inline-flex
            h-[44px]
            items-center
            justify-center
            rounded-full
            bg-[#CCFF00]
            px-6
            text-[14px]
            font-bold
            text-[#090B0E]
            transition
            hover:brightness-90
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#CCFF00]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0D0F12]
          "
        >
          Back to workouts
        </Link>
      </section>
    </main>
  );
}