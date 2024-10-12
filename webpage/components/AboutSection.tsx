"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Canvas } from "@react-three/fiber";

import ErrorBoundary from "./ErrorBoundary"; // You'll need to create this component
import Faces2 from "./ui/faces2";
import Chatbot from "./ui/retro-chatbot";
import { RecentActivity } from "./RecentActivity";


const AboutSection: React.FC = () => {
  return (
    <section className="bg-white-200 py-10">
      <div className="flex items-center justify-center min-h-50 bg-transparent mb-6">
        <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden">
          <span className="relative z-10 glitch" data-text="About Me">
            Hi, it's Rishab here!
          </span>
          
        </h2>
      </div>

      <div className="space-y-6 bg-white-700 dark:bg-white-700 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-sm leading-relaxed pixelated">
          I am a software engineer with a <strong>MS in Computer Science</strong> from  
          <strong><span className="text-violet-500"> New York University</span></strong>. I enjoy problem solving and creative thinking.
          With over six years of experience in Software Engineering, Data Engineering, and AI, I specialize in building high-throughput data pipelines and interactive dashboards that drive impactful insights. I blend technical expertise with creative problem-solving to deliver innovative solutions that make a real difference.
        </p>
        <p className="text-sm leading-relaxed pixelated">
          Beyond the code, I enjoy staying abreast of the latest advancements in AI, sharing a good laugh with my team, and exploring the city with my dog. Driven by a relentless curiosity and a desire to grow, I thrive in dynamic environments where technology and creativity intersect.
        </p>
      </div>

      <div className="mt-6">
        <RecentActivity />
      </div>
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
