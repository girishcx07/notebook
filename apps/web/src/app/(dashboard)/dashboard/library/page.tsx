import { DashboardContent } from "@/src/app/(dashboard)/dashboard/_components/dashboard-content";
import { Suspense } from "react";
import { NotesList } from "./_components/notes-list";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
  return (
    <DashboardContent>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<p>Error fetching notes</p>}>
          <NotesList />
        </ErrorBoundary>
      </Suspense>
    </DashboardContent>
  );
};

export default Page;
