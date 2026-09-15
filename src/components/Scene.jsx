import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdditiveBlending, BackSide, Color, DoubleSide } from 'three'
import { pulso } from '../estado/pulso'

const vertexCinta = `
uniform float uTime;
varying vec2 vUv;
varying float vAltura;

void main() {
  vUv = uv;
  vec3 pos = position;
  float x = pos.x;

  float sobre = smoothstep(-3.3, -1.5, x) * (1.0 - smoothstep(1.5, 3.3, x));

  pos.y += (sin(x * 1.15 + uTime * 0.55) * 0.42 + sin(x * 2.4 - uTime * 0.37) * 0.16) * sobre;
  pos.z += (sin(x * 0.82 + uTime * 0.46) * 0.72 + cos(x * 1.9 + uTime * 0.29) * 0.18) * sobre;
  pos.y *= 0.35 + sobre * 0.85;

  vAltura = pos.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentCinta = `
precision highp float;
uniform float uTime;
uniform vec3 uCielo;
uniform vec3 uMenta;
uniform vec3 uSol;
uniform vec3 uRosa;
uniform vec3 uLila;
varying vec2 vUv;
varying float vAltura;

void main() {
  float t = fract(vUv.x * 1.15 + uTime * 0.035);

  vec3 color = mix(uCielo, uMenta, smoothstep(0.0, 0.26, t));
  color = mix(color, uSol, smoothstep(0.24, 0.5, t));
  color = mix(color, uRosa, smoothstep(0.48, 0.74, t));
  color = mix(color, uLila, smoothstep(0.72, 0.94, t));
  color = mix(color, uCielo, smoothstep(0.92, 1.0, t));

  float brillo = 0.82 + 0.3 * smoothstep(-0.9, 0.9, vAltura);
  color *= brillo;

  float bordeY = smoothstep(0.0, 0.34, vUv.y) * (1.0 - smoothstep(0.66, 1.0, vUv.y));
  float bordeX = smoothstep(0.0, 0.16, vUv.x) * (1.0 - smoothstep(0.84, 1.0, vUv.x));

  gl_FragColor = vec4(color, bordeY * bordeX * 0.9);
}
`

const vertexParticulas = `
attribute float aSemilla;
varying float vSemilla;
uniform float uTime;
uniform float uPuntero;
uniform float uEntrada;
uniform float uPulso;
varying float vEntrada;
varying float vPulso;

void main() {
  vSemilla = aSemilla;
  vEntrada = uEntrada;
  vPulso = uPulso;
  vec3 pos = position;
  float pulso = sin(uTime * 0.65 + aSemilla * 6.2831) * 0.05;

  float retardo = aSemilla * 0.22;
  float avance = clamp((uEntrada - retardo) / (1.0 - retardo), 0.0, 1.0);
  float suave = avance * avance * (3.0 - 2.0 * avance);
  float dispersion = mix(3.4 + aSemilla * 2.1, 1.0, suave);

  pos *= dispersion;
  float empuje = uPulso * (0.14 + sin(uTime * 2.1 + aSemilla * 6.2831) * 0.05);
  pos += normalize(pos) * (pulso + uPuntero * 0.09 + empuje) * suave;
  vec4 vista = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (11.0 + aSemilla * 15.0) * (1.0 + uPulso * 0.55) * (1.0 / -vista.z) * mix(0.3, 1.0, suave);
  gl_Position = projectionMatrix * vista;
}
`

const fragmentParticulas = `
precision highp float;
varying float vSemilla;
varying float vEntrada;
varying float vPulso;
uniform vec3 uCobre;
uniform vec3 uSol;
uniform vec3 uCrema;

void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  if (r > 0.5) discard;
  float borde = smoothstep(0.5, 0.05, r);
  vec3 color = mix(uCobre, uSol, vSemilla);
  color = mix(color, uCrema, smoothstep(0.82, 1.0, vSemilla));
  color = mix(color, uCrema, vPulso * 0.32);
  gl_FragColor = vec4(color, borde * (0.92 + vPulso * 0.18) * smoothstep(0.0, 0.14, vEntrada));
}
`

const vertexBurbuja = `
varying vec3 vNormal;
varying vec3 vVista;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 vista = modelViewMatrix * vec4(position, 1.0);
  vVista = normalize(-vista.xyz);
  gl_Position = projectionMatrix * vista;
}
`

const fragmentBurbuja = `
precision highp float;
uniform vec3 uCrema;
uniform vec3 uCielo;
uniform vec3 uSol;
uniform float uPulso;
varying vec3 vNormal;
varying vec3 vVista;

