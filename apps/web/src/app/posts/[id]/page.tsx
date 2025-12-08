import { Button } from "@notebook/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PostCard } from "./_components/post-card";
import { ErrorBoundary } from "react-error-boundary";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Render the post page containing a back button and a PostCard for the specified post id.
 *
 * @param params - A promise resolving to route parameters; expected to resolve to an object with an `id` string used as the post id.
 * @returns The React element for the post page, including navigation, a loading fallback, and an error-boundary-wrapped PostCard.
 */
async function PostPage({ params }: PostPageProps) {
  const postId = (await params).id;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Link href="/posts">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <PostCard postId={postId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default PostPage;