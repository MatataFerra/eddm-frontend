// app/loading.tsx
export default function RootLoading() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-8 px-6 text-center">
      {/* Skeleton del título */}
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="h-10 w-56 rounded-lg bg-zinc-300/30 dark:bg-zinc-700/40" />
        <div className="h-6 w-80 max-w-[80%] rounded-lg bg-zinc-300/20 dark:bg-zinc-700/30" />
        <div className="h-6 w-64 max-w-[70%] rounded-lg bg-zinc-300/20 dark:bg-zinc-700/30" />
      </div>

      {/* Texto suave */}
      <p className="text-lg text-zinc-600 dark:text-zinc-400 animate-fade-in">
        Cargando contenido…
      </p>

      {/* Spinner */}
      <div className="h-12 w-12 border-4 border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin" />
    </section>
  );
}
