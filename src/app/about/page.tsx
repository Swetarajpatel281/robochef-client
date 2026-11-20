import Link from "next/link";

const architecture = [
  ["01", "Recipe intelligence", "A structured brief captures the ingredients, intent, and visual direction behind every dish."],
  ["02", "n8n orchestration", "The workflow layer connects each job to future generation, review, and delivery steps."],
  ["03", "Cloudinary assets", "Uploaded photos are stored in a dedicated media layer ready for reliable production workflows."],
  ["04", "Identity consistency", "The architecture is designed to keep a creator's visual language consistent across every story."],
];

export default function AboutPage() {
  return (
    <main className="bg-[#fbf8f2] text-stone-950">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700">About RoboChef</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.7fr]">
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-7xl">
            A creative kitchen for the
            <span className="text-orange-600"> AI video era.</span>
          </h1>
          <p className="self-end text-lg leading-8 text-stone-600">
            RoboChef is building the bridge between a recipe in your head and a
            visual story your audience can feel. This foundation keeps the
            creative process human, transparent, and ready to evolve.
          </p>
        </div>
      </section>

      <section className="bg-stone-950 px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">Under the hood</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Designed as a system, not a shortcut.</h2>
            <p className="mt-5 leading-7 text-stone-400">Every layer has a clear job today, with room for generation, audio, and production automation tomorrow.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {architecture.map(([number, title, copy]) => (
              <article key={number} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 transition hover:-translate-y-1 hover:border-orange-400/50 hover:bg-white/[0.1]">
                <span className="text-sm font-bold text-orange-400">{number}</span>
                <h3 className="mt-10 text-2xl font-bold">{title}</h3>
                <p className="mt-3 max-w-md leading-7 text-stone-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="rounded-[2rem] bg-orange-600 p-8 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-100">Today / Demo foundation</p>
            <p className="mt-8 text-5xl font-bold">One brief.</p>
            <p className="text-5xl font-bold text-orange-100">Many futures.</p>
            <p className="mt-6 leading-7 text-orange-50">The current experience validates the input, uploads the image, persists the job, and tracks the workflow.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700">What comes next</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">A thoughtful path from idea to finished frame.</h2>
            <p className="mt-5 leading-7 text-stone-600">AI generation, voice, editing, and delivery are intentionally future layers. The core stays simple: your recipe, your direction, your story.</p>
            <Link href="/create" className="mt-8 inline-flex rounded-full bg-stone-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-700">Start with a brief ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
