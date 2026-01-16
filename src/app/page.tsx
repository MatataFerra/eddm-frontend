import { BentoHome } from "@/components/blocks/home/bento";
import { ShareTitle } from "@/components/blocks/share/title";

export default async function Page() {
  return (
    <>
      <ShareTitle title="El diario de" glowWord="Mati" />
      <BentoHome />
    </>
  );
}
