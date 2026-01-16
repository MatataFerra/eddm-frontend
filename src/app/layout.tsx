import type { Metadata } from "next";

import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";
import { getContentNavigateArticles } from "@/lib/api_methods/get-articles";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { getContentNavigateTales } from "@/lib/api_methods/get-tales";
import { IndexContentProvider } from "@/components/blocks/index-content/context";
import type { ApiResponse } from "@/lib/fetch/caller";
import { RootDataProvider } from "@/lib/providers/root-data-provider";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
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
  const [articles, tales] = await Promise.all([
    getContentNavigateArticles<ApiResponse<ContentNavigate[]>>(),
    getContentNavigateTales<ApiResponse<ContentNavigate[]>>(),
  ]);

  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased bg-background text-foreground font-playfair`}>
        <IndexContentProvider>
          <RootDataProvider articles={articles?.data || []} tales={tales?.data || []}>
            {children}
            <Toaster richColors />
          </RootDataProvider>
        </IndexContentProvider>
      </body>
    </html>
  );
}
