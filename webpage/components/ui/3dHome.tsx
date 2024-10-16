/* Start of Selection */
'use client'
import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { Mesh, Vector3, BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'

// Define the type for our GLTF result
type GLTFResult = GLTF & {
  nodes: {
    Desk: Mesh
  }
  materials: {
    Desk: THREE.Material
  }
}

// Preload the Desk model
useGLTF.preload("/3d-assets/night-desk.glb")

// Editable Properties
const EDITABLE_PROPERTIES = {
  DESK_SCALE: new Vector3(1.5, 1.5, 1.5),
  DESK_POSITION: new Vector3(-0.5, -10.5, 10), // New desk position variable
  DESK_ROTATION: new Vector3(37, 2, 29), // Rotate 37 degrees X, 2 degrees Y, 29 degrees Z
  CUBOID_SIZE: new Vector3(4, 3, 2),
  CAMERA_POSITION: new Vector3(1, 1, 1) // Camera facing positive z direction
}

function WiredCuboid({ size }: { size: Vector3 }) {
  const geometry = new BoxGeometry(size.x, size.y, size.z)
  const edges = new EdgesGeometry(geometry)
  const material = new LineBasicMaterial({ color: 'black' })

  return <lineSegments geometry={edges} material={material} />
}

function Desk() {
  const deskRef = useRef<Mesh>(null)
  const { scene, animations } = useGLTF("/3d-assets/desk.glb") as GLTFResult
  const { actions } = useAnimations(animations, deskRef)
  
  React.useEffect(() => {
    if (actions["Idle"]) {
      actions["Idle"].play()
    }
  }, [actions])

  return (
    <group
      position={EDITABLE_PROPERTIES.DESK_POSITION}
      scale={EDITABLE_PROPERTIES.DESK_SCALE}
      rotation={new THREE.Euler(
        THREE.MathUtils.degToRad(EDITABLE_PROPERTIES.DESK_ROTATION.x),
        THREE.MathUtils.degToRad(EDITABLE_PROPERTIES.DESK_ROTATION.y),
        THREE.MathUtils.degToRad(EDITABLE_PROPERTIES.DESK_ROTATION.z)
      )}
    >
      <mesh ref={deskRef}>
        <primitive object={scene} />
      </mesh>
      <axesHelper args={[5]} />
      <WiredCuboid size={EDITABLE_PROPERTIES.CUBOID_SIZE} />
    </group>
  )
}

function CanvasLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

const ThreeDHome: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(EDITABLE_PROPERTIES.DESK_POSITION)
    }
  }, [])

  return (
    <div className="pixelated-container">
      <Canvas className="pixelated-canvas">
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={EDITABLE_PROPERTIES.CAMERA_POSITION}
          fov={75}
          near={0.1}
          far={1000}
        />
        <Suspense fallback={<CanvasLoader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight args={["#b1e1ff", "#000000", 1]} />
          <Desk />
        </Suspense>
        <OrbitControls target={[
          EDITABLE_PROPERTIES.DESK_POSITION.x, 
          EDITABLE_PROPERTIES.DESK_POSITION.y, 
          EDITABLE_PROPERTIES.DESK_POSITION.z
        ]} />
      </Canvas>
      <style jsx>{`
        .pixelated-container {
          width: 600px;
          height: 600px;
          overflow: auto;
          margin: 20px auto;
          background-color: white;
          border: 2px solid black;
          box-shadow: 0 0 10px purple;
          image-rendering: pixelated;
        }
        .pixelated-canvas {
          width: 100% !important;
          height: 100% !important;
          image-rendering: pixelated;
        }
        /* Custom scrollbar styles */
        .pixelated-container::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .pixelated-container::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .pixelated-container::-webkit-scrollbar-thumb {
          background: #00ff00;
          border: 2px solid #0a0a0a;
        }
        .pixelated-container::-webkit-scrollbar-thumb:hover {
          background: #00cc00;
        }
      `}</style>
    </div>
  )
}

export default ThreeDHome

