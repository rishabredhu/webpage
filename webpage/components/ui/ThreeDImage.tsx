import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Plane, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { extend } from "@react-three/fiber";

// Extend the Canvas component to avoid the error
extend({ Canvas });

// Debug component to log camera position
const CameraLogger = () => {
  const { camera } = useThree();
  useFrame(() => {
    console.log("Camera position:", camera.position);
  });
  return null;
};

export default function ThreeDImage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("ThreeDImage component mounted");

    // Override console.error to suppress specific errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "string" &&
        args[0].includes("Next.js routing")
      ) {
        console.log("Suppressed Next.js routing error:", args[0]);
        return;
      }
      originalConsoleError(...args);
    };

    // Override window.onerror to suppress specific errors
    const originalWindowOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (
        message &&
        typeof message === "string" &&
        message.includes("Next.js routing")
      ) {
        console.log(
          "Suppressed Next.js routing error in window.onerror:",
          message,
        );
        return true;
      }
      if (originalWindowOnError) {
        return originalWindowOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Cleanup function
    return () => {
      console.log("ThreeDImage component unmounted");
      console.error = originalConsoleError;
      window.onerror = originalWindowOnError;
    };
  }, []);

  const imgUrl = "/images/profile1.jpeg";
  const depthUrl = "/images/profile1-depth.png";

  const [texture, depthMap] = useLoader(TextureLoader, [imgUrl, depthUrl]);

  useEffect(() => {
    console.log("Texture loaded:", texture);
    console.log("Depth map loaded:", depthMap);
  }, [texture, depthMap]);

  return (
    <Canvas
      ref={canvasRef}
      style={{ height: "100vh", width: "100vw" }}
      onCreated={(state) => console.log("Canvas created:", state)}
    >
      <Suspense fallback={<DebugFallback />}>
        <CameraLogger />
        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.4} />
        <Plane args={[5, 5, 64, 64]}>
          <meshStandardMaterial
            map={texture}
            displacementMap={depthMap}
            displacementScale={0.5}
          />
        </Plane>
        <OrbitControls
          enableZoom={true}
          onChange={() => console.log("OrbitControls changed")}
        />
      </Suspense>
    </Canvas>
  );
}

// Debug fallback component
const DebugFallback = () => {
  console.log("Fallback component rendered");
  return null;
};
