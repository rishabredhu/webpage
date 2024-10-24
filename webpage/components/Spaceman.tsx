// Start of Selection
"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

// Define the type for our GLTF result
type GLTFResult = GLTF & {
  nodes: {
    Spaceman: Mesh;
  };
  materials: {
    Spaceman: THREE.Material;
  };
};

// Preload the spaceman model
useGLTF.preload("/3d-assets/spaceman.glb");

/**
 * Spaceman component: Renders a 3D spaceman model
 * @param {Vector3} scale - The scale of the spaceman model
 * @param {Vector3} position - The position of the spaceman model
 */
export function Spaceman({
  scale,
  position,
}: {
  scale: Vector3;
  position: Vector3;
}) {
  const spacemanRef = useRef<Mesh>(null);
  const { scene, animations } = useGLTF(
    "/3d-assets/spaceman.glb",
  ) as GLTFResult;
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    if (actions["Idle"]) {
      actions["Idle"].play();
    }
  }, [actions]);

  return (
    <mesh
      ref={spacemanRef}
      position={position}
      scale={scale}
      rotation={[0, 2.2, 0]}
    >
      <primitive object={scene} />
    </mesh>
  );
}

/**
 * CanvasLoader component: Renders a placeholder while the main scene is loading
 */
export function CanvasLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

interface SpaceSceneProps {
  scaleVector: Vector3;
  positionVector: Vector3;
}

const SpaceScene: React.FC<SpaceSceneProps> = ({
  scaleVector: initialScaleVector,
  positionVector: initialPositionVector,
}) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scaleVector, setScaleVector] = useState(initialScaleVector);
  const [positionVector, setPositionVector] = useState(initialPositionVector);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const rotationXValue = scrollTop * -0.0006;
        const rotationYValue = scrollTop * -0.00075;
        setRotationX(rotationXValue);
        setRotationY(rotationYValue);
      }
    };

    const handleResize = () => {
      let newScale: Vector3;
      let newPosition: Vector3;

      if (window.innerWidth < 768) {
        newScale = new Vector3(1, 1, 1);
        newPosition = new Vector3(0.2, -0.1, 0);
      } else if (window.innerWidth < 1024) {
        newScale = new Vector3(1.33, 1.33, 1.33);
        newPosition = new Vector3(0.2, -0.3, 0);
      } else if (window.innerWidth < 1280) {
        newScale = new Vector3(1.5, 1.5, 1.5);
        newPosition = new Vector3(0.2, -0.4, 0);
      } else if (window.innerWidth < 1536) {
        newScale = new Vector3(1.66, 1.66, 1.66);
        newPosition = new Vector3(0.2, -0.5, 0);
      } else {
        newScale = new Vector3(2, 2, 2);
        newPosition = new Vector3(0.2, -0.7, 0);
      }

      // Update the scaleVector and positionVector state
      setScaleVector(newScale);
      setPositionVector(newPosition);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{ width: "100vw", height: "100vh", overflow: "auto" }}
    >
      <Canvas
        className="w-full h-screen bg-transparent z-10"
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Directional light simulates sunlight */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          {/* Ambient light provides overall illumination */}
          <ambientLight intensity={0.5} />
          {/* Point light emits light in all directions from a single point */}
          <pointLight position={[10, 5, 10]} intensity={2} />
          {/* Spot light creates a cone of light */}
          <spotLight
            position={new Vector3(0, 50, 10)}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          {/* Hemisphere light simulates sky and ground reflection */}
          <hemisphereLight args={["#b1e1ff", "#000000", 1]} />
          {/* Helper Axes */}
          <axesHelper args={[5]} />
          {/* Spaceman model with dynamic scale and position */}
          <Spaceman scale={scaleVector} position={positionVector} />
          {/* Light speed effect component */}
        </Suspense>
      </Canvas>
    </div>
  );
};

interface SpaceSceneProps {
  scaleVector: Vector3;
  positionVector: Vector3;
}

export default SpaceScene;
