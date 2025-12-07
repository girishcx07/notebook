import { DashboardContent } from "@/src/components/dashboard-content";
import { Suspense } from "react";
import { NotesList } from "./_components/notes-list";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
  return (
    <DashboardContent title="Notes">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<p>Error fetching notes</p>}>
          <NotesList />
        </ErrorBoundary>
      </Suspense>
    </DashboardContent>
  );
};

export default Page;
