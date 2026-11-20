import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 px-5 py-10 text-white/60 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-bold text-white">
            RoboChef<span className="text-orange-500">.</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm leading-6 text-stone-400">
            Recipe briefs today. Cooking stories tomorrow.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/create" className="min-h-11 py-3 hover:text-orange-300">Create Video</Link>
          <Link href="/about" className="min-h-11 py-3 hover:text-orange-300">About</Link>
          <Link href="/privacy" className="min-h-11 py-3 hover:text-orange-300">Privacy</Link>
          <Link href="/terms" className="min-h-11 py-3 hover:text-orange-300">Terms</Link>
        </div>
        <p className="text-xs text-stone-500">
          © RoboChef. Demo foundation.
        </p>
      </div>
    </footer>
  );
}
