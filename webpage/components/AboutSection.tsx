"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Canvas } from '@react-three/fiber';

import ErrorBoundary from './ErrorBoundary'; // You'll need to create this component
import Faces2 from './ui/faces2';


const AboutSection: React.FC = () => {

  return (
    <section className="bg-white-200 py-20 ">
      
        <div className="flex items-center justify-center min-h-50 bg-transparent mb-6">
          <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden">
            <span className="relative z-10 glitch" data-text="About Me">
              About Me
            </span>
          </h2>
        </div>
        
          <div className="space-y-6 bg-white-700 dark:bg-white-700 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm leading-relaxed pixelated">
              Hello! I&apos;m Rishab Singh, a passionate software engineer with
              a Masters in Science in Computer Science from New York University. With a strong foundation in computer science and years of
              hands-on experience spanning from academic research to industry applications, I&apos;ve honed my skills in delivering products and solutions that are both scalable and user-friendly.

              
            </p>
            <p className="text-sm leading-relaxed pixelated">
              My journey in tech has been diverse and fulfilling, allowing me to work on a wide range of projects. From
              building responsive web applications to creating intricate 3D
              visualizations, I&apos;m always excited about the
              intersection of technology and creativity. 
            </p>
            
            <Button
              onClick={() =>
                window.open(process.env.NEXT_PUBLIC_RESUME_URL || "#", "_blank")
              }
              className="bg-green-500 hover:bg-purple-600 text-black font-bold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 ease-in-out"
            >
              <span className="text-xs pixelated">Download Resume</span>
            </Button>
            
            </div>
          
          {/* 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"> */}
        {/* <ErrorBoundary fallback={<FallbackComponent />}>
          <div className="canvas-container" style={{ width: '100%', height: '100vh' }}>
            <Canvas>

              <Faces2 />
            </Canvas>
            
          </div>
        </ErrorBoundary>
          
        </div> */}
      

    </section>
  );
};

// const FallbackComponent: React.FC = () => (
//   <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-800">
//     <p className="text-center pixelated">
//       Oops! Something went wrong with the 3D component.
//       <br />
//       Please try refreshing the page.
//     </p>
//   </div>
// );

export default AboutSection;
