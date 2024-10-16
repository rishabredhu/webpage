import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const California3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 500);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 2.5);
    camera.add(light);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // California shape
    const californiaPts = [
      new THREE.Vector2(610, 320),
      new THREE.Vector2(450, 300),
      new THREE.Vector2(392, 392),
      new THREE.Vector2(266, 438),
      new THREE.Vector2(190, 570),
      new THREE.Vector2(190, 600),
      new THREE.Vector2(160, 620),
      new THREE.Vector2(160, 650),
      new THREE.Vector2(180, 640),
      new THREE.Vector2(165, 680),
      new THREE.Vector2(150, 670),
      new THREE.Vector2(90, 737),
      new THREE.Vector2(80, 795),
      new THREE.Vector2(50, 835),
      new THREE.Vector2(64, 870),
      new THREE.Vector2(60, 945),
      new THREE.Vector2(300, 945),
      new THREE.Vector2(300, 743),
      new THREE.Vector2(600, 473),
      new THREE.Vector2(626, 425),
      new THREE.Vector2(600, 370),
      new THREE.Vector2(610, 320),
    ];

    californiaPts.forEach(pt => pt.multiplyScalar(0.25));

    const californiaShape = new THREE.Shape(californiaPts);
    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const californiaGeometry = new THREE.ExtrudeGeometry(californiaShape, extrudeSettings);
    const californiaMaterial = new THREE.MeshPhongMaterial({ color: 0xf08000 });
    const californiaMesh = new THREE.Mesh(californiaGeometry, californiaMaterial);
    californiaMesh.position.set(-75, -25, 0);
    scene.add(californiaMesh);

    // Load desk model
    const loader = new GLTFLoader();
    loader.load(
      '/3d-assets/desk.glb',
      (gltf) => {
        const desk = gltf.scene;
        desk.position.set(0, -50, 0);
        desk.scale.set(50, 50, 50);
        scene.add(desk);
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the GLTF model:', error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default California3D;