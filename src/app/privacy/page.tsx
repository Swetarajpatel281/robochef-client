import Link from "next/link";

export const metadata = {
  title: "Privacy policy",
  description: "How the RoboChef demo handles recipe and photo submissions.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fbf8f2] px-6 py-12 text-stone-950 sm:px-10">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-orange-700">
          ← Back to RoboChef
        </Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-orange-700">
          Privacy
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Privacy policy</h1>
        <p className="mt-4 leading-7 text-stone-600">
          This demo accepts recipe details and an uploaded photo to create a
          temporary job. The service does not currently use advertising
          cookies, analytics, or account tracking.
        </p>
        <h2 className="mt-10 text-xl font-bold">Demo data handling</h2>
        <p className="mt-3 leading-7 text-stone-600">
          Recipe submissions are processed by the configured RoboChef server.
          Photos may be stored by the configured Cloudinary account. Do not
          upload sensitive or private images to this demo.
        </p>
        <h2 className="mt-8 text-xl font-bold">Questions</h2>
        <p className="mt-3 leading-7 text-stone-600">
          A production contact address has not been configured yet. This page
          will be updated before public launch.
        </p>
      </article>
    </main>
  );
}
