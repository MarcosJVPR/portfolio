import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { Loader } from '@react-three/drei'
import IceIslandScene from './scenes/IceIslandScene'
import UIControls from './components/UIControls'
import LanguageToggle from './components/LanguageToggle'
import SectionViewer from './components/SectionViewer'
import Joystick from './components/Joystick'
import { useGameStore } from './store/useGameStore'
import bgMusicSrc from './assets/sounds/bg-music.mp3'
import './styles/main.css'

function App() {
  const lang = useGameStore(state => state.language)

  useEffect(() => {
    const bgMusic = new Audio(bgMusicSrc)
    bgMusic.loop = true
    bgMusic.volume = 0.4

    const playMusic = () => {
      const playPromise = bgMusic.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(e => console.warn('Autoplay bloqueado:', e));
      }
      document.removeEventListener('click', playMusic)
    }

    document.addEventListener('click', playMusic)

    return () => {
      bgMusic.pause()
      document.removeEventListener('click', playMusic)
    }
  }, [])

  return (
    <>
      <LanguageToggle />
      <SectionViewer />

      <Canvas shadows camera={{ position: [0, 3, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <IceIslandScene />
          <UIControls />
        </Suspense>
      </Canvas>

      <Loader />

      {/* 🕹️ Joystick FUERA del Canvas */}
      <Joystick />
    </>
  )
}

export default App
