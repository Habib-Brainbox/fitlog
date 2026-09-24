"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDumbbell } from "react-icons/fa";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();

  const links = [
    { href: "/", label: "Workout", active: pathname === "/" || pathname.startsWith("/workout") },
    { href: "/my-plan", label: "My Plan", active: pathname === "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00] text-black">
            <FaDumbbell />
          </span>
          <span className="font-display hidden text-xl font-bold tracking-wider sm:inline">
            FITLOG
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition sm:text-base ${
                  link.active
                    ? "bg-white/10 text-[#ccff00]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black sm:text-sm"
          >
            Plan {planIds.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-[#ccff00]/60 px-3 py-1 text-xs font-semibold text-white sm:text-sm"
          >
            Saved {savedIds.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}