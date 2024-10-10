import React, { ReactNode } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toggle } from "../components/ui/toggle";
import "../app/globals.css"; // Add this line

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
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
