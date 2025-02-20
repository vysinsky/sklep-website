import type { Metadata } from "next";
import Script from "next/script";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
});

import "./global.css";

import Header from "@/components/Header";

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
      <body className={`antialiased ${rubik.className}`}>
        <Header />
        {children}
        <Script
          src="https://kit.fontawesome.com/92b97a7e25.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
