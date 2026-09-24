import Image from "next/image";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { FaFire, FaStar } from "react-icons/fa";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#ccff00]/10 px-3 py-1 text-xs font-semibold uppercase text-[#ccff00]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{workout.equipment}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <FiClock className="text-[#ccff00]" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FaFire className="text-[#ccff00]" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="text-[#ccff00]" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}