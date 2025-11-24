// Redesigned Next.js Notebook Landing Page
// Following the same premium design language as the new Demo component.
// Fully responsive, clean, modern, silky, academic aesthetic.

import Demo from "./_components/demo";
import YoutubePlayer from "./_components/youtube-player";
import { cn } from "@notebook/ui/lib/utils";
import { Check, Star, Brain, Clock, TrendingDown } from "lucide-react";
import localFont from "next/font/local";
import { Icons } from "./_components/icons";

const fontScary = localFont({ src: "../assets/Scary.ttf" });

export default function Page() {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/60 to-blue-100 grainy-light">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* soft glow */}
        <div className="absolute -top-40 left-0 h-96 w-96 bg-primary/20 blur-[140px]" />
        <div className="absolute top-20 right-0 h-72 w-72 bg-blue-500/20 blur-[140px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1
              className={cn(
                "tracking-tight font-bold text-gray-900 text-5xl md:text-7xl leading-tight"
              )}
            >
              Smart
              <span className="inline-block mx-2 align-middle">
                <Brain className="inline h-12 w-12 md:h-16 md:w-16 text-blue-600" />
              </span>
              Notebook
            </h1>

            <p className="mt-8 text-lg max-w-xl text-gray-700">
              Taking notes has always been
              <span
                className={cn(
                  "mx-1 font-scary text-primary",
                  fontScary.className
                )}
              >
                messy
              </span>
              and
              <span
                className={cn(
                  "mx-1 font-scary text-primary",
                  fontScary.className
                )}
              >
                chaotic
              </span>
              . Not anymore. Meet the cleanest student notebook ever made.
            </p>

            {/* Features list */}
            <ul className="mt-8 space-y-3 font-medium">
              <li className="flex gap-1.5 items-center">
                <Check className="h-5 w-5 text-blue-600" /> Keep everything
                organized in one place
              </li>
              <li className="flex gap-1.5 items-center">
                <Check className="h-5 w-5 text-blue-600" /> Study smarter, not
                harder
              </li>
              <li className="flex gap-1.5 items-center">
                <Check className="h-5 w-5 text-blue-600" /> 100% free for
                students
              </li>
            </ul>

            {/* Social proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex -space-x-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img
                    key={i}
                    className="h-10 w-10 rounded-full ring-2 ring-blue-100 object-cover"
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${i}`}
                    alt="student"
                  />
                ))}
              </div>

              <div className="flex flex-col text-center sm:text-left">
                <div className="flex gap-0.5 justify-center sm:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-sm mt-1">
                  <span className="font-semibold">10,000+</span> students helped
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT – DEMO PREVIEW */}
          <div className="relative w-full md:max-w-xl mx-auto lg:mx-0 mt-10 lg:mt-0">
            <Demo />
          </div>
        </div>
      </section>

      {/* ===================== REASON SECTION ===================== */}
      <section className="relative bg-blue-100 grainy-dark py-24 lg:py-40 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            "Messy notes{" "}
            <span className="bg-primary text-white font-scary px-3">
              really
            </span>{" "}
            suck"
          </h2>
          <p className="mt-6 text-gray-700 text-sm">– every student ever</p>

          <p className="mt-12 text-lg max-w-xl text-gray-700">
            <span className="font-semibold">
              Keeping track of notes is a full-time job.
            </span>{" "}
            If you have multiple classes and endless assignments, staying
            organized shouldn't be another homework.
          </p>

          <Icons.arrow className="h-60 mt-8 text-zinc-400 fill-zinc-400 select-none" />

          <p className="mt-10 text-3xl font-semibold">Disorganized notes...</p>

          <div className="grid sm:grid-cols-2 gap-20 sm:gap-16 mt-32 max-w-3xl w-full">
            <div className="relative">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                <Clock className="h-24 w-24 text-blue-600 opacity-80" />
              </div>
              <p className="font-semibold text-lg">...waste your time</p>
              <p className="mt-3 text-gray-700 text-sm">
                Hours get wasted searching for information instead of learning
                it.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                <TrendingDown className="h-24 w-24 text-primary opacity-80" />
              </div>
              <p className="font-semibold text-lg">...hurt your grades</p>
              <p className="mt-3 text-gray-700 text-sm">
                Missing notes = missing marks. Your GPA shouldn’t suffer because
                your notebook did.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VIDEO SECTION ===================== */}
      <section
        id="video-demo"
        className="bg-blue-50 grainy-light py-24 lg:py-40 px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-slate-900">
            There's a{" "}
            <span className="px-2 bg-blue-600 text-white rounded-md">
              smarter
            </span>{" "}
            way
          </h2>

          <p className="mt-10 text-lg max-w-xl mx-auto text-gray-700">
            <span className="font-semibold">
              Stop struggling with messy binders!
            </span>{" "}
            Let Smart Notebook handle your organization so you can focus on
            learning.
          </p>

          <div className="relative mt-16 mx-auto max-w-4xl bg-gray-900/5 p-2 lg:p-4 rounded-xl ring-1 ring-gray-900/10">
            <YoutubePlayer />
          </div>
        </div>
      </section>
    </div>
  );
}
