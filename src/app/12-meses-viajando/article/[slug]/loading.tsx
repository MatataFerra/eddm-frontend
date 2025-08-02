import { LoaderFive } from "@/components/ui/loader";

export default async function Loading() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <LoaderFive text="Cargando entrada..." />
    </section>
  );
}
