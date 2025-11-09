import { LoaderFive } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center px-6 flex-col">
      <div className="grid grid-cols-1 gap-4 justify-center size-1/2">
        <div className="size-full justify-center items-center text-center rounded-2xl border bg-zinc-700 border-zinc-600 dark:border-zinc-800 p-4 flex flex-col animate-pulse">
          <LoaderFive text="Cargando contenido" />
          <p className="text-center text-zinc-400">Por favor espera...</p>
        </div>
      </div>
    </div>
  );
}
