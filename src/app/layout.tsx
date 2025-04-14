import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ArticlesProvider } from "@/lib/providers/articles-provider";
import { getArticles } from "@/lib/api_methods/get-articles";
import { Article } from "@/lib/interfaces/articles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dancing",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El diario de Mati",
  description: "Un blog dedicado a retratar mi viaje por este universo que soy yo mismo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const articles = await getArticles<Article[]>();
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${bebasNeue.variable} antialiased p-8 overflow-auto!`}>
        <ArticlesProvider articles={articles}>{children}</ArticlesProvider>
      </body>
    </html>
  );
}
