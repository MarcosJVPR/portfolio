import { useRef, useEffect, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/useGameStore'

export default function Fox() {
  const group = useRef()
  const { scene } = useGLTF('/assets/models/fox.glb')
  const soundRef = useRef()
  const hasPlayedRef = useRef(false)
  const [showText, setShowText] = useState(false)

  const setSection = useGameStore(state => state.setSection)
  const lang = useGameStore(state => state.language)
  const penguin = useGameStore(state => state.penguin)

  useEffect(() => {
    const sound = new Audio('/assets/sounds/fox-talk.mp3')
    sound.volume = 0.7
    soundRef.current = sound
  }, [])

  useFrame(() => {
    if (!penguin || !group.current) return
    const distance = penguin.position.distanceTo(group.current.position)

    if (distance < 2) {
      setSection('habilidades')
      setShowText(true)

      if (!hasPlayedRef.current && soundRef.current) {
        soundRef.current.currentTime = 0
        soundRef.current.play()
        hasPlayedRef.current = true
      }
    } else {
      hasPlayedRef.current = false
      setShowText(false)
    }
  })

  return (
    <group ref={group} position={[0, 0, -18]}>
      <primitive object={scene} />
      {showText && (
        <Html position={[0, 2, 0]}>
          <div
            style={{
              background: 'white',
              padding: '0.9rem 1.4rem',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              fontSize: '1rem',
              maxWidth: '250px',
              textAlign: 'center'
            }}
          >
            {lang === 'es'
              ? 'Manejo React JS, Python, SQL, Three Js, APIs REST, JWT, Bootstrap y más.'
              : 'I use React JS, Python, SQL, Three Js, REST APIs, JWT, Bootstrap and more.'}
          </div>
        </Html>
      )}
    </group>
  )
}
