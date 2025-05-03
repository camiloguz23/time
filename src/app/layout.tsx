import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Time - Gestión de Tiempo",
  description: "Sistema de gestión de tiempo para empresas y equipos. Rastrea, analiza y optimiza el uso del tiempo en tu organización.",
  keywords: "gestión de tiempo, productividad, seguimiento de tiempo, análisis de tiempo, optimización de tiempo, gestión de proyectos",
  authors: [{ name: "Camilo Guzman" }],
  creator: "Camilo Guzman",
  publisher: "Camilo Guzman",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://time.com",
    title: "Time - Gestión de Tiempo",
    description: "Sistema de gestión de tiempo para empresas y equipos. Rastrea, analiza y optimiza el uso del tiempo en tu organización.",
    siteName: "Time",
    images: [
      {
        url: "https://ipeoutbcqqvvuovfxeau.supabase.co/storage/v1/object/public/img//logo.png",
        width: 1200,
        height: 630,
        alt: "Time - Gestión de Tiempo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Time - Gestión de Tiempo",
    description: "Sistema de gestión de tiempo para empresas y equipos. Rastrea, analiza y optimiza el uso del tiempo en tu organización.",
    images: ["https://ipeoutbcqqvvuovfxeau.supabase.co/storage/v1/object/public/img//logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