void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vVista), 0.0), 2.4 - uPulso * 0.9);
  vec3 color = mix(uCielo, uCrema, fresnel);
  color = mix(color, uSol, uPulso * 0.4);
  gl_FragColor = vec4(color, fresnel * (0.5 + uPulso * 0.34));
}
`

const PALETA = {
  cielo: new Color('#79cfd6'),
  menta: new Color('#a8dcc4'),
  sol: new Color('#f4d07a'),
  rosa: new Color('#efb0b8'),
  lila: new Color('#c3b6de'),
  cobre: new Color('#c2703d'),
  crema: new Color('#fbf6e7')
}

function CintaPrisma() {
  const material = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCielo: { value: PALETA.cielo },
      uMenta: { value: PALETA.menta },
      uSol: { value: PALETA.sol },
      uRosa: { value: PALETA.rosa },
      uLila: { value: PALETA.lila }
    }),
    []
  )

  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta
  })

  return (
    <mesh position={[0, 0, -0.6]} rotation={[0, 0, -0.04]} renderOrder={0}>
      <planeGeometry args={[6.9, 1.62, 190, 36]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexCinta}
        fragmentShader={fragmentCinta}
        transparent
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  )
}

function EsferaParticulas({ cantidad = 3400, radio = 1.22 }) {
  const puntos = useRef()
  const material = useRef()
  const puntero = useRef(0)

  const { posiciones, semillas } = useMemo(() => {
    const posiciones = new Float32Array(cantidad * 3)
    const semillas = new Float32Array(cantidad)
    const dorado = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < cantidad; i += 1) {
      const y = 1 - (i / (cantidad - 1)) * 2
      const anillo = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = dorado * i
      posiciones[i * 3] = Math.cos(theta) * anillo * radio
      posiciones[i * 3 + 1] = y * radio
      posiciones[i * 3 + 2] = Math.sin(theta) * anillo * radio
      semillas[i] = Math.random()
    }
    return { posiciones, semillas }
  }, [cantidad, radio])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPuntero: { value: 0 },
      uEntrada: { value: 0 },
      uPulso: { value: 0 },
      uCobre: { value: PALETA.cobre },
      uSol: { value: PALETA.sol },
      uCrema: { value: PALETA.crema }
    }),
    []
  )

  useFrame((estado, delta) => {
    if (!puntos.current || !material.current) return
    material.current.uniforms.uTime.value += delta
    material.current.uniforms.uEntrada.value = Math.min(1, material.current.uniforms.uEntrada.value + delta / 0.85)
    const objetivo = estado.pointer.x * estado.pointer.x + estado.pointer.y * estado.pointer.y
    puntero.current += (objetivo - puntero.current) * 0.05
    material.current.uniforms.uPuntero.value = puntero.current
    const actual = material.current.uniforms.uPulso.value
    material.current.uniforms.uPulso.value = actual + (pulso.objetivo - actual) * Math.min(1, delta * 5.5)
    puntos.current.rotation.y += delta * (0.075 + material.current.uniforms.uPulso.value * 0.14)
    puntos.current.rotation.x = estado.pointer.y * 0.22
    puntos.current.rotation.z = estado.pointer.x * 0.12
  })

  return (
    <points ref={puntos} renderOrder={2}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={posiciones} count={cantidad} itemSize={3} />
        <bufferAttribute attach="attributes-aSemilla" array={semillas} count={cantidad} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexParticulas}
        fragmentShader={fragmentParticulas}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

function Burbuja({ radio = 1.34 }) {
  const material = useRef()

  const uniforms = useMemo(
    () => ({
      uCrema: { value: PALETA.crema },
      uCielo: { value: PALETA.cielo },
      uSol: { value: PALETA.sol },
      uPulso: { value: 0 }
    }),
    []
  )

  useFrame((_, delta) => {
    if (!material.current) return
    const actual = material.current.uniforms.uPulso.value
    material.current.uniforms.uPulso.value = actual + (pulso.objetivo - actual) * Math.min(1, delta * 5.5)
  })

  return (
    <mesh renderOrder={1}>
      <sphereGeometry args={[radio, 48, 48]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexBurbuja}
        fragmentShader={fragmentBurbuja}
        transparent
        depthWrite={false}
        side={BackSide}
      />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div className="lienzo-fondo" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 44 }}
      >
        <CintaPrisma />
        <Burbuja />
        <EsferaParticulas />
      </Canvas>
    </div>
  )
}