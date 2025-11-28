import { SIDEBAR_DATA } from "@/src/constants/sidebar";
import { ChartAreaInteractive } from "@/src/app/(dashboard)/_components/chart-area-interactive";
import { DataTable } from "@notebook/ui/components/data-table";
import { SectionCards } from "@/src/app/(dashboard)/_components/section-cards";

const Page = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={SIDEBAR_DATA} />
    </div>
  );
};

export default Page;
