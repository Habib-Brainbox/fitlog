import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:py-20">
      <div>
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-[#ccff00]">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display text-5xl font-bold uppercase leading-tight sm:text-6xl lg:text-7xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-xl text-base text-gray-400 sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        
         <a href="#library" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 font-semibold text-black transition hover:brightness-90">
          BROWSE WORKOUTS <FiArrowDown />
        </a>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/banner.png"
          alt="Workout illustration"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}