"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Particle interface defines the structure of a particle in the liquid border
 */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

/**
 * LiquidBorder component creates a more pronounced, animated border effect
 * that blends with the background
 */
export default function LiquidBorder() {
  const pathRef = useRef<SVGPathElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const updateParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const particleCount = 300; // Reduced particle count for a more relaxed effect

      // Initialize particles
      const initialParticles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1, // Reduced particle size
        speedX: (Math.random() - 0.5) * 0.2, // Increased horizontal speed
        speedY: (Math.random() - 0.5) * 0.05, // Reduced vertical speed
      }));
      setParticles(initialParticles);
    };

    const animate = () => {
      if (pathRef.current) {
        const time = Date.now() * 0.001; // Reduced animation speed
        const path = pathRef.current;

        const width = window.innerWidth;
        const height = window.innerHeight;

        let d = `M0,0 `;
        for (let i = 0; i <= width; i += 10) {
          // Increased step for a smoother curve
          const y = Math.sin(i * 0.01 + time) * 7; // Increased amplitude
          d += `L${i},${y} `;
        }
        d += `L${width},0 L${width},${height} `;
        for (let i = width; i >= 0; i -= 10) {
          // Increased step for a smoother curve
          const y = Math.sin(i * 0.01 + time) * 20 + height; // Increased amplitude
          d += `L${i},${y} `;
        }
        d += "Z";

        path.setAttribute("d", d);

        // Update particle positions
        setParticles((prevParticles) =>
          prevParticles.map((particle) => {
            let newX = particle.x + particle.speedX;
            let newY = particle.y + particle.speedY;

            // Bounce off edges
            if (newX < 0 || newX > width) particle.speedX *= -1;
            if (newY < 0 || newY > height) particle.speedY *= -1;

            return {
              ...particle,
              x: newX,
              y: newY,
            };
          }),
        );
      }
      requestAnimationFrame(animate);
    };

    updateParticles();
    animate();

    window.addEventListener("resize", updateParticles);

    return () => {
      window.removeEventListener("resize", updateParticles);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.5)" />
            <stop offset="50%" stopColor="rgba(255, 0, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0.5)" />
          </linearGradient>
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.7)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#borderGradient)"
          strokeWidth="3" // Reduced stroke width
          strokeLinecap="round"
        />
        {particles.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="url(#particleGradient)"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2" // Less blinking
              dur={`${Math.random() * 4 + 2}s`} // Smoother and slower animation duration
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
