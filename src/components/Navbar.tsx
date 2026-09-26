"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const { plan, saved, isLoaded } = useWorkout();

  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const isWorkouts =
    pathname === "/" ||
    pathname.startsWith("/workout/");

  const isMyPlan =
    pathname === "/my-plan";

  /*
   * Keep server/client hydration identical.
   * localStorage-backed counts appear only
   * after the provider has hydrated.
   */
  const planCount = isLoaded
    ? plan.length
    : 0;

  const savedCount = isLoaded
    ? saved.length
    : 0;

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[#24272D]
        bg-[#0D0F12]/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          h-[70px]
          w-full
          max-w-[1200px]
          items-center
          px-4
          sm:px-5
          md:px-8
          lg:px-8
          xl:px-0
        "
      >
        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (open) => !open
            )
          }
          className={`
            mr-3
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            text-[#C9CBD0]
            transition-colors
            lg:hidden

            ${
              menuOpen
                ? "border-[#D5D5D5]"
                : "border-transparent hover:bg-[#1B1E24]"
            }
          `}
        >
          <Menu
            size={21}
            strokeWidth={2}
          />
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={26}
            height={26}
            priority
            className="
              h-[26px]
              w-[26px]
              object-contain
            "
          />

          <span
            className="
              font-display
              text-[20px]
              font-medium
              uppercase
              leading-none
              tracking-[-0.02em]
              text-[#F3F3F4]
            "
          >
            FITLOG
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-1
            lg:flex
          "
        >
          <Link
            href="/"
            className={`
              rounded-full
              px-4
              py-2
              text-[14px]
              transition-colors

              ${
                isWorkouts
                  ? "bg-[#171A20] font-semibold text-[#CCFF00]"
                  : "text-[#F1F1F2] hover:bg-[#171A20] hover:text-[#CCFF00]"
              }
            `}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`
              rounded-full
              px-4
              py-2
              text-[14px]
              transition-colors

              ${
                isMyPlan
                  ? "bg-[#171A20] font-semibold text-[#CCFF00]"
                  : "text-[#F1F1F2] hover:bg-[#171A20] hover:text-[#CCFF00]"
              }
            `}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div
          className="
            ml-auto
            flex
            items-center
            gap-1
            sm:gap-2
          "
        >
          <Link
            href="/my-plan"
            className="
              flex
              h-10
              items-center
              gap-2
              rounded-full
              px-2.5
              text-[13px]
              text-[#F1F1F2]
              transition-colors
              hover:bg-[#171A20]
              sm:px-3
            "
          >
            <span>Plan</span>

            <span
              className="
                flex
                h-[25px]
                min-w-[25px]
                items-center
                justify-center
                rounded-full
                bg-[#CCFF00]
                px-1.5
                text-[11px]
                font-bold
                text-black
              "
            >
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="
              flex
              h-10
              items-center
              gap-2
              rounded-full
              px-2.5
              text-[13px]
              text-[#F1F1F2]
              transition-colors
              hover:bg-[#171A20]
              sm:px-3
            "
          >
            <span>Saved</span>

            <span
              className="
                flex
                h-[25px]
                min-w-[25px]
                items-center
                justify-center
                rounded-full
                border
                border-[#A4A6AB]
                px-1.5
                text-[11px]
                font-medium
                text-white
              "
            >
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav
            className="
              absolute
              left-4
              top-[58px]
              w-[208px]
              overflow-hidden
              rounded-2xl
              border
              border-[#24272D]
              bg-[#171A20]
              p-2
              py-2
              shadow-xl
              sm:left-5
              md:left-8
              lg:hidden
            "
          >
            <Link
              href="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                block
                rounded-full
                px-4
                py-2
                text-[13px]
                text-[#F1F1F2]
                transition-colors
                hover:bg-white/5
              "
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                block
                rounded-full
                px-4
                py-2
                text-[13px]
                text-[#F1F1F2]
                transition-colors
                hover:bg-white/5
              "
            >
              My Plan
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}