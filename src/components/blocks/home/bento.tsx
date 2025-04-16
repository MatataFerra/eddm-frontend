import { BentoGrid } from "@/components/ui/bento-grid";
import { CardHome } from "./card";

export function BentoHome() {
  return (
    <BentoGrid className="w-full md:max-w-3xl mx-auto p-1 last:col-span-2 auto-rows-[18rem] md:grid-cols-2 gap-4">
      <CardHome
        bgImage="https://res.cloudinary.com/docq8rbdu/image/upload/v1744794947/el-diario-de-mati/covers/gtjb44pn7ekmziquxkaj.png"
        description="Durante 2024 y 2025 estuve escribiendo todos los días lo que me pasaba, este es el resultado"
        title="Un año viajando"
        redirect="/12-meses-viajando"
      />
      <CardHome
        bgImage="https://res.cloudinary.com/docq8rbdu/image/upload/v1744794947/el-diario-de-mati/covers/ypugvdv2fxbydokvgwtt.png"
        description="Un compendio de cosas que fui escribiendo a lo largo de este tiempo"
        title="Relatos y notas"
        redirect="/relatos"
      />
    </BentoGrid>
  );
}
