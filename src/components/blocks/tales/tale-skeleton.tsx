function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-slate-700/30 ${className}`} />;
}

// ---- Loaders
export function HeaderLoader() {
  return (
    <header className="grid grid-cols-1 grid-rows-1 min-h-96 max-h-96 m-8 relative overflow-hidden rounded-2xl">
      <Skeleton className="col-start-1 col-end-2 row-start-1 row-end-auto h-80" />
      <Skeleton className="col-start-1 col-end-2 row-start-1 row-end-auto h-10 w-2/3 mx-auto self-center z-10" />
    </header>
  );
}

export function SummaryLoader() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-2">
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}

export function ContentLoader() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-3">
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-8/12" />
      <Skeleton className="h-4 w-7/12" />
      <Skeleton className="h-4 w-6/12" />
      <Skeleton className="h-4 w-5/12" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-8/12" />
      <Skeleton className="h-4 w-7/12" />
      <Skeleton className="h-4 w-6/12" />
    </div>
  );
}
