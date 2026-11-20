import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how RoboChef is building a creative kitchen for food video.",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
