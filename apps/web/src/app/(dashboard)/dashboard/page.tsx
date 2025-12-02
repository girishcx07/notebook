import { ChartAreaInteractive } from "@/src/app/(dashboard)/dashboard/_components/chart-area-interactive";
import { DashboardContent } from "@/src/app/(dashboard)/dashboard/_components/dashboard-content";
import { SectionCards } from "@/src/app/(dashboard)/dashboard/_components/section-cards";
import { SIDEBAR_DATA } from "@/src/constants/sidebar";
import { DataTable } from "@notebook/ui/components/data-table";
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

  return (
    <DashboardContent>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={SIDEBAR_DATA} />
    </DashboardContent>
  );
};

export default Page;
