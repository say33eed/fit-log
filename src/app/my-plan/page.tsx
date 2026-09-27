import { Suspense } from "react";

import MyPlanContent from "./MyPlanContent";

export default function MyPlanPage() {
  return (
    <Suspense fallback={<MyPlanLoading />}>
      <MyPlanContent />
    </Suspense>
  );
}

function MyPlanLoading() {
  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      <section className="px-4 py-8 sm:px-6 md:px-8 md:py-10 lg:py-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="h-9 w-40 animate-pulse rounded-lg bg-[#171A20]" />

          <div className="mt-3 h-4 w-[320px] max-w-full animate-pulse rounded bg-[#171A20]" />

          <div className="mt-8 h-[118px] animate-pulse rounded-[16px] border border-[#252932] bg-[#171A20]" />

          <div className="mt-8 h-[42px] animate-pulse rounded-[10px] bg-[#171A20]" />

          <div className="mt-6 space-y-3">
            <div className="h-[118px] animate-pulse rounded-[16px] border border-[#252932] bg-[#171A20]" />

            <div className="h-[118px] animate-pulse rounded-[16px] border border-[#252932] bg-[#171A20]" />
          </div>
        </div>
      </section>
    </main>
  );
}