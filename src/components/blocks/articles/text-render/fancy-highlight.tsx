export function FancyHighlightSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block z-0 px-1 mx-0.5 rounded font-bold text-white">
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/90 to-fuchsia-500/90 -skew-y-2 rounded-sm shadow-sm blur-[0.5px]"></span>
      <span className="relative z-10 drop-shadow-sm">{children}</span>
    </span>
  );
}
