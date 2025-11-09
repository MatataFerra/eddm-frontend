export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="h-12 w-1/2 bg-slate-500 my-8 mx-auto z-2  p-8 animate-pulse"></div>
      <div className="w-full md:max-w-1/2 mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-full min-h-60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
