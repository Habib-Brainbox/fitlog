"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiPlus, FiBookmark, FiArrowLeft } from "react-icons/fi";
import { getWorkout } from "@/lib/api";
import { Workout } from "@/types/workout";
import { usePlan, MAX_PLAN } from "@/context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { planIds, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    getWorkout(id)
      .then(setWorkout)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
        <p className="mt-4 text-gray-400">Loading workout…</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold uppercase">
          Workout not found
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-[#ccff00] px-6 py-3 font-semibold text-black"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  const planFull = planIds.length >= MAX_PLAN && !planIds.includes(workout.id);

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ccff00]"
      >
        <FiArrowLeft /> Back to workouts
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 lg:sticky lg:top-24 lg:self-start">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: info */}
        <div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-gray-400">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#ccff00]/10 px-3 py-1 text-xs font-semibold uppercase text-[#ccff00]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
            <h2 className="border-b border-white/10 px-5 py-3 font-display text-lg font-bold uppercase tracking-wide">
              Key Specs
            </h2>
            <dl>
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between border-b border-white/5 px-5 py-3 last:border-0"
                >
                  <dt className="text-sm uppercase tracking-wider text-gray-400">
                    {s.label}
                  </dt>
                  <dd className="font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-bold text-black">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-gray-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout.id)}
              disabled={planFull}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 font-semibold text-black transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiPlus /> Add to today&apos;s plan
            </button>
            <button
              onClick={() => saveForLater(workout.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              <FiBookmark /> Save for later
            </button>
          </div>
          {planFull && (
            <p className="mt-2 text-sm text-red-400">
              Today&apos;s plan is full (max {MAX_PLAN} lifts).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}