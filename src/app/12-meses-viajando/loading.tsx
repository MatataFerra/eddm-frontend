export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 flex-col">
      <div className="h-16 w-1/2 bg-slate-300 my-8 mx-auto z-2 p-8 animate-pulse"></div>
      <div className="w-full md:max-w-5xl max-w-2xl mx-auto p-4 grid grid-cols-1 last:col-span-2 auto-rows-[16rem] md:auto-rows-[18rem] md:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="size-full p-4 rounded-lg shadow-lg bg-zinc-700 border-zinc-600 dark:border-zinc-800 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
