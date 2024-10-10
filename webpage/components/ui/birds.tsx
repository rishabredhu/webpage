import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';

const Birds: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) {
      throw new Error("Container element not found");
    }

    let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, stats: Stats;
    let mesh: THREE.Mesh;
    let raycaster: THREE.Raycaster;
    let line: THREE.Line;

    const intersection = {
      intersects: false,
      point: new THREE.Vector3(),
      normal: new THREE.Vector3()
    };
    const mouse = new THREE.Vector2();
    const intersects: THREE.Intersection[] = [];

    const textureLoader = new THREE.TextureLoader();
    const decalDiffuse = textureLoader.load('textures/decal/decal-diffuse.png');
    decalDiffuse.colorSpace = THREE.SRGBColorSpace;
    const decalNormal = textureLoader.load('textures/decal/decal-normal.jpg');

    const decalMaterial = new THREE.MeshPhongMaterial({
      specular: 0x444444,
      map: decalDiffuse,
      normalMap: decalNormal,
      normalScale: new THREE.Vector2(1, 1),
      shininess: 30,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      wireframe: false
    });

    const decals: THREE.Mesh[] = [];
    let mouseHelper: THREE.Mesh;
    const position = new THREE.Vector3();
    const orientation = new THREE.Euler();
    const size = new THREE.Vector3(10, 10, 10);

    const params = {
      minScale: 10,
      maxScale: 20,
      rotate: true,
      clear: function () {
        removeDecals();
      }
    };

    init();

    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animate);
      container!.appendChild(renderer.domElement);

      stats = new Stats();
      if (container) {
        container.appendChild(stats.dom);
      }

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 120;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 50;
      controls.maxDistance = 200;

      scene.add(new THREE.AmbientLight(0x666666));

      const dirLight1 = new THREE.DirectionalLight(0xffddcc, 3);
      dirLight1.position.set(1, 0.75, 0.5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xccccff, 3);
      dirLight2.position.set(-1, 0.75, -0.5);
      scene.add(dirLight2);

      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);

      line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
      scene.add(line);

      loadLeePerrySmith();

      raycaster = new THREE.Raycaster();

      mouseHelper = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 10), new THREE.MeshNormalMaterial());
      mouseHelper.visible = false;
      scene.add(mouseHelper);

      window.addEventListener('resize', onWindowResize);

      let moved = false;

      controls.addEventListener('change', function () {
        moved = true;
      });

      window.addEventListener('pointerdown', function () {
        moved = false;
      });

      window.addEventListener('pointerup', function (event) {
        if (moved === false) {
          checkIntersection(event.clientX, event.clientY);
          if (intersection.intersects) shoot();
        }
      });

      window.addEventListener('pointermove', onPointerMove);

      function onPointerMove(event: PointerEvent) {
        if (event.isPrimary) {
          checkIntersection(event.clientX, event.clientY);
        }
      }

      function checkIntersection(x: number, y: number) {
        if (mesh === undefined) return;

        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        raycaster.intersectObject(mesh, false, intersects);

        if (intersects.length > 0) {
          const p = intersects[0].point;
          mouseHelper.position.copy(p);
          intersection.point.copy(p);

          const normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);

          const n = intersects[0].face!.normal.clone();
          n.applyNormalMatrix(normalMatrix);
          n.multiplyScalar(10);
          n.add(intersects[0].point);

          intersection.normal.copy(intersects[0].face!.normal);
          mouseHelper.lookAt(n);

          const positions = line.geometry.attributes.position;
          positions.setXYZ(0, p.x, p.y, p.z);
          positions.setXYZ(1, n.x, n.y, n.z);
          positions.needsUpdate = true;

          intersection.intersects = true;

          intersects.length = 0;
        } else {
          intersection.intersects = false;
        }
      }
    }

    function loadLeePerrySmith() {
      const map = textureLoader.load('models/gltf/LeePerrySmith/Map-COL.jpg');
      map.colorSpace = THREE.SRGBColorSpace;
      const specularMap = textureLoader.load('models/gltf/LeePerrySmith/Map-SPEC.jpg');
      const normalMap = textureLoader.load('models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg');

      const loader = new GLTFLoader();

      loader.load('models/gltf/LeePerrySmith/LeePerrySmith.glb', function (gltf) {
        mesh = gltf.scene.children[0] as THREE.Mesh;
        mesh.material = new THREE.MeshPhongMaterial({
          specular: 0x111111,
          map: map,
          specularMap: specularMap,
          normalMap: normalMap,
          shininess: 25
        });

        scene.add(mesh);
        mesh.scale.multiplyScalar(10);
      });
    }

    function shoot() {
      position.copy(intersection.point);
      orientation.copy(mouseHelper.rotation);

      if (params.rotate) orientation.z = Math.random() * 2 * Math.PI;

      const scale = params.minScale + Math.random() * (params.maxScale - params.minScale);
      size.set(scale, scale, scale);

      const material = decalMaterial.clone();
      material.color.setHex(Math.random() * 0xffffff);

      const m = new THREE.Mesh(new DecalGeometry(mesh, position, orientation, size), material);
      m.renderOrder = decals.length; // give decals a fixed render order

      decals.push(m);

      mesh.attach(m);
    }

    function removeDecals() {
      decals.forEach(function (d) {
        mesh.remove(d);
      });

      decals.length = 0;
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.render(scene, camera);
      stats.update();
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('pointerdown', () => {});
      window.removeEventListener('pointerup', () => {});
      window.removeEventListener('pointermove', () => {});
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Birds;