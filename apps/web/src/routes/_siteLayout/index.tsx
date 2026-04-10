import { createFileRoute } from "@tanstack/react-router";
import { Brain, Check, Clock, Star, TrendingDown } from "lucide-react";

import { cn } from "@repo/ui";
import { buttonVariants } from "@repo/ui/components/button";

import Demo from "@/components/demo";
import { Icons } from "@/components/icons";
import { StudyCommandCenterSection } from "@/components/study-command-center-section";
import { SubjectBentoSection } from "@/components/subject-bento-section";

// import YoutubePlayer from "@/components/youtube-player";

export const Route = createFileRoute("/_siteLayout/")({
  loader: ({ context }) => {
    const { trpc, queryClient } = context;
    void queryClient.prefetchQuery(trpc.post.all.queryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <div className="grainy-light relative bg-gradient-to-b from-blue-50 via-blue-50/60 to-blue-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        {/* ===================== HERO SECTION (A/B wrapper) ===================== */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          {/* Glows / hero illustrations */}
          <div className="bg-primary/20 pointer-events-none absolute -top-32 left-0 h-64 w-64 blur-[84px]" />
          <div className="pointer-events-none absolute top-10 right-[-40px] h-60 w-60 bg-blue-500/20 blur-[84px]" />
          <div className="pointer-events-none absolute bottom-[-40px] left-1/3 h-40 w-40 rounded-full border border-blue-200/50 dark:border-blue-900/40" />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <HeroVariantA />
          </div>
        </section>

        <SubjectBentoSection />

        {/* ===================== WHY SECTION ===================== */}
        <section className="grainy-dark relative bg-blue-100 px-6 py-24 lg:px-8 lg:py-36 dark:bg-slate-900">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <h2 className="text-5xl leading-tight font-bold tracking-tight text-slate-900 lg:text-6xl dark:text-slate-50">
              "Messy notes{" "}
              <span className="bg-primary font-scary px-3 text-white">
                really
              </span>{" "}
              suck"
            </h2>
            <p className="mt-6 text-sm text-gray-700 dark:text-gray-300">
              – every student ever
            </p>

            <p className="mt-12 max-w-xl text-lg text-gray-800 dark:text-gray-200">
              <span className="font-semibold">
                Keeping track of notes is a full-time job.
              </span>{" "}
              If you have multiple classes and endless assignments, staying
              organized should not be another homework.
            </p>

            <Icons.arrow className="mt-6 h-56 fill-zinc-400 text-zinc-400 select-none" />

            <p className="mt-8 text-3xl font-semibold text-slate-900 dark:text-slate-50">
              Disorganized notes...
            </p>

            <div className="mt-32 grid w-full max-w-3xl gap-20 sm:grid-cols-2 sm:gap-16">
              <div className="relative">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                  <Clock className="h-24 w-24 text-blue-600 opacity-80 dark:text-blue-400" />
                </div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  ...waste your time
                </p>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  Hours get wasted searching for that one definition instead of
                  actually learning it.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                  <TrendingDown className="text-primary h-24 w-24 opacity-80" />
                </div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  ...hurt your grades
                </p>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
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
          className="grainy-light bg-blue-50 px-6 py-24 lg:px-8 lg:py-36 dark:bg-slate-950"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-5xl leading-tight font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-50">
              There&apos;s a{" "}
              <span className="bg-primary/10 text-primary rounded-md px-2">
                smarter
              </span>{" "}
              way
            </h2>

            <p className="mx-auto mt-10 max-w-xl text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold">
                Stop struggling with messy binders!
              </span>{" "}
              Let Smart Notebook handle your organization so you can focus on
              learning.
            </p>

            {/* <div className="relative mx-auto mt-16 max-w-4xl rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 lg:p-4 dark:bg-slate-900/60 dark:ring-white/10">
              <YoutubePlayer />
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ===================== HERO VARIANT A (default) ===================== */

const HeroVariantA = () => {
  return (
    <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
      {/* LEFT CONTENT */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1
          className={cn(
            "text-5xl leading-tight font-bold tracking-tight text-gray-900 md:text-7xl dark:text-slate-50",
          )}
        >
          Smart
          <span className="mx-2 inline-block align-middle">
            <Brain className="text-primary inline h-12 w-12 md:h-16 md:w-16" />
          </span>
          Notebook
        </h1>

        <p className="mt-8 max-w-xl text-lg text-gray-700 dark:text-gray-200">
          Taking notes has always been
          <span className={cn("font-scary text-primary mx-1")}>messy</span>
          and
          <span className={cn("font-scary text-primary mx-1")}>chaotic</span>.
          Not anymore. Meet the cleanest student notebook ever made.
        </p>

        {/* Features list */}
        <ul className="mt-8 space-y-3 font-medium text-gray-800 dark:text-gray-100">
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <Check className="h-5 w-5 text-blue-600" /> Keep everything
            organized in one place
          </li>
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <Check className="h-5 w-5 text-blue-600" /> Study smarter, not
            harder
          </li>
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <Check className="h-5 w-5 text-blue-600" /> 100% free for students
          </li>
        </ul>

        {/* CTA Row */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
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
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex -space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100"
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${i}`}
                alt="student avatar"
              />
            ))}
          </div>

          <div className="flex flex-col text-center sm:text-left">
            <div className="flex justify-center gap-0.5 sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="text-primary fill-primary h-4 w-4" />
              ))}
            </div>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
              <span className="font-semibold">10,000+</span> students helped
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – DEMO PREVIEW */}
      <div className="relative mx-auto mt-10 w-full md:max-w-xl lg:mx-0 lg:mt-0">
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
