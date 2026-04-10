import { motion } from "framer-motion";
import { BookOpen, CalendarDays, Flame } from "lucide-react";

export function StudyCommandCenterSection() {
  return (
    <section className="grainy-light relative overflow-hidden bg-linear-to-b from-blue-50 to-blue-100 px-6 py-32 lg:px-10 dark:from-[#050510] dark:to-[#0a0a12]">
      {/* GLOWS */}
      <div className="bg-primary/16 absolute top-0 right-0 h-64 w-64 blur-[96px]" />
      <div className="absolute bottom-0 left-0 h-60 w-60 bg-blue-500/16 blur-[110px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-20 px-6 lg:grid-cols-2 lg:px-8">
        {/* LEFT — BOOKS & SUBJECT BENTO */}
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Your Study Command Center
          </h2>
          <p className="mt-4 max-w-xl text-base text-gray-700 dark:text-gray-300">
            All your notebooks, chapters, and revision areas — structured with
            complete clarity. A clean space for deep academic work.
          </p>

          {/* BENTO BOOK SECTION */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {BOOKS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className={`relative overflow-hidden rounded-2xl border bg-linear-to-br p-5 shadow-lg transition hover:shadow-xl ${b.accent}`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {b.title}
                  </h3>
                  <b.icon className={`h-6 w-6 text-${b.color}-600`} />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
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
          className="relative overflow-hidden rounded-3xl border bg-white/82 p-8 shadow-xl dark:bg-slate-900/82"
        >
          {/* PANEL HEADER */}
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
              Study Streak
            </h3>
          </div>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
            You're doing great — consistency builds mastery.
          </p>

          {/* STREAK BARS */}
          <div className="mt-6 flex h-28 items-end gap-2">
            {STREAK.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h * 4 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="flex-1 rounded-full bg-linear-to-t from-blue-500/30 to-blue-600/50 shadow-sm dark:from-blue-400/30 dark:to-blue-500/50"
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-600 dark:text-gray-300">
            Last 7 days · minutes spent per day
          </p>

          {/* TIMELINE */}
          <div className="mt-10">
            <div className="mb-2 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
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
