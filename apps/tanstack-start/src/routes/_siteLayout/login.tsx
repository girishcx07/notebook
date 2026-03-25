import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/_siteLayout/login")({
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
        <LoginForm />
      </motion.div>
    </div>
  );
}
