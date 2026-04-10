import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  BookOpenText,
  LayoutTemplate,
  NotebookTabs,
  Sparkles,
} from "lucide-react";

import { CreatePostForm } from "@/components/create-post-form";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  DashboardMetricCard,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { PostSection } from "@/components/post-section";
import { WelcomeCard } from "@/components/welcome-card";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/_protected/dashboard")({
  beforeLoad: async () => {
    const session = await getSession();

    if (!session) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/login" });
    }

    return { user: session.user };
  },
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        eyebrow="Overview"
        title="A dashboard that feels like the homepage, but built for work."
        description="This protected area now uses the same soft gradients, layered widgets, and spacious grid system as the public-facing experience so students and teachers can navigate with less friction."
        actions={
          <Link
            to="/notes"
            search={{ page: 1, status: "active" }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium shadow-sm"
          >
            Open notes
          </Link>
        }
      >
        <DashboardMetricCard
          accent="blue"
          description="One visual system now carries the homepage language into the protected experience."
          icon={Sparkles}
          label="Visual direction"
          value="Unified UI"
        />
        <DashboardMetricCard
          accent="emerald"
          description="Nested dashboard pages inherit the same shell, spacing, and navigation."
          icon={LayoutTemplate}
          label="Route architecture"
          value="Shared layout"
        />
        <DashboardMetricCard
          accent="amber"
          description="Cards now read like widgets instead of plain boxes, with stronger hierarchy and calmer density."
          icon={NotebookTabs}
          label="Widgets"
          value="Minimal and rich"
        />
        <DashboardMetricCard
          accent="primary"
          description="Registration leads cleanly into a workspace designed for learners and instructors alike."
          icon={BookOpenText}
          label="Audience"
          value="Student-first"
        />
      </DashboardHeader>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_360px]">
        <PostSection />

        <div className="grid gap-6">
          <WelcomeCard user={user} />
          <CreatePostForm />
          <DashboardSurface accent="blue" className="p-6">
            <div className="space-y-3">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                Quick path
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Notes foundation is ready
              </h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Create personal notes, promote them to authenticated or public
                visibility later, and use the notebook area as the base for
                future collaboration features.
              </p>
              <Link
                to="/notes"
                search={{ page: 1, status: "active" }}
                className="text-primary inline-flex items-center text-sm font-medium underline underline-offset-4"
              >
                Jump into notebook structure
              </Link>
            </div>
          </DashboardSurface>
        </div>
      </div>
    </div>
  );
}
