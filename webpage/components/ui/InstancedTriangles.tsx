import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import { ShaderMaterial } from "three";

const vertexShader = `
  precision highp float;
  uniform float sineTime;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  attribute vec3 position;
  attribute vec3 offset;
  attribute vec4 color;
  attribute vec4 orientationStart;
  attribute vec4 orientationEnd;
  varying vec3 vPosition;
  varying vec4 vColor;
  void main() {
    vPosition = offset * max(abs(sineTime * 2.0 + 1.0), 0.5) + position;
    vec4 orientation = normalize(mix(orientationStart, orientationEnd, sineTime));
    vec3 vcV = cross(orientation.xyz, vPosition);
    vPosition = vcV * (2.0 * orientation.w) + (cross(orientation.xyz, vcV) * 2.0 + vPosition);
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float time;
  varying vec3 vPosition;
  varying vec4 vColor;
  void main() {
    vec4 color = vec4(vColor);
    color.r += sin(vPosition.x * 10.0 + time) * 0.5;
    gl_FragColor = color;
  }
`;

const InstancedTriangles: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { instances } = useControls({
    instances: { value: 50000, min: 0, max: 100000, step: 1000 },
  });

  const [geometry, material] = useMemo(() => {
    const geometry = new THREE.InstancedBufferGeometry();

    const positions = new Float32Array([
      0.025, -0.025, 0, -0.025, 0.025, 0, 0, 0, 0.025,
    ]);
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    const offsets = new Float32Array(instances * 3);
    const colors = new Float32Array(instances * 4);
    const orientationsStart = new Float32Array(instances * 4);
    const orientationsEnd = new Float32Array(instances * 4);

    const vector = new THREE.Vector4();

    for (let i = 0; i < instances; i++) {
      offsets[i * 3] = Math.random() - 0.5;
      offsets[i * 3 + 1] = Math.random() - 0.5;
      offsets[i * 3 + 2] = Math.random() - 0.5;

      colors[i * 4] = Math.random();
      colors[i * 4 + 1] = Math.random();
      colors[i * 4 + 2] = Math.random();
      colors[i * 4 + 3] = Math.random();

      vector
        .set(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
        )
        .normalize();
      orientationsStart[i * 4] = vector.x;
      orientationsStart[i * 4 + 1] = vector.y;
      orientationsStart[i * 4 + 2] = vector.z;
      orientationsStart[i * 4 + 3] = vector.w;

      vector
        .set(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
        )
        .normalize();
      orientationsEnd[i * 4] = vector.x;
      orientationsEnd[i * 4 + 1] = vector.y;
      orientationsEnd[i * 4 + 2] = vector.z;
      orientationsEnd[i * 4 + 3] = vector.w;
    }

    geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(offsets, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colors, 4),
    );
    geometry.setAttribute(
      "orientationStart",
      new THREE.InstancedBufferAttribute(orientationsStart, 4),
    );
    geometry.setAttribute(
      "orientationEnd",
      new THREE.InstancedBufferAttribute(orientationsEnd, 4),
    );

    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });

    return [geometry, material];
  }, [instances]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.1;
      const material = meshRef.current.material as ShaderMaterial;
      material.uniforms.time.value = time * 5;
      material.uniforms.sineTime.value = Math.sin(
        material.uniforms.time.value * 0.05,
      );
    }
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, instances]} />;
};

export default InstancedTriangles;
