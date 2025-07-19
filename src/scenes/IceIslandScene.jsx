import { useFrame, useThree } from '@react-three/fiber'
import { Sky, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

import Igloo from '../components/Igloo'
import Orca from '../components/Orca'
import Petrel from '../components/Petrel'
import Penguin from '../components/Penguin'
import Fox from '../components/Fox'
import { useGameStore } from '../store/useGameStore'

export default function IceIslandScene() {
  const lightRef = useRef()
  const groundRef = useRef()
  const penguinRef = useRef()
  const { camera } = useThree()
  const plane = useGLTF('/assets/models/plane.glb')

  const joystickVelocity = useGameStore(state => state.joystickVelocity)
  const setPenguin = useGameStore(state => state.setPenguin)

  useEffect(() => {
    if (penguinRef.current?.group) {
      setPenguin(penguinRef.current.group)
    }
  }, [setPenguin])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.1) * 10
      lightRef.current.position.z = Math.cos(t * 0.1) * 10
    }

    if (penguinRef.current?.group) {
      const pos = penguinRef.current.group.position
      camera.position.x = pos.x
      camera.position.z = pos.z + 5
      camera.lookAt(pos.x, pos.y + 1, pos.z)
    }
  })

  const penguinStart = [-10, 0, 8]
  const nestPos = [4, 0, -3]

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={8} />
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={1.2}
        position={[5, 10, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.3} />

      <mesh
        ref={groundRef}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#eefaff" />
      </mesh>

      <Penguin
        ref={penguinRef}
        position={penguinStart}
        externalVelocity={joystickVelocity}
      />
      <primitive object={plane.scene} scale={0.8} position={penguinStart} />
      <Igloo />
      <Fox />
      <Orca />
      <Petrel position={nestPos} />
    </>
  )
}

