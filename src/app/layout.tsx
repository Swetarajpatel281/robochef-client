import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RoboChef | Turn recipes into cooking stories",
    template: "%s | RoboChef",
  },
  description:
    "Build a recipe brief and follow its transparent RoboChef demo job.",
  applicationName: "RoboChef",
  openGraph: {
    title: "RoboChef | Turn recipes into cooking stories",
    description:
      "Build a recipe brief and follow its transparent RoboChef demo job.",
    url: "/",
    siteName: "RoboChef",
    type: "website",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "RoboChef cooking studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoboChef | Turn recipes into cooking stories",
    description:
      "Build a recipe brief and follow its transparent RoboChef demo job.",
    images: ["/opengraph-image.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const content = (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {clerkPublishableKey ? (
          <ClerkProvider publishableKey={clerkPublishableKey}>
            {content}
          </ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}