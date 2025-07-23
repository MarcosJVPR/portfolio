import { useRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/useGameStore'

export default function Orca({ penguinRef, position = [-5, 0, -12] }) {
  const { scene } = useGLTF('/assets/models/orca.glb')
  const orcaRef = useRef()
  const [showText, setShowText] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const setSection = useGameStore(state => state.setSection)
  const lang = useGameStore(state => state.language)

  useFrame(() => {
    if (!penguinRef?.current?.group || !orcaRef.current) return
    const distance = orcaRef.current.position.distanceTo(penguinRef.current.group.position)
    if (distance < 3 && !audioPlayed) {
      const sound = new Audio('/assets/sounds/orca.mp3')
      sound.volume = 0.7
      sound.play()
      setAudioPlayed(true)
      setShowText(true)
      setSection('educacion')
    } else if (distance >= 3 && showText) {
      setShowText(false)
      setAudioPlayed(false)
    }
  })


  return (
    <>
      <primitive ref={orcaRef} object={scene} scale={0.8} position={position} />
      {showText && (
        <Html position={[position[0], position[1] + 2, position[2]]}>
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
            <button onClick={() => setShowText(false)} style={{ position: 'absolute', top: 4, right: 8, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
            {lang === 'es'
              ? 'Aquí aprendí sobre la vida, el código y el océano. Estudié Fullstack Dev, un máster en Marketing y otro en Branding. También soy licenciado en comunicación social, marketing y guionismo audiovisual.'
              : "Here I learned about life, code, and oceans. I studied Fullstack Dev, hold a master's in Marketing and Branding, and I have a degree in communication, marketing and screenwriting."}
          </div>
        </Html>
      )}
    </>
  )
}
