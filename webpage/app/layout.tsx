import React, { ReactNode } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../app/globals.css"; // Add this line
import Head from "next/head";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rishab Singh',
  icons: {
    icon: '/image/avatar.png', // or '/favicon.png', '/icon.svg' etc.
  },
}

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/image/avatar.png" />
      </Head>
      <body className="min-h-screen flex flex-col">
        <div className="relative z-25">
          <Navbar />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
