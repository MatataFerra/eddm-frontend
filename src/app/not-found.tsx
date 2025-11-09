"use cache";

import Link from "next/link";

// app/not-found.tsx
export default async function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black text-foreground px-6">
      <h1 className="text-6xl md:text-7xl font-bold tracking-tight">404</h1>

      <p className="mt-4 text-lg text-muted-foreground">
        Esta página no forma parte de <span className="font-semibold">El Diario de Mati</span>.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-foreground/20 px-6 py-2 text-sm font-medium transition-all hover:bg-foreground hover:text-background">
        Volver al inicio
      </Link>

      <p className="mt-8 text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} El Diario de Mati
      </p>
    </main>
  );
}
