export default function LibraryLoading() {
  return (
    <div className="px-5 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex min-h-[180px] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#CCFF00]" />
            <span>Loading workouts…</span>
          </div>
        </div>
      </div>
    </div>
  );
}