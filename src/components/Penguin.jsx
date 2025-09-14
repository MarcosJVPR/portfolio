import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Penguin = forwardRef(({ position = [0, 0, 0], externalVelocity, getGroundY, walls = [] }, ref) => {
  const group = useRef()
  const { nodes, animations, scene } = useGLTF('/assets/models/penguin.glb')
  const { actions } = useAnimations(animations, group)
  const { camera } = useThree()

  const keys = useRef({})
  const localVelocity = useRef(new THREE.Vector3())
  const verticalVelocity = useRef(0)
  const isGrounded = useRef(false)

  const stepSound = useRef()
  const talkSound = useRef()
  const listener = useRef(null)
  const [audioReady, setAudioReady] = useState(false)
  const isWalking = useRef(false)
  const isIdleTalking = useRef(false)

  // Collision detection function
  const checkWallCollision = (newX, newZ) => {
    for (const wall of walls) {
      const [wallX, wallY, wallZ] = wall.position
      const [wallW, wallH, wallD] = wall.size

      // Check if penguin would collide with wall
      const penguinRadius = 1.5 // Approximate penguin size
      const wallLeft = wallX - wallW / 2
      const wallRight = wallX + wallW / 2
      const wallFront = wallZ - wallD / 2
      const wallBack = wallZ + wallD / 2

      if (newX + penguinRadius > wallLeft &&
        newX - penguinRadius < wallRight &&
        newZ + penguinRadius > wallFront &&
        newZ - penguinRadius < wallBack) {
        console.log('Wall collision detected!', { newX, newZ, wallX, wallZ, wallW, wallD })
        return true
      }
    }
    return false
  }

  useImperativeHandle(ref, () => ({
    group: group.current
  }))

  // ⚠️ Setup Audio ONLY on user interaction (mobile & desktop compatibility)
  useEffect(() => {
    const setupAudio = () => {
      if (audioReady) return

      listener.current = new THREE.AudioListener()
      camera.add(listener.current)

      const step = new THREE.PositionalAudio(listener.current)
      const talk = new THREE.PositionalAudio(listener.current)

      const loader = new THREE.AudioLoader()
      loader.load('/assets/sounds/steps.mp3', buffer => {
        step.setBuffer(buffer)
        step.setRefDistance(5)
        step.setLoop(true)
        step.setVolume(0.4)
      })
      loader.load('/assets/sounds/talk.mp3', buffer => {
        talk.setBuffer(buffer)
        talk.setRefDistance(5)
        talk.setLoop(false)
        talk.setVolume(0.3)
      })

      stepSound.current = step
      talkSound.current = talk

      if (group.current) {
        group.current.add(step)
        group.current.add(talk)
      }

      setAudioReady(true)
      window.removeEventListener('click', setupAudio)
      window.removeEventListener('touchstart', setupAudio)
    }

    window.addEventListener('click', setupAudio)
    window.addEventListener('touchstart', setupAudio)

    return () => {
      if (listener.current) camera.remove(listener.current)
    }
  }, [camera, audioReady])

  useEffect(() => {
    const onKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true)
    const onKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    const speed = 2
    const gravity = 12
    const jumpSpeed = 5
    localVelocity.current.set(0, 0, 0)

    if (keys.current['w'] || keys.current['arrowup']) localVelocity.current.z -= speed * delta
    if (keys.current['s'] || keys.current['arrowdown']) localVelocity.current.z += speed * delta
    if (keys.current['a'] || keys.current['arrowleft']) localVelocity.current.x -= speed * delta
    if (keys.current['d'] || keys.current['arrowright']) localVelocity.current.x += speed * delta

    if (externalVelocity) {
      // Convert to Vector3 if needed
      let extVel = externalVelocity
      if (typeof extVel.x === 'number' && typeof extVel.z === 'number') {
        extVel = new THREE.Vector3(extVel.x, 0, extVel.z)
      }
      localVelocity.current.add(extVel)
    }

    const isMoving = localVelocity.current.length() > 0.01

    if (actions) {
      if (isMoving) {
        actions.Idle?.fadeOut()
        actions.Walk?.reset().fadeIn().play()

        if (!isWalking.current && stepSound.current?.isPlaying === false) {
          stepSound.current?.play()
          isWalking.current = true
        }

        isIdleTalking.current = false
      } else {
        actions.Walk?.fadeOut()
        actions.Idle?.reset().fadeIn().play()

        stepSound.current?.pause()
        isWalking.current = false

        if (!isIdleTalking.current && talkSound.current?.buffer) {
          talkSound.current?.play()
          isIdleTalking.current = true
        }
      }
    }

    if (group.current) {
      const current = group.current.position

      // Check collision before moving
      const newX = current.x + localVelocity.current.x
      const newZ = current.z + localVelocity.current.z

      // Only move if no collision
      if (!checkWallCollision(newX, current.z)) {
        current.x = newX
      }
      if (!checkWallCollision(current.x, newZ)) {
        current.z = newZ
      }

      // Jump
      if (keys.current['j'] && isGrounded.current) {
        verticalVelocity.current = jumpSpeed
        isGrounded.current = false
      }

      // Gravity and ground follow
      verticalVelocity.current -= gravity * delta
      let tentativeY = current.y + verticalVelocity.current * delta
      const groundY = typeof getGroundY === 'function' ? getGroundY(current.x, current.z) : 0
      const bodyOffset = 0.05
      if (tentativeY <= groundY + bodyOffset) {
        tentativeY = groundY + bodyOffset
        verticalVelocity.current = 0
        isGrounded.current = true
      } else {
        isGrounded.current = false
      }
      current.y = tentativeY
      // Rotate penguin to face movement
      if (localVelocity.current.length() > 0.01) {
        group.current.rotation.y = Math.atan2(localVelocity.current.x, localVelocity.current.z)
      }
    }
  })

  return (
    <group ref={group} position={position} dispose={null}>
      <primitive object={nodes.Scene || nodes.scene || scene} />
    </group>
  )
})

export default Penguin
