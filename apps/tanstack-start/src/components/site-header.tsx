import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Brain, Heart, LayoutDashboard, LogIn, LogOut } from "lucide-react";

import { Button, buttonVariants } from "@acme/ui/components/button";
import { ThemeToggle } from "@acme/ui/components/theme";

import { authClient } from "@/auth/client";

export function SiteHeader() {
  const [mobile, setMobile] = useState(false);
  const { data: session } = authClient.useSession();

  const isLoggedIn = !!session && session.user;

  return (
    <>
      <nav className="sticky inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100"
            >
              <Brain className="text-primary h-6 w-6" />
              Smart Notebook
            </Link>

            {/* Desktop Buttons */}
            <div className="hidden items-center gap-4 md:flex">
              {/* GitHub — only when logged out */}
              {!isLoggedIn && (
                <a
                  href="https://github.com/girishcx07/notebook"
                  target="_blank"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  GitHub
                  <Heart className="fill-primary text-primary ml-1 h-4 w-4" />
                </a>
              )}

              {/* Login */}
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "default",
                  })}
                >
                  Login
                  <LogIn className="ml-1 h-4 w-4" />
                </Link>
              )}

              {/* Dashboard / Logout */}
              {isLoggedIn && (
                <>
                  <Link
                    to="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "default",
                    })}
                  >
                    Dashboard
                    <LayoutDashboard className="ml-1 h-4 w-4" />
                  </Link>

                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => authClient.signOut()}
                  >
                    Logout
                    <LogOut className="ml-1 h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="rounded-lg border border-slate-300 p-2 md:hidden dark:border-slate-700"
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
            <div className="mt-3 border-t border-slate-200 pb-4 md:hidden dark:border-slate-700">
              <div className="flex flex-col gap-3 pt-4 text-sm">
                {!isLoggedIn && (
                  <>
                    <a
                      href="https://github.com/girishcx07/notebook"
                      target="_blank"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      GitHub
                    </a>

                    <Link
                      to="/login"
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                        className: "bg-primary hover:bg-primary/90 text-white",
                      })}
                    >
                      Login
                      <LogIn className="ml-1 h-4 w-4" />
                    </Link>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <Link
                      to="/dashboard"
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
    </>
  );
}
