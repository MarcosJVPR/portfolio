// UIControls.jsx
import { useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGameStore } from '../store/useGameStore'

export default function UIControls() {
  const { camera } = useThree()
  const penguin = useGameStore(state => state.penguin)

  const keys = {}

  useEffect(() => {
    const handleKeyDown = (e) => (keys[e.key] = true)
    const handleKeyUp = (e) => (keys[e.key] = false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (!penguin || !penguin.group || !camera) return
    const speed = 0.1
    if (keys['w'] || keys['ArrowUp']) penguin.move(0, -speed)
    if (keys['s'] || keys['ArrowDown']) penguin.move(0, speed)
    if (keys['a'] || keys['ArrowLeft']) penguin.move(-speed, 0)
    if (keys['d'] || keys['ArrowRight']) penguin.move(speed, 0)

    // Seguir al pingüino con la cámara
    camera.position.x = penguin.group.position.x
    camera.position.z = penguin.group.position.z + 5
  })

  return null
}
