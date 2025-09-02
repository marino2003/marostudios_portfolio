import { Geist, Geist_Mono } from "next/font/google";
import { DM_Serif_Text, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerifText.variable} ${inter.variable} antialiased`}
      >
        <LenisProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
