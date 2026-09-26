import { Suspense } from "react";

import Hero from "@/components/Hero";
// import Navbar from "@/components/Navbar";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import LibraryLoading from "@/components/LibraryLoading";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      {/* <Navbar /> */}

      <Hero />

      <section id="library" className="scroll-mt-6">
        <Suspense fallback={<LibraryLoading />}>
          <WorkoutLibrary />
        </Suspense>
      </section>
    </main>
  );
}