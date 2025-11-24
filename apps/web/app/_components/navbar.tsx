"use client";

import { Heart, Brain, LogIn } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@notebook/ui/components/button";
import { AuthModal } from "./auth-modal";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white/75 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto lg:px-8 px-6">
          <div className="relative flex h-14 items-center justify-between">
            <Link
              href="/"
              className="relative sm:absolute inset-y-0 left-0 flex items-center font-semibold"
            >
              <Brain className="h-6 w-6 mr-1.5 text-primary" />
              Smart Notebook
            </Link>

            {/* placeholder */}
            <div className="hidden sm:block invisible">Smart Notebook</div>

            <div className="hidden sm:flex items-center gap-6">
              <Link className="hover:underline" href="#features">
                Features
              </Link>
              <Link className="hover:underline" href="#pricing">
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={() => setOpen(true)} size="sm" variant="default">
                Login <LogIn className="h-4 w-4 ml-1.5" />
              </Button>
              <Link
                href="https://github.com/joschan21/profanity.dev"
                target="_blank"
                referrerPolicy="no-referrer"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                Star on GitHub <Heart className="h-4 w-4 ml-1.5 fill-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AuthModal onOpenChange={setOpen} open={open} />
    </>
  );
};

export default Navbar;
