export function GlowingBorderCard() {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "border-flow 2s linear infinite",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />
    </div>
  );
}
