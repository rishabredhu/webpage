// Start of Selection
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const ClaudeCube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let composer: EffectComposer;
    let cube: THREE.Mesh;
    let model: THREE.Object3D;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff); // White background
      scene.fog = new THREE.FogExp2(0x8000ff, 0.05); // Purple fog

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.01,
        1000,
      );
      camera.position.set(0, 0, 10);

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current?.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight("white", 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Neon cube
      const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8000ff,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // GLB Loader
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
      );

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        "3d-assets/desk.glb",
        (gltf) => {
          model = gltf.scene;
          scene.add(model);

          // Rotate the model towards the screen
          model.rotation.y = Math.PI; // Rotate 180 degrees around Y-axis

          // Scale and position the model to fit inside the cube
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const scale = 4 / Math.max(size.x, size.y, size.z);
          model.scale.setScalar(scale);

          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center.multiplyScalar(scale));

          setLoading(false);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.error("An error happened", error);
          setLoading(false);
        },
      );

      // Post-processing
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85,
      );
      composer.addPass(bloomPass);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (cube && model) {
        // Rotate the cube
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;

        // Make the model float inside the cube
        const time = Date.now() * 0.001;
        model.position.y = Math.sin(time) * 0.2;
      }

      controls.update();
      composer.render();
    };

    init();
    animate();

    const handleResize = () => {
      if (camera && renderer && composer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <div ref={mountRef} className="w-full h-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl text-cyan-400 font-mono animate-pulse">
              Loading...
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
      </div>
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xl">
        <GlitchText>DYSTOPIAN FUTURE</GlitchText>
      </div>
      <div className="absolute bottom-4 right-4 text-purple-400 font-mono text-sm">
        <GlitchText>2077.10.23</GlitchText>
      </div>
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button className="px-4 py-2 bg-cyan-600 text-cyan-100 font-mono text-sm hover:bg-cyan-500 transition-colors duration-200">
          INITIALIZE
        </button>
        <button className="px-4 py-2 bg-purple-600 text-purple-100 font-mono text-sm hover:bg-purple-500 transition-colors duration-200">
          TERMINATE
        </button>
      </div>
    </div>
  );
};

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

export default ClaudeCube;
