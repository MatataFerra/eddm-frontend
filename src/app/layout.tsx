import type { Metadata } from "next";

import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { getContentNavigateArticles } from "@/lib/api_methods/get-articles";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { getContentNavigateTales } from "@/lib/api_methods/get-tales";
import { IndexContentProvider } from "@/components/blocks/index-content/context";
import type { ApiResponse } from "@/lib/fetch/caller";
import { RootDataProvider } from "@/lib/providers/root-data-provider";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundMap } from "@/components/blocks/share/background-map";
import { getContentNavigateFurtherTimeArticles } from "@/lib/api_methods/get-further-time-articles";
import { LocalStorageConfigProvider } from "@/lib/providers/local-storage-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
  const [articles, tales, furtherTime] = await Promise.all([
    getContentNavigateArticles<ApiResponse<ContentNavigate[]>>(),
    getContentNavigateTales<ApiResponse<ContentNavigate[]>>(),
    getContentNavigateFurtherTimeArticles<ApiResponse<ContentNavigate[]>>(),
  ]);

  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} relative antialiased bg-background text-foreground font-playfair`}>
        <LocalStorageConfigProvider>
          <IndexContentProvider>
            <RootDataProvider
              articles={articles?.data || []}
              tales={tales?.data || []}
              furtherTimeArticles={furtherTime?.data || []}>
              <BackgroundMap />
              {children}
              <Toaster richColors />
            </RootDataProvider>
          </IndexContentProvider>
        </LocalStorageConfigProvider>
      </body>
    </html>
  );
}
