import type { Metadata } from "next";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import "./globals.css";

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
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
