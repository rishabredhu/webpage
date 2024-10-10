import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

interface ThreeDTextProps {
  text: string;
}

const ThreeDText: React.FC<ThreeDTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;

    const init = () => {
      camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        1,
        10000,
      );
      camera.position.set(0, 0, 600); // Adjusted camera position to better view the text

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      const loader = new FontLoader();
      loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
        const color = 0x006699;

        const matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        });

        const matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.8, // Increased opacity for better visibility
          side: THREE.DoubleSide,
        });

        const shapes = font.generateShapes(text, 100);
        const geometry = new THREE.ShapeGeometry(shapes);

        geometry.computeBoundingBox();

        if (geometry.boundingBox) {
          const xMid =
            -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
          geometry.translate(xMid, 0, 0);
        }

        // make shape ( N.B. edge view not visible )
        const textMesh = new THREE.Mesh(geometry, matLite);
        textMesh.position.z = 1; // Adjusted position to bring text closer to the camera
        scene.add(textMesh);

        // make line shape ( N.B. edge view remains visible )
        const holeShapes: THREE.Shape[] = [];

        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          if (shape.holes && shape.holes.length > 0) {
            for (let j = 0; j < shape.holes.length; j++) {
              const hole = shape.holes[j];
              holeShapes.push(hole as THREE.Shape);
            }
          }
        }

        shapes.push(...holeShapes);

        const lineText = new THREE.Object3D();

        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          const points = shape.getPoints();
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

          if (lineGeometry.boundingBox) {
            const xMid =
              -0.5 *
              (lineGeometry.boundingBox.max.x - lineGeometry.boundingBox.min.x);
            lineGeometry.translate(xMid, 0, 0);
          }

          const lineMesh = new THREE.Line(lineGeometry, matDark);
          lineText.add(lineMesh);
        }

        scene.add(lineText);
        render();
      });

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight,
      );
      containerRef.current!.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      controls.addEventListener("change", render);
      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect =
        containerRef.current!.clientWidth / containerRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight,
      );
      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      controls.removeEventListener("change", render);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [text]);

  return <div ref={containerRef} style={{ width: "100%", height: "300px" }} />;
};

export default ThreeDText;
