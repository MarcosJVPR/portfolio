import React, { useEffect, useRef } from 'react'
import nipplejs from 'nipplejs'
import { useGameStore } from '../store/useGameStore'

export default function Joystick() {
  const joystickRef = useRef(null)
  const setVelocity = useGameStore(state => state.setJoystickVelocity)

  useEffect(() => {
    if (!joystickRef.current) return

    const manager = nipplejs.create({
      zone: joystickRef.current,
      mode: 'static',
      position: { left: '80px', bottom: '80px' },
      color: '#333'
    })

    manager.on('move', (_, data) => {
      if (!data) return
      const angle = data.angle.radian
      const force = data.force * 0.05

      // Right is right, up is up, down is down, left is left
      const dx = Math.cos(angle) * force
      const dz = -Math.sin(angle) * force

      setVelocity({ x: dx, z: dz })
    })

    manager.on('end', () => {
      setVelocity({ x: 0, z: 0 })
    })

    return () => manager.destroy()
  }, [setVelocity])

  return (
    <div
      ref={joystickRef}
      style={{
        position: 'fixed',
        bottom: 30,
        left: 30,
        width: 120,
        height: 120,
        zIndex: 20
      }}
    />
  )
}
