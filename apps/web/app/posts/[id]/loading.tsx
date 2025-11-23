export default function PostDetailLoading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="h-10 bg-muted rounded w-32 mb-6 animate-pulse" />

      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 space-y-2">
            <div className="h-8 bg-muted rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-muted rounded w-48 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-muted rounded w-20 animate-pulse" />
            <div className="h-10 bg-muted rounded w-20 animate-pulse" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
