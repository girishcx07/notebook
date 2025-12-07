import { getRecentNotes } from "@/src/api/note";
import { ChartAreaInteractive } from "@/src/app/(dashboard)/dashboard/_components/chart-area-interactive";
import { DashboardContent } from "@/src/components/dashboard-content";
import { SectionCards } from "@/src/app/(dashboard)/dashboard/_components/section-cards";
import { keys } from "@/src/constants/query-key";
import { SIDEBAR_DATA } from "@/src/constants/sidebar";
import { queryClient } from "@/src/lib/query-client";
import { DataTable } from "@notebook/ui/components/data-table";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  queryClient.prefetchQuery({
    queryKey: keys.notes.recent(session.user.id),
    queryFn: () => getRecentNotes(session.user.id),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardContent title="Dashboard">
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={SIDEBAR_DATA} />
      </DashboardContent>
    </HydrationBoundary>
  );
};

export default Page;
