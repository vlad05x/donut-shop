"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"

function Donut({ position = [0, 0, 0], scale = 0.2, color = "#FF9AA2" }) {
  const ref = useRef()

  // Simple colored mesh instead of trying to load a model
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function FloatingDonuts() {
  const donutColors = [
    "#FF9AA2",
    "#FFB7B2", 
    "#FFDAC1", 
    "#E2F0CB", 
    "#B5EAD7", 
    "#C7CEEA",
  ]
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <Donut
          key={i}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}
          scale={0.2 + Math.random() * 0.1}
          color={donutColors[Math.floor(Math.random() * donutColors.length)]}
        />
      ))}
    </>
  )
}

export default function DonutCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <FloatingDonuts />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
