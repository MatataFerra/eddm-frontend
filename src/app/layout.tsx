import type { Metadata } from "next";

import "./globals.css";
import { Dancing_Script, Bebas_Neue, Poppins } from "next/font/google";
import { getContentNavigateArticles } from "@/lib/api_methods/get-articles";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { getContentNavigateTales } from "@/lib/api_methods/get-tales";
import { IndexContentProvider } from "@/components/blocks/index-content/context";
import type { ApiResponse } from "@/lib/fetch/caller";
import { RootDataProvider } from "@/lib/providers/root-data-provider";

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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const fonts = `${dancingScript.variable} ${bebasNeue.variable} ${poppins.variable} antialiased`;

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
      <body className={fonts}>
        <IndexContentProvider>
          <RootDataProvider articles={articles?.data || []} tales={tales?.data || []}>
            {children}
          </RootDataProvider>
        </IndexContentProvider>
      </body>
    </html>
  );
}
