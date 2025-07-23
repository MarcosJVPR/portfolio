import { useRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/useGameStore'

export default function Igloo({ penguinRef, position = [0, 0, -10] }) {
  const { scene } = useGLTF('/assets/models/igloo.glb')
  const iglooRef = useRef()
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
      <primitive ref={iglooRef} object={scene} scale={0.6} position={position} />
      {showText && (
        <Html position={[position[0], position[1] + 2, position[2]]}>
          <div
            style={{
              background: 'white',
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              maxWidth: '250px',
              fontSize: '0.95rem',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <button onClick={() => setShowText(false)} style={{ position: 'absolute', top: 4, right: 8, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
            {lang === 'es'
              ? 'He trabajado como SysAdmin, diseñador web, y desarrollador front-end. Pero mejor te muestro mi currículum.'
              : "I've worked as a SysAdmin, web designer, and front-end developer. Let me show you my resume."}
          </div>
        </Html>
      )}
    </>
  )
}
