import { Link, useLocation } from "@tanstack/react-router";
import {
  Brain,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  MenuIcon,
  XIcon,
} from "lucide-react";

import { Button, buttonVariants } from "@acme/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@acme/ui/components/drawer";
import { Separator } from "@acme/ui/components/separator";
import { ThemeToggle } from "@acme/ui/components/theme";

import { authClient } from "@/auth/client";
import { ThemeSwitcher } from "./theme-switcher";

export function SiteHeader() {
  const { data: session } = authClient.useSession();
  const location = useLocation();

  const isLoggedIn = !!session?.user;
  const pathname = location.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav className="sticky inset-x-0 top-0 z-40 border-b bg-white/80 backdrop-blur-xl dark:bg-slate-900/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold"
            resetScroll
          >
            <Brain className="text-primary h-6 w-6" />
            Smart Notebook
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            {!isLoggedIn && (
              <>
                <a
                  href="https://github.com/girishcx07/notebook"
                  target="_blank"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  GitHub
                  <Heart className="text-primary fill-primary ml-1 h-4 w-4" />
                </a>

                {!isAuthPage && (
                  <Link to="/login" className={buttonVariants({ size: "sm" })}>
                    Login
                    <LogIn className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className={buttonVariants({ size: "sm" })}
                >
                  Dashboard
                  <LayoutDashboard className="ml-1 h-4 w-4" />
                </Link>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => authClient.signOut()}
                >
                  Logout
                  <LogOut className="ml-1 h-4 w-4" />
                </Button>
              </>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Drawer */}
          <Drawer direction="top">
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="p-0">
              <div className="mx-auto w-full max-w-md">
                {/* Header */}
                <DrawerHeader className="border-b">
                  <DrawerTitle className="flex items-center justify-between">
                    <Link
                      to="/"
                      className="flex items-center gap-2 font-semibold"
                      resetScroll
                    >
                      <Brain className="text-primary h-6 w-6" />
                      Smart Notebook
                    </Link>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon">
                        <XIcon />
                      </Button>
                    </DrawerClose>
                  </DrawerTitle>
                </DrawerHeader>

                {/* Nav */}
                <div className="flex flex-col gap-2 p-4">
                  {!isLoggedIn && (
                    <>
                      <a
                        href="https://github.com/girishcx07/notebook"
                        target="_blank"
                        className="hover:bg-muted flex items-center justify-between rounded-lg p-3 transition active:scale-[0.98]"
                      >
                        GitHub
                        <Heart className="text-primary fill-primary h-4 w-4" />
                      </a>

                      <Separator className="h-[0.5px] w-full" />

                      {!isAuthPage && (
                        <DrawerClose asChild>
                          <Link
                            to="/login"
                            className="hover:bg-muted flex items-center justify-between rounded-lg p-3 transition active:scale-[0.98]"
                          >
                            Login
                            <LogIn className="h-4 w-4" />
                          </Link>
                        </DrawerClose>
                      )}
                    </>
                  )}

                  {isLoggedIn && (
                    <>
                      <DrawerClose asChild>
                        <Link
                          to="/dashboard"
                          className="hover:bg-muted flex items-center justify-between rounded-lg p-3 transition active:scale-[0.98]"
                        >
                          Dashboard
                          <LayoutDashboard className="h-4 w-4" />
                        </Link>
                      </DrawerClose>

                      <Button
                        variant="ghost"
                        className="justify-between active:scale-[0.98]"
                        onClick={() => authClient.signOut()}
                      >
                        Logout
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Theme */}
                  <div className="flex items-center justify-between rounded-lg p-3">
                    Theme
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
