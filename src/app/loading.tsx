export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 flex-col">
      <div className="h-16 w-1/2 my-8 mx-auto z-2 p-8"></div>
      <div className="w-full md:max-w-1/2 mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 justify-center w-full">
          <div className="size-full rounded-2xl border bg-zinc-700 border-zinc-600 dark:border-zinc-800 p-4 flex flex-col animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
