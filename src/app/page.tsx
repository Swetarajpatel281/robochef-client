import Image from "next/image";
import Link from "next/link";

const steps = [
  [
    "01",
    "Bring your recipe",
    "Share ingredients, instructions, and a photo that gives your dish personality.",
  ],
  [
    "02",
    "Shape the story",
    "RoboChef organizes your brief into a production-ready creative direction.",
  ],
  [
    "03",
    "Watch the queue",
    "Follow every step through a transparent, API-backed job status panel.",
  ],
  [
    "04",
    "Make it memorable",
    "Your future cooking video pipeline starts with a clear, beautiful brief.",
  ],
];

const demos = [
  {
    title: "Golden hour pasta",
    tag: "Comfort / 00:42",
    image: "/golden_hour_pasta.jpg",
  },
  {
    title: "Street-style ramen",
    tag: "Bold / 01:08",
    image: "/street_ramen.png",
  },
  {
    title: "Green garden bowl",
    tag: "Fresh / 00:54",
    image: "/Garden-greens-power-bowl.jpg",
  },
];

export default function Home() {
  return (
    <main className="mesh-background min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="relative">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
            Recipe to story / 01
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Your recipe.
            <span className="block bg-gradient-to-r from-orange-200 via-rose-300 to-amber-100 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
            RoboChef turns the recipes you love into cinematic cooking stories.
            Start with a brief, follow a real job, and build toward the future
            of food content.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/create"
              className="min-h-12 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:shadow-orange-400/30"
            >
              Create your video brief <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/about"
              className="glass-panel min-h-12 rounded-full px-6 py-3.5 text-sm font-bold text-white/85 transition hover:border-orange-300/70 hover:text-white"
            >
              Explore the kitchen
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-white/50">
            <span>
              <strong className="text-white">4 steps</strong> to a brief
            </span>
            <span>
              <strong className="text-white">5 MB</strong> photo upload
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl ambient-float">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-orange-200/30" />
          <div className="gradient-border glass-panel relative overflow-hidden rounded-[2rem] p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] ">
              <Image
                src="/cutting_veg.avif"
                alt="making the meals" 
                fill
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-800">
                    Preview / 00:42
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    The making of a meal
                  </h2>
                </div>
                <span
                  className="grid h-14 w-14 min-h-12 place-items-center rounded-full bg-white text-xl text-stone-950 shadow-xl transition hover:scale-105"
                  aria-label="Demo preview"
                >
                  ▶
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-4 text-xs text-white/45">
              <span>RoboChef studio preview</span>
              <span className="text-orange-300">Demo mode</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
                The workflow / 02
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                From pantry to production.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/50">
              A calm, clear process for turning your best food ideas into visual
              stories.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, copy]) => (
              <article
                key={number}
                className="gradient-border glass-panel glass-panel-hover rounded-3xl p-6"
              >
                <span className="text-sm font-bold text-orange-300">
                  {number}
                </span>
                <h3 className="mt-12 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>
                <span className="mt-7 block text-xl text-white/25 transition group-hover:text-orange-300">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
              In the studio / 03
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Stories worth sharing.
            </h2>
          </div>
          <span className="text-sm text-white/45">
            Concept previews · No real video generated yet
          </span>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {demos.map((demo) => (
            <article
              key={demo.title}
              className="gradient-border glass-panel glass-panel-hover group overflow-hidden rounded-[1.75rem] p-2 text-white"
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-[1.35rem] `}
              >
                <Image
                  src={demo.image}
                  alt={demo.title}
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,.45),transparent_18%),linear-gradient(140deg,transparent_35%,rgba(0,0,0,.5))]" /> */}
                <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                  Preview
                </span>
                <span className="absolute bottom-5 left-5 grid h-12 w-12 min-h-12 place-items-center rounded-full bg-white text-stone-950 transition group-hover:scale-110">
                  ▶
                </span>
                <div className="absolute bottom-5 right-5 text-right">
                  <p className="text-xs text-white/70">{demo.tag}</p>
                  <h3 className="mt-1 font-bold">{demo.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gradient-border glass-panel mx-5 mb-20 overflow-hidden rounded-[2rem] px-7 py-12 sm:mx-8 sm:px-12 lg:mx-auto lg:max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
              The bigger picture / 04
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Built for the next generation of food creators.
            </h2>
          </div>
          <Link
            href="/about"
            className="min-h-12 w-fit rounded-full bg-white px-6 py-3.5 text-sm font-bold text-rose-700 transition hover:bg-orange-50"
          >
            See how it works ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
