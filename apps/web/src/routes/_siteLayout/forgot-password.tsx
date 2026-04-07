import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const Route = createFileRoute("/_siteLayout/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-[400px]"
      >
        <ForgotPasswordForm />
      </motion.div>
    </div>
  );
}
