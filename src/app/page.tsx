import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0F13] text-white">
      <Navbar />

      <Hero />

      <section id="library">
        {/* THE LIBRARY will be built here */}
      </section>
    </main>
  );
}