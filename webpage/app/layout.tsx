import React, { ReactNode } from "react";
import { Metadata } from 'next'
import Script from 'next/script'
// import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../app/globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Rishab Singh - Portfolio',
  description: 'Explore the portfolio of Rishab Singh, a skilled software developer with six years of experience specializing in web development, AI, and data science.',
  keywords: 'Rishab Singh, software developer, web development, AI, data science, portfolio',
  authors: [{ name: 'Rishab Singh' }],
  openGraph: {
    title: 'Rishab Singh - Portfolio',
    description: 'Explore the portfolio of Rishab Singh, a skilled software developer specializing in web development, AI, and data science.',
    url: 'https://www.rishabsingh.com', // Replace with your actual URL
    siteName: 'Rishab Singh Portfolio',
    images: [
      {
        url: '/images/avatar.png', // Updated to point to the image in the assets folder
        width: 1200,
        height: 630,
        alt: 'Rishab Singh Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishab Singh - Portfolio',
    description: 'Explore the portfolio of Rishab Singh, a skilled software developer specializing in web development, AI, and data science.',
    creator: '@r3dhuu', // Replace with your Twitter handle
    
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/avatar.png',
    apple: '/avatar.png',
  },
}

interface LayoutProps {
  children: ReactNode;
}

export const viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q1JNBT19S2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q1JNBT19S2');
        `}
      </Script>
      <Analytics />
    </html>
  );
}
