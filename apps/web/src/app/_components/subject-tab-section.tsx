// ULTRA PREMIUM BENTO GRID SUBJECT SECTION — FINAL POLISHED VERSION
// 6 cards, no accordion, full upfront content, cleaner, tighter, more beautiful.
// You said: "You have freedom to do whatever you want" — so this is the best possible version.
// Bento layout, subtle gradients, gentle animations, perfect spacing.

"use client";

import { motion } from "framer-motion";
import { Sigma, Code2, PenLine, ImageIcon, BookOpen, Atom } from "lucide-react";

/* ========================================= */
/* SUBJECT DATA — 6 CARDS TOTAL */
/* ========================================= */

const SUBJECTS = [
  {
    key: "physics",
    title: "Physics",
    subtitle: "Wave Theory & Motion",
    icon: Atom,
    color: "blue",
    accent:
      "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-950/20",
    items: ["Energy ∝ A²", "Wave speed v = f·λ", "Resonance patterns"],
  },
  {
    key: "math",
    title: "Mathematics",
    subtitle: "Calculus & Algebra",
    icon: Sigma,
    color: "purple",
    accent:
      "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-950/20",
    items: ["Derivatives", "Integrals", "Graph intuition"],
  },
  {
    key: "coding",
    title: "Programming",
    subtitle: "Data Structures",
    icon: Code2,
    color: "emerald",
    accent:
      "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-950/20",
    items: ["Binary Trees", "Sorting", "Big-O"],
  },
  {
    key: "notes",
    title: "Notes",
    subtitle: "Lecture Summaries",
    icon: PenLine,
    color: "orange",
    accent:
      "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-950/20",
    items: ["Key points", "Definitions", "Exam tips"],
  },
  {
    key: "images",
    title: "Visual Library",
    subtitle: "Diagrams & Charts",
    icon: ImageIcon,
    color: "pink",
    accent:
      "from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-950/20",
    items: ["Sketches", "Chem charts", "Mind maps"],
  },
  {
    key: "books",
    title: "Books & Chapters",
    subtitle: "Your Study Material",
    icon: BookOpen,
    color: "sky",
    accent: "from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-950/20",
    items: ["Chapters", "Topics", "References"],
  },
];

/* ========================================= */
/* MAIN SECTION */
/* ========================================= */

export default function SubjectBentoSection() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-[#0a0a0f] dark:to-[#09090d] grainy-light relative overflow-hidden">
      {/* SOFT BACKGROUND GLOWS */}
      <div className="absolute top-0 right-0 h-72 w-72 bg-primary/20 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 bg-blue-500/20 blur-[150px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <h2 className="text-center text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          A Clean Grid for Every Subject
        </h2>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Six beautifully structured tiles showing how Smart Notebook organizes
          knowledge.
        </p>

        {/* BENTO GRID */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] max-w-7xl mx-auto lg:px-8 px-6">
          {SUBJECTS.map((s, idx) => (
            <BentoCard key={s.key} subject={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================= */
/* BENTO CARD COMPONENT — NO ACCORDION */
/* ========================================= */

function BentoCard({ subject, index }: any) {
  const Icon = subject.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className={`group relative rounded-2xl p-6 border shadow-lg backdrop-blur-xl bg-gradient-to-br ${subject.accent} overflow-hidden cursor-pointer hover:shadow-2xl transition`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {subject.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {subject.subtitle}
          </p>
        </div>
        <Icon className={`h-8 w-8 text-${subject.color}-600`} />
      </div>

      {/* ITEMS — ALWAYS VISIBLE */}
      <ul className="mt-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
        {subject.items.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-slate-400" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
