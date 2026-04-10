import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { AuthShell } from "@/components/auth-shell";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const Route = createFileRoute("/_siteLayout/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthShell
      title="Recover access without losing the calm visual flow."
      description="Password recovery now lives inside the same polished gradient system as sign-in, registration, and the protected workspace."
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-slate-950/75"
      >
        <ForgotPasswordForm />
      </motion.div>
    </AuthShell>
  );
}
