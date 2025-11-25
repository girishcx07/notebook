export default function PostsLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-10 bg-muted rounded w-32 animate-pulse" />
          <div className="h-5 bg-muted rounded w-64 mt-2 animate-pulse" />
        </div>
        <div className="h-10 bg-muted rounded w-32 animate-pulse" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
