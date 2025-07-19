import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Penguin = forwardRef(({ position = [0, 0, 0], externalVelocity }, ref) => {
  const group = useRef()
  const { nodes, animations, scene } = useGLTF('/assets/models/penguin.glb')
  const { actions } = useAnimations(animations, group)
  const { camera } = useThree()

  const keys = useRef({})
  const localVelocity = useRef(new THREE.Vector3())

  const stepSound = useRef()
  const talkSound = useRef()
  const listener = useRef(null)
  const [audioReady, setAudioReady] = useState(false)
  const isWalking = useRef(false)
  const isIdleTalking = useRef(false)

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
    localVelocity.current.set(0, 0, 0)

    if (keys.current['w'] || keys.current['arrowup']) localVelocity.current.z -= speed * delta
    if (keys.current['s'] || keys.current['arrowdown']) localVelocity.current.z += speed * delta
    if (keys.current['a'] || keys.current['arrowleft']) localVelocity.current.x -= speed * delta
    if (keys.current['d'] || keys.current['arrowright']) localVelocity.current.x += speed * delta

    if (externalVelocity) {
      localVelocity.current.add(externalVelocity)
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
      group.current.position.add(localVelocity.current)
    }
  })

  return (
    <group ref={group} position={position} dispose={null}>
      <primitive object={nodes.Scene || nodes.scene || scene} />
    </group>
  )
})

export default Penguin
