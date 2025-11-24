import Demo from "./_components/demo";
import YoutubePlayer from "./_components/youtube-player";
import { cn } from "@notebook/ui/lib/utils";
import {
  Check,
  Star,
  BookOpen,
  Brain,
  Clock,
  TrendingDown,
} from "lucide-react";
import localFont from "next/font/local";
import { Icons } from "./_components/icons";

const fontScary = localFont({
  src: "../assets/Scary.ttf",
});

export default async function Page() {
  return (
    <div className="bg-blue-50 grainy-light">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-8 lg:px-8 lg:pt-32 lg:pb-52">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-lg text-center sm:text-left flex flex-col items-center lg:items-start">
              <h1
                className={cn(
                  "relative tracking-tight sm:text-left mt-10 font-bold !leading-[4rem] text-gray-900 text-5xl md:text-7xl"
                )}
              >
                <span className="whitespace-nowrap">
                  Smart
                  <span className="relative inline-block mx-2">
                    <Brain className="h-10 w-10 md:h-14 md:w-14 text-blue-600" />
                  </span>
                </span>
                Notebook
              </h1>
              <p className="mt-8 text-lg lg:pr-10 text-center lg:text-left text-balance md:text-wrap">
                Taking notes has always been{" "}
                <span
                  className={cn(
                    "font-scary font-bold text-primary",
                    fontScary.className
                  )}
                >
                  messy
                </span>{" "}
                and{" "}
                <span
                  className={cn(
                    "font-scary font-bold text-primary",
                    fontScary.className
                  )}
                >
                  chaotic
                </span>
                . Not anymore. Introducing a smart, organized and efficient
                notebook for your studies.
              </p>

              <ul className="mt-8 space-y-2 font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" /> Keep
                    everything organized in one place
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" /> Study
                    smarter, not harder
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" /> 100%
                    free for students
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="Image Description"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="Image Description"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                    alt="Image Description"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="Image Description"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                    alt="Image Description"
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                  </div>

                  <p className="">
                    <span className="font-semibold">
                      {(Math.ceil(Number(10000) / 10) * 10).toLocaleString()}
                    </span>{" "}
                    students helped{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-8 sm:px-16 md:px-0 mt-28 md:mx-auto md:max-w-xl w-full lg:mx-0 lg:mt-20">
            {/* <img
              alt="try-it"
              aria-hidden="true"
              src="/try-it.png"
              className="absolute w-40 left-2/3 -top-2 select-none hidden sm:block"
            /> */}
            <Demo />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      <section className="bg-blue-100 grainy-dark px-4">
        <div className="mx-auto max-w-6xl gap-6 pb-24 pt-20 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="w-full flex flex-col">
            <div className="flex justify-center text-center">
              <h2 className="font-heading text-5xl lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight">
                "Messy notes{" "}
                <span className="bg-primary text-white font-scary px-3">
                  really
                </span>{" "}
                suck"
              </h2>
            </div>
            <p className="mx-auto mt-8 text-center text-sm max-w-xl">
              - every student ever
            </p>

            {/* <Icons.arrow className='h-60 -mt-4 text-zinc-400 fill-zinc-400 pointer-events-none select-none' /> */}

            <p></p>

            <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance">
              <span className="font-semibold">
                Keeping track of notes is a full-time job.
              </span>{" "}
              If you have multiple classes and endless assignments, it's your
              responsibility to keep things organized. That's a challenge if
              your notes are scattered like confetti at a toddler's birthday
              party.
            </p>

            <Icons.arrow className="h-60 -mt-4 text-zinc-400 fill-zinc-400 pointer-events-none select-none" />

            <p className="mt-6 sm:mt-12 z-10 text-center mx-auto text-3xl font-semibold">
              Disorganized notes...
            </p>

            <div className="grid gap-40 sm:grid-cols-2 sm:gap-16 max-w-3xl mx-auto mt-40 text-center">
              <div className="relative z-10">
                <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
                  <div className="absolute inset-x-0 -bottom-0 h-16 bg-gradient-to-t 0 from-blue-100 pointer-events-none"></div>
                  <Clock className="h-24 w-24 text-blue-600 relative -z-10 select-none mx-auto" />
                </div>
                <p className="font-semibold text-lg">...waste your time</p>
                <p className="mt-2 text-balance">
                  Imagine spending hours looking for that one specific
                  definition instead of actually studying it. Not exactly a
                  recipe for success is it??
                </p>
              </div>

              <div className="relative z-10">
                <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
                  <div className="absolute inset-x-0 -bottom-0 h-16 bg-gradient-to-t from-blue-100 pointer-events-none"></div>
                  <TrendingDown className="h-24 w-24 text-primary relative -z-10 select-none mx-auto" />
                </div>
                <p className="font-semibold text-lg">...hurt your grades</p>
                <p className="mt-2 text-balance">
                  Missing information means missing points on the exam. Do you
                  really want to risk your GPA because of a{" "}
                  <span className="font-semibold text-primary">
                    messy notebook
                  </span>{" "}
                  ?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="video-demo" className="bg-blue-50 grainy-light">
        <div className="mx-auto max-w-6xl gap-6 pb-24 pt-10 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40">
          <h2 className="mx-auto text-balance text-5xl sm:text-6xl text-center font-bold leading-[4.25rem] tracking-tight max-w-2xl text-slate-900">
            There's a{" "}
            <span className="px-2 bg-blue-600 text-white">smarter</span> way
          </h2>

          <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance">
            <span className="font-semibold">
              Stop struggling with messy binders!
            </span>{" "}
            Let Smart Notebook do the heavy lifting of keeping your notes
            organized.
          </p>

          <div className="relative mx-4 rounded-xl aspect-video md:mx-auto max-w-4xl mt-12 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
            <YoutubePlayer />
            <div
              aria-hidden="true"
              className="absolute -left-52 top-1/4 z-10 select-none"
            >
              <img alt="3-min-demo" src="/3mindemo.png" />
            </div>
          </div>

          {/* <div
            id='api'
            className='w-full flex flex-col items-center mt-12 px-4'>
            <p className='font-bold text-xl my-4'>Make an API request</p>
            <div className='relative max-w-2xl w-full text-left p-5 bg-[#1e1e1e] rounded-xl shadow'>
              <DrawEditor />
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
