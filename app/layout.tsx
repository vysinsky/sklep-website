import type { Metadata } from "next";
import Script from "next/script";
import { Rubik } from "next/font/google";
import "./global.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Vinný sklep "U dvou zvířat"',
    template: '%s | Vinný sklep "U dvou zvířat"',
  },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`antialiased ${rubik.className} bg-[#040e27]`}>
        <Header />
        <main className="bg-white min-h-[400px]">
          <div className="max-w-[1140px] mx-auto">{children}</div>
        </main>
        <Footer />
        <Script
          src="https://kit.fontawesome.com/92b97a7e25.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
