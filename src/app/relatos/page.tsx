import { Nav } from "@/components/blocks/share/nav";
import { ListTales } from "@/components/blocks/tales/list";

export default async function Page() {
  return (
    <>
      <Nav />
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans ">
        Relatos y escritos
      </h1>
      <ListTales />
    </>
  );
}
