import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { CreatePostForm } from "@/components/create-post-form";
import { DashboardHeader } from "@/components/dashboard-header";
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
    <main className="bg-muted/40 min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <DashboardHeader
          title="Dashboard"
          description="Your starter workspace now includes a note system foundation alongside the original demo content."
        />

        <WelcomeCard user={user} />

        <section className="bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Notes foundation is ready</h2>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Create personal notes, promote them to public or authenticated
              visibility, archive them safely, and use this as the base for
              future nested pages and collaboration features.
            </p>
          </div>

          <Link
            to="/notes"
            search={{ page: 1, status: "active" }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
          >
            Open notes
          </Link>
        </section>

        <div className="grid gap-8 md:grid-cols-3">
          <CreatePostForm />
          <PostSection />
        </div>
      </div>
    </main>
  );
}
