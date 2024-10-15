import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Scene: React.FC = () => {
  // Refs and state setup
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraDetails, setCameraDetails] = useState<string>('Camera Position: x=-0.95, y=0.51, z=1.88');
  const [modelDetails, setModelDetails] = useState<string>('Model Center: x=0, y=0, z=0, Size: x=0, y=0, z=0');
  const modelRef = useRef<THREE.Group | null>(null);
  const boxHelperRef = useRef<THREE.BoxHelper | null>(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.set(0, 5, 10); // Ensure the camera is positioned to view the model
    camera.lookAt(scene.position); // Make the camera look at the center of the scene

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to window size
    renderer.setClearColor(0xffffff); // Set background color to white
    mountRef.current?.appendChild(renderer.domElement); // Append renderer to the DOM

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25; // Damping factor
    controls.screenSpacePanning = false; // Do not allow panning in screen space
    controls.minDistance = 1; // Minimum distance for zoom
    controls.maxDistance = 500; // Maximum distance for zoom

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Adjust light intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Adjust light intensity
    directionalLight.position.set(5, 5, 5); // Set a position that illuminates the scene
    scene.add(directionalLight);

    // Helper axes
    const axesHelper = new THREE.AxesHelper(5); // Axes helper to visualize the axes
    scene.add(axesHelper);

    // Model loading
    const loader = new GLTFLoader();
    loader.load(
      '3d-assets/night-desk.glb', // Path to the 3D model
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        scene.add(model);

        // Handle non-power-of-two textures
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const material = (child as THREE.Mesh).material;
            // Check if material is an array and handle accordingly
            if (Array.isArray(material)) {
              material.forEach(mat => {
                if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
                  mat.map.wrapS = THREE.ClampToEdgeWrapping;
                  mat.map.wrapT = THREE.ClampToEdgeWrapping;
                  mat.map.minFilter = THREE.LinearFilter; // Disable mipmaps for NPOT textures
                }
              });
            } else if (material instanceof THREE.MeshStandardMaterial && material.map) {
              material.map.wrapS = THREE.ClampToEdgeWrapping;
              material.map.wrapT = THREE.ClampToEdgeWrapping;
              material.map.minFilter = THREE.LinearFilter; // Disable mipmaps for NPOT textures
            }
          }
        });

        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center the model
        model.position.sub(center);

        // Increase the size of the model to 10
        model.scale.set(10, 10, 10);

        // Add bounding box helper
        const boxHelper = new THREE.BoxHelper(model, 0x000000); // Black bounding box
        boxHelperRef.current = boxHelper;
        scene.add(boxHelper);

        // Update camera to focus on the model
        const maxDim = Math.max(size.x, size.y, size.z) * 10; // Adjust maxDim to account for the increased size
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.set(cameraZ, cameraZ, cameraZ); // Position the camera to fit the model
        camera.lookAt(scene.position); // Make the camera look at the center of the scene

        setModelDetails(`Model Center: x=0, y=0, z=0, Size: x=${size.x * 10}, y=${size.y * 10}, z=${size.z * 10}`);
        setError(null); // Clear error state if model loads successfully
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Log loading progress
      },
      (error) => {
        console.error('An error occurred while loading the model:', error); // Log error
        setError('Failed to load the 3D model.');
      }
    );

    let time = 0;
    let frameCount = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Hover effect for both model and box
      if (modelRef.current && boxHelperRef.current) {
        const hoverOffset = Math.sin(time) * 0.19; // Calculate hover offset
        modelRef.current.position.y = hoverOffset; // Apply hover effect to model
        boxHelperRef.current.position.y = hoverOffset; // Apply hover effect to bounding box
      }

      controls.update(); // Update controls

      renderer.render(scene, camera); // Render the scene with the camera

      // Update camera details every 60 frames for performance
      frameCount++;
      if (frameCount % 60 === 0) {
        setCameraDetails(`Camera Position: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`);
      }
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; // Update camera aspect ratio
      camera.updateProjectionMatrix(); // Update camera projection matrix
      renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement); // Remove renderer from the DOM
      }
    };
  }, []);

  return (
    <>
      <div>
        <div ref={mountRef} />
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'black' }}>
          <p>{cameraDetails}</p>
          <p>{modelDetails}</p>
        </div>
      </div>
    </>
  );
};

export default Scene;
