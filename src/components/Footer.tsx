"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

export default function Footer() {
  const router = useRouter();

  const handleHomeClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    /*
     * If we're already on the homepage,
     * always scroll directly to the hero.
     *
     * This works even when the URL already
     * contains #hero, so repeated clicks
     * continue working.
     */
    if (window.location.pathname === "/") {
      const hero = document.getElementById("hero");

      if (hero) {
        hero.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.replaceState(
          null,
          "",
          "/#hero"
        );

        return;
      }

      /*
       * Fallback in case the hero element
       * cannot be found for some reason.
       */
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      window.history.replaceState(
        null,
        "",
        "/#hero"
      );

      return;
    }

    /*
     * If we're on another page such as
     * /my-plan or /workout/[id], navigate
     * back to the homepage hero.
     */
    router.push("/#hero");
  };

  return (
    <footer
      className="
        w-full
        border-t
        border-[#24272D]
        bg-[#191C22]
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[96px]
          w-full
          max-w-[1200px]
          flex-col
          items-center
          justify-center
          gap-5
          px-4
          py-7

          sm:px-5

          md:min-h-[86px]
          md:flex-row
          md:justify-between
          md:gap-6
          md:px-8
          md:py-5

          lg:px-8

          xl:px-0
        "
      >
        {/* Brand */}
        <Link
          href="/#hero"
          onClick={handleHomeClick}
          aria-label="FitLog home"
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            className="
              h-[24px]
              w-[24px]
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
              text-[#F4F4F5]
            "
          >
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p
          className="
            text-center
            text-[13px]
            leading-[1.5]
            text-[#8E929B]
            md:text-right
          "
        >
          © 2026 FitLog — Workout Library.
          Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}