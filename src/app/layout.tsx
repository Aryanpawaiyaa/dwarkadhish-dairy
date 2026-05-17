import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Dwarkadhish Dairy - Purity, Perfected",
  description: "Gram Lawan's finest, delivered from the heart of Madhya Pradesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground`}>
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
