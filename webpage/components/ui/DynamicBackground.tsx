import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const DynamicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera, controls: FirstPersonControls, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
    let mesh: THREE.Mesh, geometry: THREE.PlaneGeometry, material: THREE.MeshBasicMaterial, clock: THREE.Clock;

    const worldWidth = 256, worldDepth = 256; // Increased resolution for smoother details

    function init() {
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
      camera.position.y = 200;

      clock = new THREE.Clock();

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe0f7fa); // Lighter background color
      scene.fog = new THREE.FogExp2(0xe0f7fa, 0.0007); // Lighter fog

      geometry = new THREE.PlaneGeometry(20000, 20000, worldWidth - 1, worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);

      const position = geometry.attributes.position;
      if (position instanceof THREE.BufferAttribute) {
        position.usage = THREE.DynamicDrawUsage;
      }

      for (let i = 0; i < position.count; i++) {
        const y = 35 * Math.sin(i / 2); // Reduced amplitude for smoother waves
        position.setY(i, y);
      }

      const texture = new THREE.TextureLoader().load('/textures/water.jpg');
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5); // Increased texture repeat for finer details
      texture.colorSpace = THREE.SRGBColorSpace;

      material = new THREE.MeshBasicMaterial({ color: 0x80deea, map: texture }); // Lighter material color

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);

      controls = new FirstPersonControls(camera, renderer.domElement);
      controls.movementSpeed = 500; // Reduced movement speed for smoother control
      controls.lookSpeed = 0.1; // Reduced look speed for smoother control

      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls.handleResize();
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * 5; // Reduced animation speed for smoother effect

      const position = geometry.attributes.position;

      for (let i = 0; i < position.count; i++) {
        const y = 35 * Math.sin(i / 5 + (time + i) / 7); // Reduced amplitude for smoother waves
        position.setY(i, y);
      }

      position.needsUpdate = true;

      controls.update(delta);
      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default DynamicBackground;