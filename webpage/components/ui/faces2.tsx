import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// Extend OrbitControls so it's available as a JSX element
extend({ OrbitControls });

const Faces2: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene, camera, gl } = useThree();

  useEffect(() => {
    const API = { thickness: 10 };

    new THREE.BufferGeometryLoader().load('json/WaltHeadLo_buffergeometry.json', (geometry) => {
      geometry.deleteAttribute('normal');
      geometry.deleteAttribute('uv');

      setupAttributes(geometry);

      // Create materials
      const material1 = new THREE.MeshBasicMaterial({
        color: 0x000000, // Set color to black
        wireframe: true,
      });

      const material2 = new THREE.ShaderMaterial({
        uniforms: { thickness: { value: API.thickness } },
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        side: THREE.DoubleSide,
        alphaToCoverage: true,
      });

      // Create meshes
      const mesh1 = new THREE.Mesh(geometry, material1);
      mesh1.position.set(-40, 0, 0);
      scene.add(mesh1);

      if (meshRef.current) {
        meshRef.current.geometry = geometry;
        meshRef.current.material = material2;
        meshRef.current.position.set(40, 0, 0);
      }

      // GUI setup
      const gui = new GUI();
      gui.add(API, 'thickness', 0, 4).onChange(() => {
        if (meshRef.current) {
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.thickness.value = API.thickness;
        }
      });
      gui.open();
    });

    return () => {
      
    };
  }, [scene]);

  return (
    <>
      <OrbitControls args={[camera, gl.domElement]} enablePan={false} enableZoom={false} />
      <mesh ref={meshRef} />
    </>
  );
};

// Helper function
const setupAttributes = (geometry: THREE.BufferGeometry) => {
  const vectors = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 1),
  ];

  const position = geometry.attributes.position;
  const centers = new Float32Array(position.count * 3);

  for (let i = 0, l = position.count; i < l; i++) {
    vectors[i % 3].toArray(centers, i * 3);
  }

  geometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));
};

// Shader sources
const vertexShaderSource = `
  attribute vec3 center;
  varying vec3 vCenter;

  void main() {
    vCenter = center;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderSource = `
  uniform float thickness;
  varying vec3 vCenter;

  void main() {
    vec3 afwidth = fwidth(vCenter.xyz);
    vec3 edge3 = smoothstep((thickness - 1.0) * afwidth, thickness * afwidth, vCenter.xyz);
    float edge = 1.0 - min(min(edge3.x, edge3.y), edge3.z);
    gl_FragColor.rgb = gl_FrontFacing ? vec3(0.0, 0.0, 0.0) : vec3(0.0, 0.0, 0.0); // Set color to black
    gl_FragColor.a = edge;
  }
`;

export default Faces2;