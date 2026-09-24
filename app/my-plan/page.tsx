"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiCheck, FiX, FiEye } from "react-icons/fi";
import { FaFire, FaStar } from "react-icons/fa";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("plan");

  const {
    planIds,
    savedIds,
    doneIds,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = usePlan();

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pick = (ids: number[]) =>
    ids
      .map((id) => workouts.find((w) => w.id === id))
      .filter((w): w is Workout => Boolean(w));

  const planWorkouts = pick(planIds);
  const savedWorkouts = pick(savedIds);
  const list = tab === "plan" ? planWorkouts : savedWorkouts;

  const totalMinutes = planWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planWorkouts.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0
  );

  const stats = [
    { label: "Exercises", value: planWorkouts.length },
    { label: "Minutes", value: totalMinutes },
    { label: "Calories", value: totalCalories },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-gray-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-[#141414] p-4 text-center sm:p-6"
          >
            <p className="font-display text-3xl font-bold text-[#ccff00] sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-white/10">
        <button
          onClick={() => setTab("plan")}
          className={`px-4 py-3 text-sm font-semibold transition sm:text-base ${
            tab === "plan"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`px-4 py-3 text-sm font-semibold transition sm:text-base ${
            tab === "saved"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Saved
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading && (
          <div className="flex flex-col items-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
            <p className="mt-4 text-gray-400">Loading workouts…</p>
          </div>
        )}

        {!loading && list.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/20 py-16 text-center">
            <h2 className="font-display text-3xl font-bold uppercase">
              Nothing here yet
            </h2>
            <p className="mt-2 text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-[#ccff00] px-6 py-3 font-semibold text-black transition hover:brightness-90"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="space-y-4">
            {list.map((w) => {
              const isDone = tab === "plan" && doneIds.includes(w.id);
              return (
                <div
                  key={w.id}
                  className={`flex flex-col gap-4 rounded-2xl border bg-[#141414] p-4 sm:flex-row sm:items-center ${
                    isDone ? "border-[#ccff00]/50" : "border-white/10"
                  }`}
                >
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      sizes="(min-width: 640px) 96px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold uppercase">
                      {w.name}
                      {isDone && (
                        <span className="ml-2 rounded-full bg-[#ccff00] px-2 py-0.5 align-middle text-xs font-semibold text-black">
                          Done
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">{w.equipment}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <FiClock className="text-[#ccff00]" /> {w.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <FaFire className="text-[#ccff00]" /> {w.caloriesBurned}{" "}
                        kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-[#ccff00]" /> {w.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/workout/${w.id}`}
                      className="flex items-center gap-1 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      <FiEye /> View Details
                    </Link>

                    {tab === "plan" && (
                      <button
                        onClick={() => markDone(w.id)}
                        disabled={isDone}
                        className="flex items-center gap-1 rounded-lg bg-[#ccff00] px-3 py-2 text-sm font-semibold text-black transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FiCheck /> Mark as Done
                      </button>
                    )}

                    <button
                      onClick={() =>
                        tab === "plan"
                          ? removeFromPlan(w.id)
                          : removeFromSaved(w.id)
                      }
                      aria-label="Remove"
                      className="rounded-lg border border-white/20 p-2.5 text-gray-300 transition hover:border-red-400 hover:text-red-400"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}