import { SIDEBAR_DATA } from "@/src/constants/sidebar";
import { ChartAreaInteractive } from "@/src/app/(dashboard)/_components/chart-area-interactive";
import { DataTable } from "@notebook/ui/components/data-table";
import { SectionCards } from "@/src/app/(dashboard)/_components/section-cards";
import { DashboardContent } from "@/src/app/(dashboard)/_components/dashboard-content";

const Page = () => {
  return (
    <DashboardContent>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={SIDEBAR_DATA} />
    </DashboardContent>
  );
};

export default Page;
