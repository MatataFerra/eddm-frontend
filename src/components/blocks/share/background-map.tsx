import Image from "next/image";

export function BackgroundMap() {
  return (
    <div className="fixed inset-0 -z-1 pointer-events-none overflow-hidden bg-gray-100/5 bg-[radial-gradient(circle_at_top,rgba(255,180,80,0.1),transparent_90%)]">
      <div className="absolute inset-0 mix-blend-overlay">
        <Image
          src="/fondo-mini-dark.webp"
          alt="Mapa de fondo"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
