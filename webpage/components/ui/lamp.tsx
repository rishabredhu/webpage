import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const LampPost = ({ rotationY }: { rotationY: number }) => {
  const gltf = useGLTF("/3d-assets/lamp.glb"); // Replace with your actual file path
  const modelRef = useRef<THREE.Mesh | null>(null);

  // Animate the model to float slowly up and down and rotate
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        Math.sin(state.clock.getElapsedTime()) * 0.1 - 0.8; // Adjust height here
      modelRef.current.rotation.y = THREE.MathUtils.degToRad(rotationY); // Rotate around the y axis by degrees
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[6, 10, 9]} // Adjust the scale here
      position={[-4, 6, -10]} // Adjust position here
    />
  );
};

const Lamp = ({ rotationY = 180 }: { rotationY?: number }) => {
  return (
    <Canvas
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: -1, // Make sure it's behind the content
        width: "100vw",
        height: "100vh",
      }}
      camera={{ position: [0, 0, 5], fov: 75 }} // Adjust camera to control zoom/angle
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <LampPost rotationY={rotationY} />
      <OrbitControls enableZoom={false} enableRotate={true} />{" "}
      {/* Disables zoom and rotation */}
    </Canvas>
  );
};

export default Lamp;
