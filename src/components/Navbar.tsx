"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";

const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const links = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create Video" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#130d18]/70 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="RoboChef home">
          <span className="grid h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-300 to-rose-500 text-lg font-bold text-white shadow-lg shadow-orange-600/20 place-items-center">
            R
          </span>
          <span className="font-bold tracking-tight text-white">RoboChef</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/60 transition hover:text-orange-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {hasClerkKey ? (
          <div className="flex items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="hidden min-h-11 rounded-full px-3 py-2 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-orange-200 sm:block"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="min-h-11 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-orange-500/20"
                >
                  Get started
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        ) : (
          <Link
            href="/create"
            className="min-h-11 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-orange-500/20"
          >
            Get started
          </Link>
        )}
      </nav>
      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full border border-white/15 bg-white/10 p-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="min-h-11 whitespace-nowrap rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/65 transition hover:bg-white/10 hover:text-orange-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
