import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Torus, Box } from '@react-three/drei'
import * as THREE from 'three'

const QuantumOrb = ({ position = [0, 0, 0], color = "#00ffff", scale = 1, type = "sphere" }: {
  position?: [number, number, number]
  color?: string
  scale?: number
  type?: "sphere" | "torus" | "box"
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  const renderShape = () => {
    switch (type) {
      case "torus":
        return (
          <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} scale={scale}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.4}
              speed={1.5}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.7}
            />
          </Torus>
        )
      case "box":
        return (
          <Box ref={meshRef} args={[1.2, 1.2, 1.2]} scale={scale}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.2}
              speed={2.5}
              roughness={0.2}
              metalness={0.7}
              transparent
              opacity={0.5}
            />
          </Box>
        )
      default:
        return (
          <Sphere ref={meshRef} args={[1, 100, 200]} scale={scale}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </Sphere>
        )
    }
  }

  return (
    <group position={position}>
      {renderShape()}
    </group>
  )
}

export default QuantumOrb


