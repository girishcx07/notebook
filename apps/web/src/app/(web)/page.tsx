// app/page.tsx

import Demo from "../_components/demo";
import YoutubePlayer from "../_components/youtube-player";
import { cn } from "@notebook/ui/lib/utils";
import { Check, Star, Brain, Clock, TrendingDown } from "lucide-react";
import localFont from "next/font/local";
import { Icons } from "../_components/icons";
import SubjectTabSection from "../_components/subject-tab-section";
import StudyCommandCenterSection from "../_components/study-command-center-section";
import { buttonVariants } from "@notebook/ui/components/button";

const fontScary = localFont({
  src: "../../assets/Scary.ttf",
});

export default function Page() {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/60 to-blue-100 grainy-light dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      {/* ===================== HERO SECTION (A/B wrapper) ===================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* Glows / hero illustrations */}
        <div className="pointer-events-none absolute -top-40 left-0 h-80 w-80 bg-primary/25 blur-[130px]" />
        <div className="pointer-events-none absolute top-10 right-[-60px] h-72 w-72 bg-blue-500/25 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-[-40px] left-1/3 h-40 w-40 rounded-full border border-blue-200/50 dark:border-blue-900/40" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <HeroVariantA />
        </div>
      </section>

      <SubjectTabSection />

      {/* ===================== WHY SECTION ===================== */}
      <section className="relative bg-blue-100 grainy-dark dark:bg-slate-900 py-24 lg:py-36 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900 dark:text-slate-50">
            "Messy notes{" "}
            <span className="bg-primary text-white font-scary px-3">
              really
            </span>{" "}
            suck"
          </h2>
          <p className="mt-6 text-gray-700 dark:text-gray-300 text-sm">
            – every student ever
          </p>

          <p className="mt-12 text-lg max-w-xl text-gray-800 dark:text-gray-200">
            <span className="font-semibold">
              Keeping track of notes is a full-time job.
            </span>{" "}
            If you have multiple classes and endless assignments, staying
            organized should not be another homework.
          </p>

          <Icons.arrow className="h-56 mt-6 text-zinc-400 fill-zinc-400 select-none" />

          <p className="mt-8 text-3xl font-semibold text-slate-900 dark:text-slate-50">
            Disorganized notes...
          </p>

          <div className="grid sm:grid-cols-2 gap-20 sm:gap-16 mt-32 max-w-3xl w-full">
            <div className="relative">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                <Clock className="h-24 w-24 text-blue-600 dark:text-blue-400 opacity-80" />
              </div>
              <p className="font-semibold text-lg text-slate-900 dark:text-slate-50">
                ...waste your time
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                Hours get wasted searching for that one definition instead of
                actually learning it.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                <TrendingDown className="h-24 w-24 text-primary opacity-80" />
              </div>
              <p className="font-semibold text-lg text-slate-900 dark:text-slate-50">
                ...hurt your grades
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                Missing notes = missing marks. Your GPA should not suffer
                because your notebook did.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== NEW SECTION – BOOKS / SUBJECTS / STREAKS ===================== */}
      <StudyCommandCenterSection />

      {/* ===================== VIDEO SECTION ===================== */}
      <section
        id="video-demo"
        className="bg-blue-50 dark:bg-slate-950 grainy-light py-24 lg:py-36 px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50">
            There&apos;s a{" "}
            <span className="px-2 bg-primary/10 text-primary rounded-md">
              smarter
            </span>{" "}
            way
          </h2>

          <p className="mt-10 text-lg max-w-xl mx-auto text-gray-700 dark:text-gray-200">
            <span className="font-semibold">
              Stop struggling with messy binders!
            </span>{" "}
            Let Smart Notebook handle your organization so you can focus on
            learning.
          </p>

          <div className="relative mt-16 mx-auto max-w-4xl bg-gray-900/5 dark:bg-slate-900/60 p-2 lg:p-4 rounded-xl ring-1 ring-gray-900/10 dark:ring-white/10">
            <YoutubePlayer />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===================== HERO VARIANT A (default) ===================== */

const HeroVariantA = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      {/* LEFT CONTENT */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1
          className={cn(
            "tracking-tight font-bold text-gray-900 dark:text-slate-50 text-5xl md:text-7xl leading-tight"
          )}
        >
          Smart
          <span className="inline-block mx-2 align-middle">
            <Brain className="inline h-12 w-12 md:h-16 md:w-16 text-primary" />
          </span>
          Notebook
        </h1>

        <p className="mt-8 text-lg max-w-xl text-gray-700 dark:text-gray-200">
          Taking notes has always been
          <span
            className={cn("mx-1 font-scary text-primary", fontScary.className)}
          >
            messy
          </span>
          and
          <span
            className={cn("mx-1 font-scary text-primary", fontScary.className)}
          >
            chaotic
          </span>
          . Not anymore. Meet the cleanest student notebook ever made.
        </p>

        {/* Features list */}
        <ul className="mt-8 space-y-3 font-medium text-gray-800 dark:text-gray-100">
          <li className="flex gap-2 items-center justify-center lg:justify-start">
            <Check className="h-5 w-5 text-blue-600" /> Keep everything
            organized in one place
          </li>
          <li className="flex gap-2 items-center justify-center lg:justify-start">
            <Check className="h-5 w-5 text-blue-600" /> Study smarter, not
            harder
          </li>
          <li className="flex gap-2 items-center justify-center lg:justify-start">
            <Check className="h-5 w-5 text-blue-600" /> 100% free for students
          </li>
        </ul>

        {/* CTA Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a
            href="#video-demo"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Start your notebook
          </a>
          <a
            href="#video-demo"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Watch 3-min demo
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex -space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                className="h-10 w-10 rounded-full ring-2 ring-blue-100 object-cover"
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${i}`}
                alt="student avatar"
              />
            ))}
          </div>

          <div className="flex flex-col text-center sm:text-left">
            <div className="flex gap-0.5 justify-center sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-200">
              <span className="font-semibold">10,000+</span> students helped
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – DEMO PREVIEW */}
      <div className="relative w-full md:max-w-xl mx-auto lg:mx-0 mt-10 lg:mt-0">
        {/* subtle floating book illustration */}
        {/* <div className="pointer-events-none absolute -top-10 -left-4 hidden md:block">
          <div className="flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 px-3 py-1 shadow-sm border text-[11px] text-gray-700 dark:text-gray-200">
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            Live study canvas
          </div>
        </div> */}
        <Demo />
      </div>
    </div>
  );
};
