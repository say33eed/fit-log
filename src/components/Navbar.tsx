"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
    const { plan, saved } = useWorkout();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const isWorkouts = pathname === "/";
    const isMyPlan = pathname === "/my-plan";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#24272d] bg-[#0d0f12]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-[70px] max-w-[1200px] items-center px-4 sm:px-5 lg:px-0">
                {/* Mobile hamburger */}
                <button
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[#c9cbd0] transition-colors lg:hidden ${
                        menuOpen
                            ? "border-[#d5d5d5]"
                            : "border-transparent hover:bg-[#1b1e24]"
                    }`}
                >
                    <Menu size={21} strokeWidth={2} />
                </button>

                {/* Brand */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="FitLog"
                        width={26}
                        height={26}
                        priority
                        className="h-[26px] w-[26px] object-contain"
                    />

                    <span className="font-display text-[20px] font-medium uppercase leading-none tracking-[-0.02em] text-[#f3f3f4]">
                        FITLOG
                    </span>
                </Link>

                {/* Desktop navigation */}
                <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
                    <Link
                        href="/"
                        className={`rounded-4xl px-4 py-2 text-[14px] transition-colors ${
                            isWorkouts
                                ? "bg-[#171a20] font-semibold text-[#ccff00]"
                                : "text-[#f1f1f2] hover:bg-[#171a20]"
                        }`}
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-4xl px-4 py-2 text-[14px] transition-colors ${
                            isMyPlan
                                ? "bg-[#171a20] font-semibold text-[#ccff00]"
                                : "text-[#f1f1f2] hover:bg-[#171a20]"
                        }`}
                    >
                        My Plan
                    </Link>
                </nav>

                {/* Plan / Saved counters */}
                <div className="ml-auto flex items-center gap-1 sm:gap-2">
                    <Link
                        href="/my-plan"
                        className="flex h-10 items-center gap-2 rounded-4xl px-2.5 text-[13px] text-[#f1f1f2] transition-colors hover:bg-[#171a20] sm:px-3"
                    >
                        <span>Plan</span>

                        <span className="flex h-[25px] min-w-[25px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex h-10 items-center gap-2 rounded-4xl px-2.5 text-[13px] text-[#f1f1f2] transition-colors hover:bg-[#171a20] sm:px-3"
                    >
                        <span>Saved</span>

                        <span className="flex h-[25px] min-w-[25px] items-center justify-center rounded-full border border-[#a4a6ab] px-1.5 text-[11px] font-medium text-white">
                            {saved.length}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <nav className="absolute left-4 top-[58px] w-[208px] overflow-hidden rounded-2xl border border-[#24272d] bg-[#171a20]/95 p-2 py-2 shadow-xl backdrop-blur-xl lg:hidden">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-4xl px-4 py-2 text-[13px] text-[#f1f1f2] transition-colors hover:bg-white/5"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-4xl px-4 py-2 text-[13px] text-[#f1f1f2] transition-colors hover:bg-white/5"
                    >
                        My Plan
                    </Link>
                </nav>
            )}
        </header>
    );
}