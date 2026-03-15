import { motion } from "framer-motion";
import { Atom, BookOpen, Code2, ImageIcon, PenLine, Sigma } from "lucide-react";

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

export function SubjectBentoSection() {
  return (
    <section className="grainy-light relative overflow-hidden bg-linear-to-b from-blue-50 to-blue-100 px-6 py-28 lg:px-10 dark:from-[#0a0a0f] dark:to-[#09090d]">
      {/* SOFT BACKGROUND GLOWS */}
      <div className="bg-primary/20 absolute top-0 right-0 h-72 w-72 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 bg-blue-500/20 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="text-center text-5xl font-bold tracking-tight text-slate-900 md:text-6xl dark:text-white">
          A Clean Grid for Every Subject
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-700 md:text-lg dark:text-gray-300">
          Six beautifully structured tiles showing how Smart Notebook organizes
          knowledge.
        </p>

        {/* BENTO GRID */}
        <div className="mx-auto mt-20 grid max-w-7xl auto-rows-[240px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
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
      className={`group relative rounded-2xl border bg-linear-to-br p-6 shadow-lg backdrop-blur-xl ${subject.accent} cursor-pointer overflow-hidden transition hover:shadow-2xl`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {subject.title}
          </h3>
          <p className="mt-1 text-xs font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
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
