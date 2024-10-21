"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Spaceman({ scale, position }: { scale: Vector3; position: Vector3 }) {
  const spacemanRef = useRef<Mesh>(null);
  const { scene, nodes, materials } = useGLTF("/3d-assets/spaceman.glb");
  const { camera } = useThree();

  useEffect(() => {
    if (scene) {
      console.log("Spaceman model loaded successfully");
      console.log("Nodes:", nodes);
      console.log("Materials:", materials);
    }
  }, [scene, nodes, materials]);

  useFrame((state) => {
    if (spacemanRef.current) {
      spacemanRef.current.rotation.y += 0.05;
      spacemanRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  useEffect(() => {
    if (spacemanRef.current) {
      gsap.to(spacemanRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (spacemanRef.current) {
            gsap.to(spacemanRef.current.position, {
              x: Math.sin(self.progress * Math.PI * 2) * 1.5,
              z: Math.cos(self.progress * Math.PI * 2) * 1.5,
              duration: 0.5,
            });
          }
          gsap.to(camera.position, {
            x: Math.sin(self.progress * Math.PI * 2) * 3,
            z: Math.cos(self.progress * Math.PI * 2) * 3 + 5,
            y: self.progress * 2,
            duration: 0.5,
          });
        },
      });
    }
  }, [camera]);

  return (
    <mesh ref={spacemanRef} position={position} scale={scale}>
      <primitive object={scene} />
    </mesh>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Spaceman
            scale={new Vector3(1.5, 1.5, 1.5)}
            position={new Vector3(0, 0, 0)}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
