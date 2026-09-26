import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import Navbar from "@/components/Navbar";
import { WorkoutProvider } from "@/context/WorkoutContext";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description:
    "Build your workout plan and track your lifts with FitLog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0D0F12] text-[#F4F4F5]">
        <WorkoutProvider>
          <Navbar />

          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#171A20",
                color: "#F4F4F5",
                border: "1px solid #2A2E36",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "14px",
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}