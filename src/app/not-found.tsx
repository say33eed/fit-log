import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1E1E1E] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>

        <p className="mt-4 text-lg text-white/60">
          Page not found
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-[#CCFF00] px-6 py-3 font-semibold text-black"
        >
          GO HOME
        </Link>
      </div>
    </main>
  );
}