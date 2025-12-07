import { DashboardContent } from "@/src/components/dashboard-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <DashboardContent title={`Notes ${slug}`}>
      <h1>Notes {slug}</h1>
    </DashboardContent>
  );
};

export default Page;
