"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@notebook/ui/components/dialog";
import { Button } from "@notebook/ui/components/button";
import { Input } from "@notebook/ui/components/input";
import { Separator } from "@notebook/ui/components/separator";
import { Icons } from "./icons";

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-md rounded-2xl border 
          bg-white dark:bg-slate-900 
          shadow-xl p-0 overflow-hidden
        "
      >
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {mode === "login"
              ? "Sign in to Smart Notebook"
              : "Create your Smart Notebook account"}
          </DialogTitle>
          <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === "login"
              ? "Continue your study flow without missing a beat."
              : "Join thousands of students staying organised and stress-free."}
          </p>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* OAuth buttons */}
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <Icons.google className="h-5 w-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <Icons.github className="h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-400 dark:text-gray-500">or</span>
            <Separator className="flex-1" />
          </div>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white dark:bg-slate-800"
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-white dark:bg-slate-800"
              />

              <Button className="w-full">Sign in</Button>
            </div>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Full name"
                className="bg-white dark:bg-slate-800"
              />
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white dark:bg-slate-800"
              />
              <Input
                type="tel"
                placeholder="Phone number (optional)"
                className="bg-white dark:bg-slate-800"
              />
              <Input
                type="text"
                placeholder="Student ID / Roll No. (optional)"
                className="bg-white dark:bg-slate-800"
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-white dark:bg-slate-800"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                className="bg-white dark:bg-slate-800"
              />

              <Button className="w-full">Create account</Button>
            </div>
          )}

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Button
                  onClick={() => setMode("register")}
                  variant="link"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button
                  onClick={() => setMode("login")}
                  variant="link"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Sign in
                </Button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
