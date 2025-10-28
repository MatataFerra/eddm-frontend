import { BentoGrid } from "@/components/ui/bento-grid";
import { CardHome } from "./card";

const URL_IMAGES = {
  journey:
    "https://res.cloudinary.com/docq8rbdu/image/upload/c_fill,ar_4:3,g_auto/v1761650542/el-diario-de-mati/covers/db9v4ipmak7prxkneszd.webp",
  tales:
    "https://res.cloudinary.com/docq8rbdu/image/upload/v1761650558/el-diario-de-mati/covers/gfcda9nkco2qkuioe5xn.webp",
};

export function BentoHome() {
  return (
    <BentoGrid className="w-full md:max-w-3xl mx-auto p-1 last:col-span-2 auto-rows-[18rem] md:grid-cols-2 gap-4">
      <CardHome
        bgImage={URL_IMAGES.journey}
        description="Durante 2024 y 2025 estuve escribiendo todos los días lo que me pasaba, este es el resultado"
        title="Un año viajando"
        redirect="/12-meses-viajando"
      />
      <CardHome
        bgImage={URL_IMAGES.tales}
        description="Un compendio de cosas que fui escribiendo a lo largo de este tiempo"
        title="Relatos y notas"
        redirect="/relatos"
      />
    </BentoGrid>
  );
}
