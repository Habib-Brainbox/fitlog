import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left">
        <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="FitLog logo" width={32} height={32} />
        <span className="font-display text-lg font-bold tracking-wider">
        FITLOG
        </span>
        </div>
        <p className="text-sm text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}