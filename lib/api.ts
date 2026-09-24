import { Workout } from "@/types/workout";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkout(id: string | number): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Workout not found");
  return res.json();
}