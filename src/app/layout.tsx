import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { SiteHeaderSkeleton } from "@/components/loading-skeletons";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const displayFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arsip Konser Love Live",
  description: "Arsip konser Love Live bergaya streaming untuk koleksi pribadi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen text-foreground">
            <Suspense fallback={<SiteHeaderSkeleton />}>
              <SiteHeader />
            </Suspense>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
