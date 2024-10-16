
"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Water } from 'three/examples/jsm/objects/Water'

const DystopianScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let camera: THREE.PerspectiveCamera
    let scene: THREE.Scene
    let renderer: THREE.WebGLRenderer
    let controls: OrbitControls
    let composer: EffectComposer
    let sphere: THREE.Mesh
    let edgeLight: THREE.Line
    let bulb: THREE.PointLight
    let model: THREE.Object3D
    let water: Water

    const init = () => {
      // Scene setup
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000) // Black background
      scene.fog = new THREE.FogExp2(0x8000ff, 0.05) // Purple fog

      // Camera setup
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 5, 10)

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      mountRef.current?.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight('white', 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xff0000, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      // Transparent sphere
      const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
      const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8000ff, 
        transparent: true,
        opacity: 0.3
      })
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      scene.add(sphere)

      // LED effect on sphere edges
      const edgeGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(64 * 3) // 32 points for latitude, 32 for longitude
      const colors = new Float32Array(64 * 3)
      
      for (let i = 0; i < 32; i++) {
        const theta = (i / 31) * Math.PI * 2
        positions[i * 3] = Math.sin(theta) * 5
        positions[i * 3 + 1] = Math.cos(theta) * 5
        positions[i * 3 + 2] = 0
        positions[(i + 32) * 3] = 0
        positions[(i + 32) * 3 + 1] = Math.sin(theta) * 5
        positions[(i + 32) * 3 + 2] = Math.cos(theta) * 5
      }

      for (let i = 0; i < 64; i++) {
        colors[i * 3] = 0
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }

      edgeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      edgeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const edgeMaterial = new THREE.LineBasicMaterial({ 
        vertexColors: true, 
        linewidth: 2,
        transparent: true,
        opacity: 0.8
      })
      edgeLight = new THREE.Line(edgeGeometry, edgeMaterial)
      scene.add(edgeLight)

      // Bulb in the middle
      bulb = new THREE.PointLight(0xffffff, 1, 100)
      bulb.position.set(0, 0, 0)
      scene.add(bulb)

      const bulbGeometry = new THREE.SphereGeometry(0.1, 16, 16)
      const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial)
      bulb.add(bulbMesh)

      // Ocean
      const waterGeometry = new THREE.CircleGeometry(5, 32)
      water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('/placeholder.svg?height=512&width=512', function(texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      })
      water.rotation.x = -Math.PI / 2
      water.position.y = -4.5
      scene.add(water)

      // Controls
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05

      // GLB Loader
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)

      // Load model under the light
      loader.load(
        '3d-assets/desk.glb',
        (gltf) => {
          model = gltf.scene
          model.position.set(0, -2, 0)
          model.scale.setScalar(0.5)
          scene.add(model)
          setLoading(false)
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        (error) => {
          console.error('An error happened', error)
          setLoading(false)
        }
      )

      // Post-processing
      composer = new EffectComposer(renderer)
      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
      composer.addPass(bloomPass)
    }

    const animate = () => {
      requestAnimationFrame(animate)

      if (sphere && model) {
        // Rotate the sphere
        sphere.rotation.y += 0.005

        // Rotate model
        model.rotation.y += 0.01

        // Animate LED effect
        const time = Date.now() * 0.001
        const colors = edgeLight.geometry.attributes.color
        for (let i = 0; i < colors.count; i++) {
          const t = (i / colors.count + time) % 1
          colors.setXYZ(i, Math.sin(t * Math.PI) * 0.5 + 0.5, Math.cos(t * Math.PI) * 0.5 + 0.5, 1)
        }
        colors.needsUpdate = true

        // Animate bulb intensity
        bulb.intensity = Math.sin(time * 2) * 0.5 + 1.5

        // Animate water
        water.material.uniforms['time'].value += 1.0 / 60.0
      }

      controls.update()
      composer.render()
    }

    init()
    animate()

    const handleResize = () => {
      if (camera && renderer && composer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        composer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      controls.dispose()
      renderer.dispose()
      composer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <div ref={mountRef} className="w-full h-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl text-cyan-400 font-mono animate-pulse">Loading...</div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
      </div>
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xl">
        <GlitchText>CREATIVE BOARD  </GlitchText>
      </div>
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xl">
        <GlitchText>UNDER CONSTRUCTION </GlitchText>
      </div>

      <div className="absolute bottom-4 right-4 text-purple-400 font-mono text-sm">
        <GlitchText>2077.10.23</GlitchText>
      </div>
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button className="px-4 py-2 bg-purple-600 text-purple-100 font-mono text-sm hover:bg-purple-500 transition-colors duration-200">
          NOT A BUTTON
        </button>
      </div>
    </div>
  )
}

const GlitchText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [glitchedText, setGlitchedText] = useState(children)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const text = children?.toString() || ''
      const glitchedChars = text.split('').map(char => {
        return Math.random() < 0.1 ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char
      })
      setGlitchedText(glitchedChars.join(''))
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [children])

  return <span className="glitch">{glitchedText}</span>
}

export default DystopianScene