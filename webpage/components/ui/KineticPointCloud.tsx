// Reference: https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_instancing.html
"use client";
import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useControls, Leva } from "leva";

const vertexShader = `
  uniform sampler2D map;
  uniform float width;
  uniform float height;
  uniform float nearClipping, farClipping;
  uniform float pointSize;
  uniform float zOffset;
  varying vec2 vUv;
  const float XtoZ = 1.11146;
  const float YtoZ = 0.83359;
  void main() {
    vUv = vec2(position.x / width, position.y / height);
    vec4 color = texture2D(map, vUv);
    float depth = (color.r + color.g + color.b) / 3.0;
    float z = (1.0 - depth) * (farClipping - nearClipping) + nearClipping;
    vec4 pos = vec4(
      (position.x / width - 0.5) * z * XtoZ,
      (position.y / height - 0.5) * z * YtoZ,
      -z + zOffset,
      1.0
    );
    gl_PointSize = pointSize;
    gl_Position = projectionMatrix * modelViewMatrix * pos;
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(map, vUv);
    gl_FragColor = vec4(color.r, color.g, color.b, 0.2);
  }
`;

const KinectPointCloud: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const videoTexture = useMemo(() => {
    const video = document.createElement("video");
    video.src = "/videos/kinect.webm"; // Update with your video path
    video.loop = true;
    video.muted = true;
    video.setAttribute("playsinline", "playsinline"); // Ensure the video plays inline on mobile devices
    video.play().catch((error) => {
      console.error("Error playing video:", error);
    });
    return new THREE.VideoTexture(video);
  }, []);

  const { nearClipping, farClipping, pointSize, zOffset } = useControls({
    nearClipping: { value: 350, min: 1, max: 10000 },
    farClipping: { value: 1800, min: 1, max: 10000 },
    pointSize: { value: 2.18, min: 1, max: 10 },
    zOffset: { value: 960, min: 0, max: 4000 },
  }, { collapsed: true });

  const geometry = useMemo(() => {
    const width = 640,
      height = 480;
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array(width * height * 3);
    for (let i = 0, j = 0, l = vertices.length; i < l; i += 3, j++) {
      vertices[i] = j % width;
      vertices[i + 1] = Math.floor(j / width);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      map: { value: videoTexture },
      width: { value: 640 },
      height: { value: 480 },
      nearClipping: { value: nearClipping },
      farClipping: { value: farClipping },
      pointSize: { value: pointSize },
      zOffset: { value: zOffset },
    }),
    [videoTexture, nearClipping, farClipping, pointSize, zOffset],
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  useEffect(() => {
    camera.position.set(0, 0, 500);
  }, [camera]);

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial
        attach="material"
        args={[
          {
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
          },
        ]}
      />
    </points>
  );
};

export default KinectPointCloud;
