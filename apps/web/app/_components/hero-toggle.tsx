// ./_components/hero-toggle.tsx
"use client";

import { useState } from "react";

const HeroToggle = () => {
  const [variant, setVariant] = useState<"A" | "B">("A");

  // NOTE:
  // Right now this toggle only changes the label for you visually.
  // The actual Hero currently always renders HeroVariantA by default.
  // You can wire it to conditionally render HeroVariantB instead if you want.

  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-slate-900/80 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-200 shadow-sm">
      <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200">
        Hero variant: {variant}
      </span>
      <button
        type="button"
        className="rounded-full px-2 py-0.5 hover:bg-blue-50 dark:hover:bg-slate-800"
        onClick={() => setVariant((prev) => (prev === "A" ? "B" : "A"))}
      >
        Toggle
      </button>
    </div>
  );
};

export default HeroToggle;
