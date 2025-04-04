import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArticlesProvider } from "@/lib/providers/articles-provider";
import { getArticles } from "@/lib/api_methods/get-articles";
import { Article } from "@/lib/interfaces/articles";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-8 space-y-8 overflow-auto!`}>
        <ArticlesProvider articles={articles}>{children}</ArticlesProvider>
      </body>
    </html>
  );
}
