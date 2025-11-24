// ULTRA-PREMIUM — COMMAND CENTER SECTION (FINAL, TOP-TIER)
// Minimal, elegant, beautiful, perfectly aligned with your new Demo + Bento Grid
// Cleaner aesthetic, stronger hierarchy, AI-grade polish

"use client";

import { motion } from "framer-motion";
import { BookOpen, Flame, CalendarDays } from "lucide-react";

export default function StudyCommandCenterSection() {
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-[#050510] dark:to-[#0a0a12] grainy-light overflow-hidden">
      {/* GLOWS */}
      <div className="absolute top-0 right-0 h-80 w-80 bg-primary/20 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 bg-blue-500/20 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-7xl lg:px-8 px-6 grid lg:grid-cols-2 gap-20 items-start">
        {/* LEFT — BOOKS & SUBJECT BENTO */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your Study Command Center
          </h2>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300 max-w-xl">
            All your notebooks, chapters, and revision areas — structured with
            complete clarity. A clean space for deep academic work.
          </p>

          {/* BENTO BOOK SECTION */}
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {BOOKS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className={`rounded-2xl border shadow-lg p-5 backdrop-blur-xl bg-gradient-to-br ${b.accent} relative overflow-hidden hover:shadow-xl transition`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                    {b.title}
                  </h3>
                  <b.icon className={`h-6 w-6 text-${b.color}-600`} />
                </div>
                <p className="mt-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  {b.meta}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — STREAK + TIMELINE PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl border bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl p-8 relative overflow-hidden"
        >
          {/* PANEL HEADER */}
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide uppercase">
              Study Streak
            </h3>
          </div>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
            You're doing great — consistency builds mastery.
          </p>

          {/* STREAK BARS */}
          <div className="mt-6 flex items-end gap-2 h-28">
            {STREAK.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h * 4 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="flex-1 rounded-full bg-gradient-to-t from-blue-500/30 to-blue-600/50 dark:from-blue-400/30 dark:to-blue-500/50 shadow-sm"
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-600 dark:text-gray-300">
            Last 7 days · minutes spent per day
          </p>

          {/* TIMELINE */}
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white tracking-wide uppercase">
                Upcoming Timeline
              </h4>
            </div>

            <ol className="mt-3 space-y-3 text-xs text-gray-700 dark:text-gray-300">
              {TIMELINE.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================= */
/* BOOK DATA */
/* ========================================= */

const BOOKS = [
  {
    title: "Physics · Wave Theory",
    color: "blue",
    icon: BookOpen,
    accent:
      "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-950/20",
    meta: "24 pages · 3 formulas bookmarked · 2 diagrams",
  },
  {
    title: "Chemistry · Organic",
    color: "emerald",
    icon: BookOpen,
    accent:
      "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-950/20",
    meta: "18 pages · Reaction map · Mechanisms highlighted",
  },
  {
    title: "Computer Science",
    color: "purple",
    icon: BookOpen,
    accent:
      "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-950/20",
    meta: "12 pages · Pseudocode & complexity charts",
  },
  {
    title: "Exam Revision",
    color: "amber",
    icon: BookOpen,
    accent:
      "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-950/20",
    meta: "6 pages · Formula wall · Quick checklist",
  },
];

/* ========================================= */
/* STREAK + TIMELINE DATA */
/* ========================================= */

const STREAK = [4, 6, 8, 10, 7, 9, 11];

const TIMELINE = [
  "Monday – Physics: Waves revision",
  "Wednesday – Chemistry: Organic mechanisms",
  "Friday – CS: Algorithms practice",
  "Sunday – Weekly summary & planning",
];
