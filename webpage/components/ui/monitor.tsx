import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Monitor: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0xffffff);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '3d-assets/retro-delorean.glb',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const material = (child as THREE.Mesh).material;
            if (Array.isArray(material)) {
              material.forEach(mat => {
                if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
                  mat.map.wrapS = THREE.ClampToEdgeWrapping;
                  mat.map.wrapT = THREE.ClampToEdgeWrapping;
                  mat.map.minFilter = THREE.LinearFilter;
                }
              });
            } else if (material instanceof THREE.MeshStandardMaterial && material.map) {
              material.map.wrapS = THREE.ClampToEdgeWrapping;
              material.map.wrapT = THREE.ClampToEdgeWrapping;
              material.map.minFilter = THREE.LinearFilter;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.scale.set(0.5, 0.5, 0.5);
        model.rotation.y = Math.PI / 4;

        const animate = () => {
          requestAnimationFrame(animate);
          model.rotation.y += 0.005;
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Monitor;
