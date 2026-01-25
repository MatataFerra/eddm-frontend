import { MapPin } from "lucide-react";

export function StopLenCard({ stopsLength }: { stopsLength: number }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-white/20 transition-all">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <MapPin className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-sm text-white/50 font-light uppercase tracking-wider">
            Destinos
          </span>
        </div>
        <div className="text-4xl font-light text-white">
          {stopsLength}
          <span className="text-lg text-white/40 ml-2">paradas</span>
        </div>
      </div>
    </div>
  );
}
