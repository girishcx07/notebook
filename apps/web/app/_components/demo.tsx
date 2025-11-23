"use client";

import { useState } from "react";
import { Button } from "@notebook/ui/components/button";
import { Input } from "@notebook/ui/components/input";
import { Icons } from "./icons";

const Demo = () => {
  const [message, setMessage] = useState<string>(
    "this is definitely not a swear word"
  );

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="relative w-full rounded-xl mt-12 bg-gray-900/5 p-4 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-md bg-zinc-700 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-blue-400/20">
              POST
            </span>
            <div className="h-[20px] w-px bg-zinc-300" />
            <p className="break-all">https://vector.profanity.dev</p>
          </div>
        </div>
        <div className="relative flex flex-col sm:flex-row items-center gap-2 mt-6 h-full sm:h-9">
          <Input
            className="bg-white h-9"
            value={message}
            onChange={({ target }) => {
              setMessage(target.value);
            }}
          />
          <Button className="h-9 w-full sm:w-fit">Profanity check</Button>
        </div>

        <div className="h-32 mt-4 rounded-lg border-2 border-dashed border-zinc-300 text-sm flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <p className="font-bold">
              <span>
                🚨🚨😱😱 OH GOD, VERY BIG PROFANITY DETECTED!! 🚨🚨😱😱{" "}
              </span>
            </p>

            <p className="text-sm text-zinc-700">
              score (higher is worse): {(0.9).toFixed(3)}
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm flex gap-2 items-center h-fit">
        powered by <Icons.upstash className="w-20" />
      </div>
    </div>
  );
};

export default Demo;
