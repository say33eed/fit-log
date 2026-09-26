import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description:
    "A dark, no-nonsense gym companion for planning and logging workouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <WorkoutProvider>
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#191C22",
                color: "#F4F4F5",
                border: "1px solid #292D35",
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}