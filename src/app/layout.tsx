import type { Metadata } from "next";

import "./globals.css";
import { Geist, Geist_Mono, Dancing_Script, Bebas_Neue } from "next/font/google";
import { ArticlesProvider } from "@/lib/providers/articles-provider";
import { TalesProvider } from "@/lib/providers/tales-provider";
import { getArticles } from "@/lib/api_methods/get-articles";
import { Article } from "@/lib/interfaces/articles";
import { getTales } from "@/lib/api_methods/get-tales";
import { IndexContentProvider } from "@/components/ui/index-content/context";
import { SWRProvider } from "@/lib/providers/swr-provider";
import type { ApiResponse } from "@/lib/fetch";

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
  const [articles, tales] = await Promise.all([
    getArticles<ApiResponse<Article[]>>(),
    getTales<ApiResponse<Article[]>>(),
  ]);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${bebasNeue.variable} antialiased`}>
        <SWRProvider>
          <IndexContentProvider>
            <TalesProvider tales={tales?.data || []}>
              <ArticlesProvider articles={articles?.data || []}>{children}</ArticlesProvider>
            </TalesProvider>
          </IndexContentProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
