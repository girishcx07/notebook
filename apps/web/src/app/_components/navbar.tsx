"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Brain,
  LogIn,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
  Heart,
} from "lucide-react";
import { Button, buttonVariants } from "@notebook/ui/components/button";
import { AuthModal } from "./auth-modal";
import { authClient } from "@/src/lib/auth-client";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { data: session } = authClient.useSession();

  const isLoggedIn = !!session && session.user;

  return (
    <>
      <nav className="sticky top-0 inset-x-0 z-40 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100"
            >
              <Brain className="h-6 w-6 text-primary" />
              Smart Notebook
            </Link>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {/* GitHub — only when logged out */}
              {!isLoggedIn && (
                <Link
                  href="https://github.com/girishcx07/notebook"
                  target="_blank"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  GitHub
                  <Heart className="h-4 w-4 ml-1 fill-primary text-primary" />
                </Link>
              )}

              {/* Login */}
              {!isLoggedIn && (
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => setOpen(true)}
                >
                  Login
                  <LogIn className="h-4 w-4 ml-1" />
                </Button>
              )}

              {/* Dashboard / Logout */}
              {isLoggedIn && (
                <>
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "secondary",
                    })}
                  >
                    Dashboard
                    <LayoutDashboard className="h-4 w-4 ml-1" />
                  </Link>

                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => authClient.signOut()}
                  >
                    Logout
                    <LogOut className="h-4 w-4 ml-1" />
                  </Button>
                </>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg border border-slate-300 dark:border-slate-700"
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Drawer */}
          {mobile && (
            <div className="md:hidden mt-3 pb-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col gap-3 pt-4 text-sm">
                {!isLoggedIn && (
                  <>
                    <Link
                      href="https://github.com/girishcx07/notebook"
                      target="_blank"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      GitHub
                    </Link>

                    <Button
                      size="sm"
                      className="bg-primary text-white hover:bg-primary/90"
                      onClick={() => setOpen(true)}
                    >
                      Login
                      <LogIn className="h-4 w-4 ml-1" />
                    </Button>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      Dashboard
                    </Link>

                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-red-600"
                    >
                      Logout
                    </Button>
                  </>
                )}

                {/* Theme toggle on mobile */}
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal open={open} onOpenChange={setOpen} />
    </>
  );
}

/* ------------------- THEME SWITCHER ------------------- */
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
