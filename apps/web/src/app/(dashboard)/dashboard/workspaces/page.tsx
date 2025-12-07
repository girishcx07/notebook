import { DashboardContent } from "@/src/components/dashboard-content";
import { Suspense } from "react";
import { WorkspacesList } from "./_components/workspaces-list";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
  return (
    <DashboardContent title="Workspaces">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<p>Error fetching workspaces</p>}>
          <WorkspacesList />
        </ErrorBoundary>
      </Suspense>
    </DashboardContent>
  );
};

export default Page;
