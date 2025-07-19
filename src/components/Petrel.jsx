import { useRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/useGameStore'

export default function Petrel({ penguinRef, position = [4, 0, -3] }) {
  const petrel = useGLTF('/assets/models/petrel.glb')
  const nest = useGLTF('/assets/models/nest.glb')
  const petrelRef = useRef()
  const [showText, setShowText] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const setSection = useGameStore(state => state.setSection)
  const lang = useGameStore(state => state.language)

useFrame(() => {
  if (!penguinRef?.current?.group || !iglooRef.current) return
  const distance = iglooRef.current.position.distanceTo(penguinRef.current.group.position)
  if (distance < 3 && !audioPlayed) {
    const sound = new Audio('/assets/sounds/igloo.mp3')
    sound.volume = 0.7
    sound.play()
    setAudioPlayed(true)
    setShowText(true)
    setSection('experiencia')
  } else if (distance >= 3 && showText) {
    setShowText(false)
    setAudioPlayed(false)
  }
})


  return (
    <>
      <primitive object={nest.scene} scale={0.6} position={position} />
      <primitive
        ref={petrelRef}
        object={petrel.scene}
        scale={0.3}
        position={[position[0], position[1] + 0.4, position[2]]}
      />
      {showText && (
        <Html position={[position[0], position[1] + 1.4, position[2]]}>
          <div
            style={{
              background: 'white',
              padding: '1rem 1.4rem',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              fontSize: '1rem',
              maxWidth: '250px',
              textAlign: 'center'
            }}
          >
            {lang === 'es'
              ? 'Estos son mis diseños. ¿Cuál te gusta más?'
              : 'These are my designs. Which one do you like best?'}
          </div>
        </Html>
      )}
    </>
  )
}
