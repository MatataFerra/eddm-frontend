import { LoaderFive } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center px-6 flex-col">
      <div className="grid grid-cols-1 gap-4 justify-center size-1/2">
        <div className="size-full justify-center items-center text-center p-4 flex flex-col">
          <LoaderFive text="Cargando contenido" />
          <p className="text-center text-zinc-400">Por favor espera...</p>
        </div>
      </div>
    </div>
  );
}
