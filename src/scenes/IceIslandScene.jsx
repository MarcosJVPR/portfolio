import { useFrame, useThree } from '@react-three/fiber'
import { Sky, useGLTF, OrbitControls, Html } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

import Igloo from '../components/Igloo'
import Orca from '../components/Orca'
import Petrel from '../components/Petrel'
import Penguin from '../components/Penguin'
import Fox from '../components/Fox'
import Island from '../components/Island'
import LimitWall from '../components/LimitWall'
import { useGameStore } from '../store/useGameStore'

// Helper: get island height at (x, z) - adjusted for the actual island model
function getIslandY(x, z) {
  const r = 8; // Smaller radius to match the island model
  const dist = Math.sqrt(x * x + z * z);
  if (dist > r) return -0.5; // Below water level if outside island
  // Higher base height to account for the island model's actual height
  return 1.5 + Math.cos((x * x + z * z) * 0.02) * 0.3 + Math.sin(x * 0.3) * 0.2 + Math.sin(z * 0.3) * 0.2;
}

export default function IceIslandScene() {
  const lightRef = useRef()
  const penguinRef = useRef()
  const { camera } = useThree()
  const plane = useGLTF('/assets/models/plane.glb')
  const orbitRef = useRef();
  const orca = useGLTF('/assets/models/female_orca.glb')
  const orcaRef = useRef()
  const [showOrcaText, setShowOrcaText] = useState(false)
  const [orcaAudioPlayed, setOrcaAudioPlayed] = useState(false)
  const [walls, setWalls] = useState([
    { position: [0, 3, -0.5], size: [90, 10, 1] } // User positioned wall
  ])

  // Base offsets for orca
  const orcaBaseY = -2.5; // Move orca lower
  const orcaBaseRotation = Math.PI; // 180 degrees rotation

  useEffect(() => {
    if (orca && orca.scene) {
      console.log('Female Orca GLTF scene:', orca.scene)
    }
  }, [orca])

  const joystickVelocity = useGameStore(state => state.joystickVelocity)
  const setPenguin = useGameStore(state => state.setPenguin)
  const lang = useGameStore(state => state.language)

  useEffect(() => {
    if (penguinRef.current?.group) {
      setPenguin(penguinRef.current.group)
    }
    // Spacebar resets camera behind penguin
    const handleSpace = (e) => {
      if (e.code === 'Space' && penguinRef.current?.group && camera) {
        const pos = penguinRef.current.group.position;
        camera.position.set(pos.x, pos.y + 10, pos.z + 20);
        camera.lookAt(pos.x, pos.y, pos.z);
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [setPenguin, camera]);

  useEffect(() => {
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.05) * 10 // Slower movement
      lightRef.current.position.z = Math.cos(t * 0.05) * 10
    }
    // Camera follows penguin but allows orbiting
    if (penguinRef.current?.group && orbitRef.current) {
      const pos = penguinRef.current.group.position
      orbitRef.current.target.set(pos.x, pos.y, pos.z)
      orbitRef.current.update()
    }

    // Gentle orca swimming animation with base offset and rotation
    if (orcaRef.current) {
      orcaRef.current.position.y = orcaBaseY + Math.sin(t * 2) * 0.3
      orcaRef.current.rotation.y = orcaBaseRotation + Math.sin(t * 0.3) * 0.1
    }

    // Orca interaction - check distance to penguin
    if (penguinRef.current?.group && orcaRef.current) {
      const distance = orcaRef.current.position.distanceTo(penguinRef.current.group.position)
      if (distance < 3 && !orcaAudioPlayed) {
        const sound = new Audio('/assets/sounds/orca.mp3')
        sound.volume = 0.7
        sound.play()
        setOrcaAudioPlayed(true)
        setShowOrcaText(true)
        console.log('Orca text should show now')
      } else if (distance >= 3 && showOrcaText) {
        setShowOrcaText(false)
        setOrcaAudioPlayed(false)
      }
    }
  })

  // Snow particle positions
  const snowCount = 1200;
  const snowPositions = useRef(new Float32Array(snowCount * 3));
  useEffect(() => {
    for (let i = 0; i < snowCount; i++) {
      snowPositions.current[i * 3 + 0] = (Math.random() - 0.5) * 120;
      snowPositions.current[i * 3 + 1] = Math.random() * 40 + 8;
      snowPositions.current[i * 3 + 2] = (Math.random() - 0.5) * 120;
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

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={8} />
      <OrbitControls ref={orbitRef} enablePan={false} enableZoom={true} mouseButtons={{ RIGHT: 2 }} />

      <Island position={[0, -5, 0]} scale={0.8} />
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
        <pointsMaterial color="#fff" size={0.35} sizeAttenuation={true} transparent opacity={0.8} />
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
      <Penguin
        ref={penguinRef}
        position={[-3, getIslandY(-3, 3), 11]}
        externalVelocity={joystickVelocity}
        getGroundY={getIslandY}
        walls={walls}
        scale={3}
      />
      <primitive object={plane.scene} position={[6, getIslandY(-9, 2), 16]} scale={0.008} />
      <Igloo penguinRef={penguinRef} position={[0, getIslandY(3, -3) - 1.0, 5]} scale={6} />
      <Fox penguinRef={penguinRef} position={[-12, getIslandY(2, 2) - 0.8, 9]} scale={0.4} />
      <primitive ref={orcaRef} object={orca.scene} position={[-11, 3, 19]} scale={0.1} />
      {showOrcaText && (
        <Html position={[-11, 8, 19]}>
          <div
            style={{
              background: 'white',
              padding: '1rem 1.4rem',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              fontSize: '1rem',
              maxWidth: '250px',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <button onClick={() => setShowOrcaText(false)} style={{ position: 'absolute', top: 4, right: 8, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
            {lang === 'es'
              ? 'Aquí aprendí sobre la vida, el código y el océano. Estudié Fullstack Dev, un máster en Marketing y otro en Branding. También soy licenciado en comunicación social, marketing y guionismo audiovisual.'
              : "Here I learned about life, code, and oceans. I studied Fullstack Dev, hold a master's in Marketing and Branding, and I have a degree in communication, marketing and screenwriting."}
          </div>
        </Html>
      )}
      <Petrel penguinRef={penguinRef} position={[9, getIslandY(9, 10) - 0.8, 10]} scale={5} nestScale={8} />

      {/* Example Limit Wall - you can add more and position them as needed */}
      <LimitWall
        position={[0, 3, -0.5]}
        size={[90, 10, 1]}
        color="#ff0000"
        opacity={0.0000000001}
        showControls={false}
      />
    </>
  )
}
