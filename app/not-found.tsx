import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="font-display text-8xl font-bold text-[#ccff00]">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase">
        Page not found
      </h1>
      <p className="mt-2 text-gray-400">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[#ccff00] px-6 py-3 font-semibold text-black transition hover:brightness-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}