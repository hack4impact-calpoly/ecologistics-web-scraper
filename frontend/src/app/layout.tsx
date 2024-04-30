import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import AuthProvider from "@/Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

//! Update metadata to match your project
export const metadata: Metadata = {
  title: "Ecologistics",
  description: "Ecologistics Web Scraper",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <Navbar />
          <div className="flex-1 px-20 py-5">{children}</div>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
