export function TripHeader({ title, description }: { title: string; description: string | null }) {
  return (
    <div className="flex items-start justify-between gap-8 mb-10">
      <div className="flex-1">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white mb-6 tracking-tight leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl font-light">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
