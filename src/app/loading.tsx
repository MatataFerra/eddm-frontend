export default function LoadingFallback() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="h-6 w-40 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

      <p className="text-lg text-zinc-600 dark:text-zinc-400">Cargando contenido…</p>

      <div className="h-10 w-10 border-4 border-zinc-300 dark:border-zinc-700 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
