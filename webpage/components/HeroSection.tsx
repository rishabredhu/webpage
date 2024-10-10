"use client";
import React from "react";
import dynamic from "next/dynamic";

const HeroSection: React.FC = () => {
  const MotionP = dynamic(
    () => import("framer-motion").then((mod) => mod.motion.p),
    {
      ssr: false,
    },
  );

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 text-center text-white">
        <MotionP
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Passionate about creating innovative web solutions and bringing data
          to life through interactive visualizations.
        </MotionP>
      </div>
    </section>
  );
};

export default HeroSection;
