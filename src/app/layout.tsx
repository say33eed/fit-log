import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}