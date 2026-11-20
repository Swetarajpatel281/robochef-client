"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { JobStatusData } from "../components/JobStatusPanel";

const JobStatusPanel = dynamic(() => import("../components/JobStatusPanel"), {
  loading: () => (
    <aside className="min-h-96 animate-pulse rounded-[2rem] bg-orange-100/70 p-6 sm:p-9" />
  ),
});

type Job = JobStatusData;
type JobResponse = { success: true; jobId: string };
type JobStatusResponse = { success: true; job: Job };
type ApiError = { error?: { message?: string } };

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;

function getErrorMessage(payload: unknown, fallback: string) {
  if (typeof payload === "object" && payload !== null && "error" in payload) {
    const error = (payload as ApiError).error;
    if (typeof error?.message === "string") return error.message;
  }
  return fallback;
}

export default function CreatePage() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoInputKey, setPhotoInputKey] = useState(0);
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const pollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollDeadline = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (pollTimeout.current) clearTimeout(pollTimeout.current);
    if (pollDeadline.current) clearTimeout(pollDeadline.current);
  }, []);

  useEffect(() => () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
  }, [photoPreview]);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedPhoto = event.target.files?.[0];
    if (!selectedPhoto) return;
    if (!["image/jpeg", "image/png"].includes(selectedPhoto.type)) {
      setError("Choose a JPEG or PNG photo.");
      setPhoto(null);
      setPhotoPreview("");
      setPhotoInputKey((key) => key + 1);
      return;
    }
    if (selectedPhoto.size > 5 * 1024 * 1024) {
      setError("Photo must be 5 MB or smaller.");
      setPhoto(null);
      setPhotoPreview("");
      setPhotoInputKey((key) => key + 1);
      return;
    }
    setError("");
    setPhoto(selectedPhoto);
    setPhotoPreview(URL.createObjectURL(selectedPhoto));
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview("");
    setPhotoInputKey((key) => key + 1);
  }

  function createAnotherRecipe() {
    if (pollTimeout.current) {
      clearTimeout(pollTimeout.current);
      pollTimeout.current = null;
    }
    if (pollDeadline.current) {
      clearTimeout(pollDeadline.current);
      pollDeadline.current = null;
    }
    setRecipeName("");
    setIngredients("");
    setInstructions("");
    setPhoto(null);
    setPhotoPreview("");
    setPhotoInputKey((key) => key + 1);
    setJob(null);
    setError("");
    setIsPolling(false);
  }

  async function pollJob(jobId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`);
      const payload = (await response.json()) as JobStatusResponse | ApiError;
      if (!response.ok) throw new Error(getErrorMessage(payload, "Unable to retrieve job status."));
      const updatedJob = (payload as JobStatusResponse).job;
      setJob(updatedJob);
      if (updatedJob.status === "completed" || updatedJob.status === "failed") {
        if (pollTimeout.current) {
          clearTimeout(pollTimeout.current);
          pollTimeout.current = null;
        }
        if (pollDeadline.current) {
          clearTimeout(pollDeadline.current);
          pollDeadline.current = null;
        }
        setIsPolling(false);
        return;
      }
      pollTimeout.current = setTimeout(() => void pollJob(jobId), POLL_INTERVAL_MS);
    } catch (pollError) {
      setIsPolling(false);
      setError(pollError instanceof Error ? pollError.message : "Unable to retrieve job status.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isPolling) return;
    setError("");
    setJob(null);
    setIsSubmitting(true);
    const trimmedRecipeName = recipeName.trim();
    const trimmedIngredients = ingredients.trim();
    if (!trimmedRecipeName || !trimmedIngredients || !photo) {
      setError(!photo ? "Add a JPEG or PNG photo before submitting." : "Enter a recipe name and at least one ingredient.");
      setIsSubmitting(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("recipeName", trimmedRecipeName);
      formData.append("ingredients", trimmedIngredients);
      formData.append("instructions", instructions.trim());
      formData.append("photo", photo);
      console.log("[RoboChef] Submitting recipe to API", {
        apiUrl: `${API_BASE_URL}/api/recipes`,
        recipeName: trimmedRecipeName,
        hasPhoto: Boolean(photo),
      });
      const response = await fetch(`${API_BASE_URL}/api/recipes`, { method: "POST", body: formData });
      console.log("[RoboChef] Recipe API response received", {
        status: response.status,
        ok: response.ok,
      });
      const payload = (await response.json()) as JobResponse | ApiError;
      console.log("[RoboChef] Recipe API response parsed", payload);
      if (!response.ok) throw new Error(getErrorMessage(payload, "Unable to submit the recipe."));
      const createdJob = payload as JobResponse;
      setJob({
        jobId: createdJob.jobId,
        recipeName: trimmedRecipeName,
        status: "pending",
        videoUrl: null,
        userPhotoUrl: photoPreview,
      });
      setIsPolling(true);
      pollDeadline.current = setTimeout(() => {
        if (pollTimeout.current) clearTimeout(pollTimeout.current);
        setIsPolling(false);
        setError("This job has exceeded the five-minute processing limit. Please try again.");
      }, POLL_TIMEOUT_MS);
      void pollJob(createdJob.jobId);
    } catch (submitError) {
      console.error("[RoboChef] Recipe submission failed", submitError);
      setError(
        submitError instanceof TypeError && submitError.message === "Failed to fetch"
          ? `Cannot reach the RoboChef API at ${API_BASE_URL}. Start the server with "npm run dev" inside the server folder.`
          : submitError instanceof Error
            ? submitError.message
            : "Unable to submit the recipe.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbf8f2] px-5 py-12 text-stone-950 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700">Studio / Create</p>
          <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            Give your dish
            <span className="block text-orange-600">a point of view.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Build a creative recipe brief. Your submission will be uploaded,
            saved, and sent through the RoboChef demo workflow.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_-35px_rgba(74,54,30,0.35)] sm:p-9">
            <div className="mb-8 flex items-start justify-between border-b border-stone-100 pb-6">
              <div>
                <p className="text-xl font-bold tracking-tight">Recipe brief</p>
                <p className="mt-1 text-sm text-stone-500">Step 01 · Tell the studio what you are cooking.</p>
              </div>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">Demo</span>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Recipe name</span>
                <input value={recipeName} onChange={(event) => setRecipeName(event.target.value)} placeholder="e.g. Palak Paneer" maxLength={120} required className="w-full rounded-2xl border border-stone-200 bg-stone-50/60 px-4 py-3.5 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Ingredients and quantities</span>
                <textarea value={ingredients} onChange={(event) => setIngredients(event.target.value)} placeholder={"200 g paneer\n2 cups spinach\n1 onion\n1 tbsp oil"} rows={6} maxLength={5000} required className="w-full resize-y rounded-2xl border border-stone-200 bg-stone-50/60 px-4 py-3.5 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Cooking instructions <span className="font-normal text-stone-500">· optional</span></span>
                <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} placeholder="Describe the cooking steps, if available..." rows={5} maxLength={10000} className="w-full resize-y rounded-2xl border border-stone-200 bg-stone-50/60 px-4 py-3.5 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              </label>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="photo" className="text-sm font-bold">Portrait photo</label>
                  <span className="text-xs text-stone-500">JPEG or PNG · max 5 MB</span>
                </div>
                {photoPreview ? (
                  <div className="flex items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50/60 p-3">
                    <Image src={photoPreview} alt="Selected recipe photo preview" width={80} height={80} unoptimized className="h-20 w-20 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{photo?.name}</p><p className="mt-1 text-xs text-stone-500">Photo ready to upload</p></div>
                    <button type="button" onClick={removePhoto} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-bold text-stone-700 hover:border-orange-300 hover:text-orange-700">Change</button>
                  </div>
                ) : (
                  <label htmlFor="photo" className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/60 px-4 py-8 text-center transition hover:border-orange-400 hover:bg-orange-50/50">
                    <span className="text-sm font-bold text-stone-700">Drop in a portrait photo</span>
                    <span className="mt-1 text-xs text-stone-500">Clear, bright, and ready for the studio</span>
                  </label>
                )}
                <input key={photoInputKey} id="photo" type="file" accept="image/jpeg,image/png" onChange={handlePhotoChange} className="sr-only" />
              </div>
            </div>

            {error && <p role="alert" className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isSubmitting || isPolling} className="mt-7 w-full rounded-2xl bg-stone-950 px-5 py-4 font-bold text-white shadow-lg shadow-stone-950/10 transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Sending to studio..." : isPolling ? "Following your job..." : "Create demo video brief ↗"}
            </button>
            <p className="mt-4 text-center text-xs text-stone-500">No real video is generated in this demo foundation.</p>
          </form>

          <JobStatusPanel job={job} onCreateAnother={createAnotherRecipe} />
        </div>
      </div>
    </main>
  );
}
