"use client"
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Chatbot from "../components/ui/retro-chatbot";
import ThreeDHome from "../components/ui/3dHome";
import LiquidBorder from "@/components/ui/LiquidBorder";
import Scene from "@/components/ui/3dHome"
import { Canvas } from '@react-three/fiber';
import KinectPointCloud from "@/components/ui/KineticPointCloud";
import { Vector3 } from 'three'; 
import ClaudeCube from "@/components/ui/3D-UI/cube_claude"

import VoidCube from "@/components/ui/3D-UI/voidCube"
import Cube from "@/components/ui/3D-UI/cube"










const DynamicBackground = dynamic(() => import("@/components/ui/DynamicBackground"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            },
          }
        );
      }
    });
  }, []);

  // Adjust 3D model position and scale based on screen size
  const get3DModelProps = () => {
    if (windowSize.width < 768) { // Mobile
      return { position: [0, 3, 5], scale: [0.8, 0.8, 0.8] };
    } else if (windowSize.width < 1024) { // Tablet
      return { position: [-1, 4, 1], scale: [2, 2, 2] };
    } else { // Desktop
      return { position: [-2, 6,0], scale: [5, 5, 5 ] };
    }
  };

  const modelProps = get3DModelProps();

  return (
    <div className="relative">
      <LiquidBorder />
      <Chatbot />
      {[AboutSection, ExperienceSection, ProjectsSection, SkillsSection].map((Section, index) => (
        <div key={index} ref={(el) => { sectionRefs.current[index + 1] = el; }} className="relative">
          <Section />
        </div>
      ))}
      
   
      {/* <ClaudeCube /> */}
      <Cube />
    

      
      <div ref={(el) => { sectionRefs.current[4] = el; }} className="relative">
        <TestimonialsSection />
      </div>

      <div className="retro-card rounded-none overflow-hidden w-full p-8 bg-white mb-8 relative" style={{ height: '500px' }}>
        <Canvas>
          <KinectPointCloud />
        </Canvas>
      </div>
    </div>
  );
}
