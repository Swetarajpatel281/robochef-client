import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a video brief",
  description: "Build and submit a RoboChef recipe-to-video brief.",
};

export default function CreateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
