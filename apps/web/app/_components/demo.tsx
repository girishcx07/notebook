"use client";

import { cn } from "@notebook/ui/lib/utils";
import {
  CheckSquare2,
  Code2,
  ImageIcon,
  Layers2,
  PenLine,
  Sparkles,
  Sigma,
} from "lucide-react";
import { motion } from "framer-motion";

const Demo = () => {
  return (
    <motion.div
      className="relative h-[650px] w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background/95 to-background/90 shadow-xl dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01, rotate: -0.3 }}
    >
      <Glow />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <Header />
        <MainBoard />
        <BottomStrip />
      </div>
    </motion.div>
  );
};

const Header = () => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary shadow-sm">
          <Sparkles className="h-3 w-3" />
          Notebook demo · Live preview
        </div>
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
          Capture notes, code, math & sketches in one silky canvas.
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground max-w-md">
          This is how your notebook feels in action—clean, focused and ready for
          deep work.
        </p>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Auto-save on
        </span>
        <span>3 notebooks · 18 pages today</span>
      </div>
    </div>
  );
};

const MainBoard = () => {
  return (
    <div className="relative mt-6 flex flex-1 items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Back shadow card */}
        <div
          className="absolute inset-x-8 -top-2 h-5 rounded-2xl bg-black/10 dark:bg-black/40 blur-xl"
          aria-hidden
        />

        {/* Back page */}
        <motion.div
          initial={{ opacity: 0, y: 10, rotate: -4 }}
          animate={{ opacity: 0.6, y: 0, rotate: -4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <NotebookPage
            className="-rotate-4 translate-x-5 translate-y-4 opacity-60 scale-[0.97]"
            muted
          />
        </motion.div>

        {/* Main page */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <NotebookPage />
        </motion.div>

        {/* Front mini cards */}
        <MiniMathCard />
        <MiniTodoCard />
        <MiniImageCard />
      </div>
    </div>
  );
};

const NotebookPage = ({
  className,
  muted,
}: {
  className?: string;
  muted?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card/95 px-4 py-3 pb-4 shadow-[0_22px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl dark:bg-slate-900/95",
        muted && "border-dashed border-border/60 bg-muted/60",
        className
      )}
    >
      {/* Page header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/60">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Layers2 className="h-3.5 w-3.5 text-primary" />
          <span>Reference Sheet · Optics</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="h-2 w-2 rounded-full bg-amber-300" />
          <div className="h-2 w-2 rounded-full bg-rose-300" />
        </div>
      </div>

      {/* Page content */}
      <div className="mt-3 grid grid-cols-[1.2fr,0.9fr] gap-3">
        {/* Left: text + math */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-md bg-muted/70 px-2 py-1 text-[11px] font-medium text-muted-foreground">
            <PenLine className="h-3 w-3 text-primary" />
            Lecture notes · Wave theory
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            "Energy of a wave is proportional to the square of its amplitude."
            Keep this in mind when deriving intensity.
          </p>
          <div className="rounded-md bg-primary/5 px-2 py-1.5 text-[11px] font-mono text-primary border border-primary/10">
            I ∝ A<sup>2</sup>
          </div>
        </div>

        {/* Right: small code + tags */}
        <div className="space-y-2">
          <div className="rounded-md bg-neutral-900 text-neutral-50 p-2 text-[9px] font-mono leading-relaxed shadow-inner">
            <span className="text-emerald-300">const</span> focus = ["notes",
            "problems"];
            <br />
            <span className="text-emerald-300">return</span> study(focus);
          </div>
          <div className="flex flex-wrap gap-1 text-[10px]">
            <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
              #revision
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
              #exam-week
            </span>
          </div>
        </div>
      </div>

      {/* Bottom strip inside page */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Code2 className="h-3.5 w-3.5 text-blue-500" />
          <span>Code, math & sketches synced</span>
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5">Page 12 of 42</span>
      </div>
    </div>
  );
};

const MiniMathCard = () => {
  return (
    <motion.div
      className="absolute right-0 -top-6 z-30 w-40 rounded-xl border border-blue-300/60 bg-blue-50/90 dark:bg-blue-950/40 p-2 shadow-xl rotate-[-2deg]"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    >
      <div className="flex items-center gap-2 text-[10px] font-medium text-blue-900 dark:text-blue-100">
        <Sigma className="h-3.5 w-3.5" />
        <span>Quick formula</span>
      </div>
      <div className="mt-1 text-[11px] font-serif text-blue-900 dark:text-blue-50">
        v = f · λ
      </div>
      <p className="mt-1 text-[9px] text-blue-800/80 dark:text-blue-100/70">
        Wave speed = frequency × wavelength
      </p>
    </motion.div>
  );
};

const MiniTodoCard = () => {
  return (
    <motion.div
      className="absolute -left-2 bottom-4 z-30 w-40 rounded-xl border border-emerald-300/60 bg-emerald-50/90 dark:bg-emerald-950/40 p-2 shadow-xl rotate-[3deg]"
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6,
      }}
    >
      <div className="flex items-center gap-2 text-[10px] font-medium text-emerald-900 dark:text-emerald-100">
        <CheckSquare2 className="h-3.5 w-3.5" />
        <span>Tonight</span>
      </div>
      <ul className="mt-1 space-y-0.5 text-[9px] text-emerald-900/90 dark:text-emerald-50">
        <li>• Solve 5 numericals</li>
        <li>• Summarise key formulas</li>
        <li>• Mark doubts for mentor</li>
      </ul>
    </motion.div>
  );
};

const MiniImageCard = () => {
  return (
    <motion.div
      className="absolute right-4 bottom-0 z-20 w-28 h-20 rounded-xl border border-purple-300/70 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/70 dark:to-indigo-900/70 shadow-lg overflow-hidden flex items-center justify-center rotate-[1deg]"
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    >
      <ImageIcon className="h-6 w-6 text-purple-500/80 dark:text-purple-200" />
    </motion.div>
  );
};

const BottomStrip = () => {
  return (
    <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-10 rounded-full bg-primary/40" />
        <span>Made for deep student workspaces.</span>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <span className="rounded-full bg-muted px-2 py-0.5">Math</span>
        <span className="rounded-full bg-muted px-2 py-0.5">Notes</span>
        <span className="rounded-full bg-muted px-2 py-0.5">Sketches</span>
      </div>
    </div>
  );
};

const Glow = () => {
  return (
    <>
      <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
    </>
  );
};

export default Demo;
