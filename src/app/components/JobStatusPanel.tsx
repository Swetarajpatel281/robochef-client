"use client";

import { memo } from "react";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export type JobStatusData = {
  jobId: string;
  status: JobStatus;
  recipeName: string;
  videoUrl: string | null;
  userPhotoUrl: string;
  createdAt?: string | null;
};

type Props = {
  job: JobStatusData | null;
  onCreateAnother: () => void;
};

function JobStatusPanel({ job, onCreateAnother }: Props) {
  return (
    <aside
      aria-live="polite"
      className="relative overflow-hidden rounded-[2rem] border border-orange-200/80 bg-[#f7e9d8] p-6 sm:p-9"
    >
      <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border-[24px] border-orange-300/30" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-700">
          Your kitchen queue
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">Job status</h2>
        {job ? (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-stone-500">Recipe</p>
              <p className="font-semibold">{job.recipeName}</p>
            </div>
            <div>
              <p className="text-sm text-stone-500">Status</p>
              {job.status === "completed" && job.videoUrl ? (
                <span className="mt-2 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold capitalize text-emerald-800">
                  Completed
                </span>
              ) : (
                <p className="text-3xl font-bold capitalize text-orange-800">
                  {job.status}
                </p>
              )}
            </div>
            <div className="space-y-3 rounded-2xl border border-orange-200 bg-white/50 p-4">
              <ProgressStep
                label="Recipe Received"
                state="done"
              />
              <ProgressStep
                label="AI Script & Voiceover Generation"
                state={
                  job.status === "pending"
                    ? "in-progress"
                    : job.status === "failed"
                      ? "failed"
                      : "done"
                }
              />
              <ProgressStep
                label="Face-Personalized Video Render"
                state={
                  job.status === "processing"
                    ? "in-progress"
                    : job.status === "completed"
                      ? "done"
                      : job.status === "failed"
                        ? "failed"
                        : "waiting"
                }
              />
            </div>
            <p className="break-all text-xs text-stone-500">
              Job ID: {job.jobId}
            </p>
            <p className="text-sm text-stone-600">
              Video link:{" "}
              {job.videoUrl ? (
                <a
                  href={job.videoUrl}
                  className="font-medium text-orange-800 underline"
                >
                  View video
                </a>
              ) : (
                "not available yet"
              )}
            </p>
            {job.status === "completed" && job.videoUrl && (
              <div className="mt-4 space-y-3">
                <video
                  autoPlay
                  className="w-full rounded-2xl shadow-xl"
                  controls
                  playsInline
                  preload="metadata"
                  src={job.videoUrl}
                >
                  Your browser does not support video playback.
                </video>
                <a
                  href={job.videoUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm font-bold text-orange-800 transition hover:border-orange-500 hover:bg-orange-50"
                >
                  Download Video
                </a>
                <button
                  type="button"
                  onClick={onCreateAnother}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
                >
                  Create New Recipe
                </button>
              </div>
            )}
            <p className="break-all text-xs text-stone-500">
              Uploaded photo: {job.userPhotoUrl}
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-orange-200 bg-white/45 p-4">
            <p className="text-sm leading-6 text-stone-600">
              Submit a recipe to see its API-backed job appear here.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

function ProgressStep({
  label,
  state,
}: {
  label: string;
  state: "done" | "in-progress" | "waiting" | "failed";
}) {
  const stateLabel = {
    done: "Done",
    "in-progress": "In Progress",
    waiting: "Waiting",
    failed: "Failed",
  }[state];
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-semibold text-stone-700">{label}</span>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
          state === "done"
            ? "bg-emerald-100 text-emerald-800"
            : state === "failed"
              ? "bg-red-100 text-red-800"
              : state === "in-progress"
                ? "bg-orange-100 text-orange-800"
                : "bg-stone-100 text-stone-500"
        }`}
      >
        {stateLabel}
      </span>
    </div>
  );
}

export default memo(JobStatusPanel);
