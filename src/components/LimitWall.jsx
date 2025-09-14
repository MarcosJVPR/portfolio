import { useRef, useState } from 'react'
import { Box, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LimitWall({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    size = [20, 10, 1],
    color = '#ff6b6b',
    opacity = 0.3,
    showControls = true,
    onPositionChange = null
}) {
    const wallRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, z: 0 })
    const [currentPosition, setCurrentPosition] = useState(position)

    useFrame(() => {
        if (wallRef.current) {
            wallRef.current.position.set(...currentPosition)
        }
    })

    const handlePointerDown = (event) => {
        if (!showControls) return
        event.stopPropagation()
        setIsDragging(true)
        setDragStart({
            x: event.point.x - currentPosition[0],
            z: event.point.z - currentPosition[2]
        })
    }

    const handlePointerMove = (event) => {
        if (!isDragging || !showControls) return
        event.stopPropagation()
        const newPosition = [
            event.point.x - dragStart.x,
            currentPosition[1], // Keep Y position
            event.point.z - dragStart.z
        ]
        setCurrentPosition(newPosition)
        if (onPositionChange) {
            onPositionChange(newPosition)
        }
    }

    const handlePointerUp = () => {
        setIsDragging(false)
    }

    return (
        <group>
            <mesh
                ref={wallRef}
                position={currentPosition}
                rotation={rotation}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                <boxGeometry args={size} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {showControls && (
                <Html position={[currentPosition[0], currentPosition[1] + size[1] / 2 + 1, currentPosition[2]]}>
                    <div
                        style={{
                            background: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            minWidth: '120px',
                            pointerEvents: 'none'
                        }}
                    >
                        <div>Limit Wall</div>
                        <div>X: {currentPosition[20].toFixed(1)}</div>
                        <div>Z: {currentPosition[60].toFixed(1)}</div>
                        <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>
                            Click & drag to move
                        </div>
                    </div>
                </Html>
            )}
        </group>
    )
}