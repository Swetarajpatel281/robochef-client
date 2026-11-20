import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbf8f2] px-6 py-16 text-center text-stone-950">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-700">
          404 / Kitchen detour
        </p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">
          This page is off the menu.
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-stone-600">
          The page you requested does not exist. Head back to the RoboChef
          kitchen and start a recipe brief.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-orange-600 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700"
        >
          Return to RoboChef
        </Link>
      </section>
    </main>
  );
}
