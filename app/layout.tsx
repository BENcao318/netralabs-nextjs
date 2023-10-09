import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./api/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Netra Labs App",
  description: "Powered by Netra Labs - Ben Cao",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} mx-auto bg-slate-900 font-sans text-slate-200`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
