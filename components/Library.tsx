"use client";

import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...workouts].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase">
            The Library
          </h2>
          <p className="mt-2 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full sm:w-52">
          <label htmlFor="sort" className="sr-only">
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="w-full appearance-none rounded-lg border border-white/20 bg-[#141414] px-4 py-2.5 pr-10 text-sm text-white outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Sort By: Duration</option>
            <option value="caloriesBurned">Sort By: Calories</option>
            <option value="rating">Sort By: Rating</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
          <p className="mt-4 text-gray-400">Loading workouts…</p>
        </div>
      )}

      {error && !loading && (
        <p className="py-20 text-center text-red-400">
          Failed to load workouts. Please refresh the page.
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}