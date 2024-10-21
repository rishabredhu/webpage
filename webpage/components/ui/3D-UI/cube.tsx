"use client";

import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  Html,
} from "@react-three/drei";
import { useControls } from "leva";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import * as GeometryUtils from "three/examples/jsm/utils/GeometryUtils";

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

useGLTF.preload("/3d-assets/night-desk.glb");
useGLTF.preload("/3d-assets/spaceman.glb");
useGLTF.preload("/3d-assets/desk.glb");
useGLTF.preload("/3d-assets/laptop.glb");
useGLTF.preload("/3d-assets/treeDesk.glb");

const EDITABLE_PROPERTIES = {
  DESK_SCALE: new THREE.Vector3(4, 4, 4),
  DESK_POSITION: new THREE.Vector3(0, -2, 0),
  DESK_ROTATION: new THREE.Vector3(0, 0, 0),
  CUBOID_SIZE: new THREE.Vector3(15, 15, 15),
  CAMERA_POSITION: new THREE.Vector3(20, 20, -20), // Zoomed in position
  HILBERT_CURVE_SIZE: 9,
  HILBERT_CURVE_ITERATIONS: 1.5,
  SPARKLE_COUNT: 5000,
  MODULE_SCALE: new THREE.Vector3(2, 2, 2),
  MODULE_POSITIONS: [
    new THREE.Vector3(-10, -1, 6),
    new THREE.Vector3(10, 10, 0),
    new THREE.Vector3(-10, -5, 0),
    new THREE.Vector3(-10, -7, 2),
  ],
  MODELS: [
    "/3d-assets/spaceman.glb",
    "/3d-assets/laptop.glb",
    "/3d-assets/treeDesk.glb",
    "/3d-assets/desk.glb",
  ],
  LIGHT_INTENSITY: 0.005, // Intensity of the directional light
  FOG_DENSITY: 0.8, // Density of the fog
  SPARKLE_SIZE: 0.05, // Size of the sparkles
  BACKGROUND_COLOR: "white", // Background color of the scene
  FOG_COLOR: "white", // Color of the fog
  CAMERA_FOV: 75, // Field of view for the camera
  AMBIENT_LIGHT_INTENSITY: 0.1, // Intensity of the ambient light
  SPARKLE_PARTICLE_SIZE: 0.001, // Size of each sparkle particle
  MODEL_SIZES: {
    // Sizes for each model
    spaceman: new THREE.Vector3(1, 1, 1), // Size for spaceman model
    laptop: new THREE.Vector3(1, 1, 1), // Size for laptop model
    treeDesk: new THREE.Vector3(1, 1, 1), // Size for treeDesk model
    desk: new THREE.Vector3(1, 1, 1), // Size for desk model
  },
};

function Desk() {
  const deskRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3d-assets/night-desk.glb") as GLTFResult;

  useEffect(() => {
    if (deskRef.current) {
      deskRef.current.position.copy(EDITABLE_PROPERTIES.DESK_POSITION);
      deskRef.current.scale.copy(EDITABLE_PROPERTIES.DESK_SCALE);
      deskRef.current.rotation.set(
        THREE.MathUtils.degToRad(EDITABLE_PROPERTIES.DESK_ROTATION.x),
        THREE.MathUtils.degToRad(EDITABLE_PROPERTIES.DESK_ROTATION.y),
        THREE.MathUtils.degToRad(EDITABLE_PROPERTIES.DESK_ROTATION.z),
      );
    }
  }, []);

  return (
    <group ref={deskRef}>
      <primitive object={scene} />
    </group>
  );
}

