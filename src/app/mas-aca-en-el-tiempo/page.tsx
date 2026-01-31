import { FurtherContainer } from "@/components/blocks/further-in-time/further-container";
import { Nav } from "@/components/blocks/share/nav";

export default function BlogPage() {
  return (
    <>
      <div className="min-h-screen px-4 sm:px-6 lg:px-12">
        <Nav />
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 tracking-tight">
              Historias que están
              <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Pasando
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
              Historías que pasaron recientemente y que quizás no sean correlativas.
            </p>
          </div>
        </div>

        <FurtherContainer />
      </div>
    </>
  );
}
