import { Calendar } from "lucide-react";

export function CreatedAtCard({ createdAt }: { createdAt: string }) {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "long",
    }).format(new Date(dateString));
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-white/20 transition-all">
      <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/30">
            <Calendar className="w-5 h-5 text-pink-400" />
          </div>
          <span className="text-sm text-white/50 font-light uppercase tracking-wider">Creado</span>
        </div>
        <div className="text-base font-light text-white/90 leading-relaxed">
          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
}
