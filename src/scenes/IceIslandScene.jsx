import { useFrame, useThree } from '@react-three/fiber'
import { Sky, useGLTF, Points, PointMaterial, OrbitControls } from '@react-three/drei'
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

import Igloo from '../components/Igloo'
import Orca from '../components/Orca'
import Petrel from '../components/Petrel'
import Penguin from '../components/Penguin'
import Fox from '../components/Fox'
import { useGameStore } from '../store/useGameStore'

// Helper: get island height at (x, z)
function getIslandY(x, z) {
  const r = 12;
  const dist = Math.sqrt(x * x + z * z);
  if (dist > r) return 0;
  // Gentle bump using noise
  return 0.7 + Math.cos((x * x + z * z) * 0.01) * 0.5 + Math.sin(x * 0.5) * 0.3 + Math.sin(z * 0.5) * 0.3;
}

export default function IceIslandScene() {
  const lightRef = useRef()
  const groundRef = useRef()
  const penguinRef = useRef()
  const { camera } = useThree()
  const plane = useGLTF('/assets/models/plane.glb')
  const orbitRef = useRef();

  const joystickVelocity = useGameStore(state => state.joystickVelocity)
  const setPenguin = useGameStore(state => state.setPenguin)

  useEffect(() => {
    if (penguinRef.current?.group) {
      setPenguin(penguinRef.current.group)
    }
  }, [setPenguin])

  useEffect(() => {
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.1) * 10
      lightRef.current.position.z = Math.cos(t * 0.1) * 10
    }
  })

  // Snow particle positions
  const snowCount = 400;
  const snowPositions = useRef(new Float32Array(snowCount * 3));
  useEffect(() => {
    for (let i = 0; i < snowCount; i++) {
      snowPositions.current[i * 3 + 0] = (Math.random() - 0.5) * 30;
      snowPositions.current[i * 3 + 1] = Math.random() * 12 + 4;
      snowPositions.current[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
  }, []);
  const snowVelocities = useRef(Array.from({ length: snowCount }, () => Math.random() * 0.02 + 0.01));
  const snowRef = useRef();

  useFrame(() => {
    const positions = snowPositions.current;
    for (let i = 0; i < snowCount; i++) {
      positions[i * 3 + 1] -= snowVelocities.current[i];
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = Math.random() * 12 + 8;
      }
    }
    if (snowRef.current) {
      snowRef.current.needsUpdate = true;
    }
  });

  const penguinStart = [-10, 0, 8]
  const nestPos = [4, 0, -3]

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={8} />
      <OrbitControls ref={orbitRef} enablePan={false} enableZoom={false} mouseButtons={{ RIGHT: 2 }} />
      {/* Water ring (flat circle) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <circleGeometry args={[22, 64]} />
        <meshStandardMaterial color="#1CB5E0" transparent opacity={0.8} />
      </mesh>
      {/* Realistic snowy island (bumpy plane) */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial color="#fff" roughness={0.7} />
      </mesh>
      {/* Snowfall with circular texture */}
      <points position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            ref={snowRef}
            attach="attributes-position"
            count={snowCount}
            array={snowPositions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#fff" size={0.35} sizeAttenuation={true} transparent opacity={0.8} map={new THREE.TextureLoader().load('/assets/textures/snowflake.png')} />
      </points>
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={1.2}
        position={[5, 20, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.3} />
      {/* Models with y set to island surface and improved scales */}
      <Penguin
        ref={penguinRef}
        position={[-6, getIslandY(-6, 8), 8]}
        externalVelocity={joystickVelocity}
        scale={0.7}
      />
      <primitive object={plane.scene} scale={1.2} position={[-6, getIslandY(-6, 8), 8]} />
      <Igloo penguinRef={penguinRef} position={[7, getIslandY(7, -6), -6]} scale={1.5} />
      <Fox penguinRef={penguinRef} position={[-10, getIslandY(-10, -10), -10]} scale={0.7} />
      <Orca penguinRef={penguinRef} position={[12, getIslandY(12, 12), 12]} scale={1.5} />
      <Petrel penguinRef={penguinRef} position={[4, getIslandY(4, 5), 5]} scale={0.5} />
    </>
  )
}

