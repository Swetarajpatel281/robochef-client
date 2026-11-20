import Link from "next/link";

export const metadata = {
  title: "Terms of use",
  description: "Terms for using the RoboChef demo.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fbf8f2] px-6 py-12 text-stone-950 sm:px-10">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-orange-700">
          ← Back to RoboChef
        </Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-orange-700">
          Terms
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Terms of use</h1>
        <p className="mt-4 leading-7 text-stone-600">
          RoboChef is currently a development demo. By using it, you
          understand that submissions are experimental and do not produce a
          real cooking video.
        </p>
        <h2 className="mt-10 text-xl font-bold">Acceptable use</h2>
        <p className="mt-3 leading-7 text-stone-600">
          Submit only recipe content and images that you are allowed to share.
          Do not use the demo for unlawful, harmful, or confidential material.
        </p>
        <h2 className="mt-8 text-xl font-bold">Availability</h2>
        <p className="mt-3 leading-7 text-stone-600">
          Demo jobs and uploaded assets may be removed or unavailable while the
          product is being developed. Production terms and contact details will
          be added before launch.
        </p>
      </article>
    </main>
  );
}
