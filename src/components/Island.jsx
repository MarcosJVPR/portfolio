import { useGLTF } from "@react-three/drei"

export default function Island({ position = [0, 0, 0], scale = 1 }) {
    const { scene } = useGLTF("/assets/models/island.glb")

    return (
        <primitive
            object={scene}
            position={position}
            scale={scale}
            castShadow
            receiveShadow
        />
    )
} 