function HilbertCurve() {
  const curveRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (curveRef.current) {
      const size = EDITABLE_PROPERTIES.HILBERT_CURVE_SIZE;
      const iterations = EDITABLE_PROPERTIES.HILBERT_CURVE_ITERATIONS;
      const points = GeometryUtils.hilbert3D(
        new THREE.Vector3(0, 0, 0),
        size,
        iterations,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      );
      const spline = new THREE.CatmullRomCurve3(points);
      const samples = spline.getPoints(points.length * 6);
      const geometry = new THREE.BufferGeometry().setFromPoints(samples);
      const material = new THREE.LineBasicMaterial({ color: "purple" });

      const line = new THREE.Line(geometry, material);

      curveRef.current.add(line);
    }
  }, []);

  useFrame((state) => {
    if (curveRef.current) {
      curveRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return <group ref={curveRef} />;
}

function Sparkles() {
  const { SPARKLE_COUNT, CUBOID_SIZE } = EDITABLE_PROPERTIES;
  const sparklesRef = useRef<THREE.Points>(null);

  const [positions, colors] = React.useMemo(() => {
    const positions = new Float32Array(SPARKLE_COUNT * 3);
    const colors = new Float32Array(SPARKLE_COUNT * 3);

    for (let i = 0; i < SPARKLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * CUBOID_SIZE.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * CUBOID_SIZE.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * CUBOID_SIZE.z;

      colors[i * 3] = 1; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i * 3 + 2] = 0; // B
    }

    return [positions, colors];
  }, [SPARKLE_COUNT, CUBOID_SIZE]);

  useFrame(({ clock }) => {
    if (sparklesRef.current) {
      const time = clock.getElapsedTime();
      const positions = sparklesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < SPARKLE_COUNT; i++) {
        const i3 = i * 3;
        positions[i3 + 1] =
          ((positions[i3 + 1] + CUBOID_SIZE.y / 2) % CUBOID_SIZE.y) -
          CUBOID_SIZE.y / 2;
        positions[i3] += Math.sin(time + i) * 0.01;
        positions[i3 + 2] += Math.cos(time + i) * 0.01;
      }

      sparklesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={sparklesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors />
    </points>
  );
}

function Module({
  modelPath,
  position,
}: {
  modelPath: string;
  position: THREE.Vector3;
}) {
  const { scene } = useGLTF(modelPath) as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(position);
      groupRef.current.scale.copy(EDITABLE_PROPERTIES.MODULE_SCALE);
    }
  }, [position]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function Cube() {
  return (
    <div className="scene-container">
      {/* <div className="text-orange-400 font-bold text-lg">
        <GlitchText>UNDER CONSTRUCTION </GlitchText>
        <span>[--- ZOOM IN TO SEE MORE]</span>
      </div> */}
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={EDITABLE_PROPERTIES.CAMERA_POSITION}
          fov={45}
          near={0.01}
          far={1000}
        />
        <Suspense fallback={null}>
          <color attach="background" args={["black"]} />
          <fog attach="fog" args={["white", 20, 30]} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <group position={[0, 0, 0]}>
            <Desk />
            <HilbertCurve />
            <Sparkles />
            {EDITABLE_PROPERTIES.MODELS.map((modelPath, index) => (
              <Module
                key={index}
                modelPath={modelPath}
                position={
                  EDITABLE_PROPERTIES.MODULE_POSITIONS[
                    index % EDITABLE_PROPERTIES.MODULE_POSITIONS.length
                  ]
                }
              />
            ))}
          </group>

          {/* <Html style={{ position: 'absolute', top: '10px', right: '10px', pointerEvents: 'none', background: 'rgba(255, 255, 255, 0.2)', padding: '10px', borderRadius: '8px' }}>
                      <div className="text-green-400 font-bold text-sm">
                        <GlitchText>ZOOM IN</GlitchText>
                      </div>
                  </Html> */}
        </Suspense>
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
      <style jsx>{`
        .scene-container {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          background-color: white;
          border: none;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        canvas {
          width: 100%;
          height: 100%;
        }

        .text-orange-400 {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          text-align: center;
        }

        @media (max-width: 768px) {
          .text-orange-400 {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Cube;

const GlitchText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [glitchedText, setGlitchedText] = useState(children);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const text = children?.toString() || "";
      const glitchedChars = text.split("").map((char) => {
        return Math.random() < 0.1
          ? String.fromCharCode(Math.floor(Math.random() * 26) + 65)
          : char;
      });
      setGlitchedText(glitchedChars.join(""));
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [children]);

  return <span className="glitch">{glitchedText}</span>;
};
