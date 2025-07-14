import { BentoHome } from "@/components/blocks/home/bento";

export const revalidate = 60;

export default async function Page() {
  return (
    <>
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans">
        El diario de
        <span className="text-sky-500 ml-4">Mati</span>
      </h1>
      <BentoHome />
    </>
  );
}
