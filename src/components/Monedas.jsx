import { useCallback, useMemo, useRef, useState } from 'react'
import ContadorMonedas from './ContadorMonedas'

function ruido(semilla) {
  const valor = Math.sin(semilla * 97.3) * 43758.5453
  return valor - Math.floor(valor)
}

function Moneda({ tam }) {
  return (
    <svg viewBox="0 0 48 48" width={tam} height={tam} aria-hidden="true">
      <ellipse cx="24" cy="24" rx="17" ry="21" fill="#e8a417" stroke="#8c5210" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="11.5" ry="15.5" fill="#f7cf4e" />
      <path d="M24 13 C19 17, 19 31, 24 35" fill="none" stroke="#8c5210" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 13 C29 17, 29 31, 24 35" fill="none" stroke="#8c5210" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="18.5" cy="17" rx="2.6" ry="4" fill="#fdf0b8" opacity="0.9" />
    </svg>
  )
}

function Margarita({ tam }) {
  const petalos = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 48 48" width={tam} height={tam} aria-hidden="true">
      {petalos.map((giro) => (
        <ellipse
          key={giro}
          cx="24"
          cy="11"
          rx="6.5"
          ry="9.5"
          fill="#fffdf5"
          stroke="#2d2a24"
          strokeWidth="1.6"
          transform={`rotate(${giro} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="8.5" fill="#f7b32b" stroke="#2d2a24" strokeWidth="1.8" />
      <circle cx="21" cy="22" r="1.3" fill="#2d2a24" />
      <circle cx="27" cy="22" r="1.3" fill="#2d2a24" />
      <path d="M20.5 26.5 Q24 29.5 27.5 26.5" fill="none" stroke="#2d2a24" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function Chispas({ tam }) {
  const rayos = [0, 60, 120, 180, 240, 300]
  return (
    <svg viewBox="0 0 48 48" width={tam} height={tam} aria-hidden="true" className="chispas">
      {rayos.map((giro) => (
        <path
          key={giro}
          d="M24 8 L26 17 L24 20 L22 17 Z"
          fill="#fdf0b8"
          stroke="#e8a417"
          strokeWidth="1"
          transform={`rotate(${giro} 24 24)`}
        />
      ))}
    </svg>
  )
}

export default function Monedas({ cantidad = 11 }) {
  const iniciales = useMemo(
    () =>
      Array.from({ length: cantidad }, (_, i) => {
        const a = ruido(i * 1.7 + 1)
        const b = ruido(i * 3.1 + 7)
        const c = ruido(i * 5.9 + 13)
        return {
          clave: i,
          izquierda: 6 + a * 86,
          arriba: 8 + b * 64,
          tam: 26 + c * 26,
          retardo: -(a * 6).toFixed(2),
          duracion: (4.6 + b * 3.4).toFixed(2),
          esFlor: c > 0.7
        }
      }),
    [cantidad]
  )

  const [recogidas, setRecogidas] = useState({})
  const [desplazos, setDesplazos] = useState({})
  const [contador, setContador] = useState(0)
  const arrastre = useRef(null)
  const yaRecogidas = useRef({})

  const recoger = useCallback((clave) => {
    if (yaRecogidas.current[clave]) return
    yaRecogidas.current[clave] = true
    setContador((total) => total + 1)
    setRecogidas((previas) => ({ ...previas, [clave]: 'volando' }))
    window.setTimeout(() => {
      setRecogidas((previas) => ({ ...previas, [clave]: 'fuera' }))
    }, 640)
  }, [])

  const alBajar = useCallback(
    (evento, clave) => {
      evento.currentTarget.setPointerCapture(evento.pointerId)
      const actual = desplazos[clave] || { x: 0, y: 0 }
      arrastre.current = { clave, inicioX: evento.clientX, inicioY: evento.clientY, baseX: actual.x, baseY: actual.y }
    },
    [desplazos]
  )

  const alMover = useCallback((evento) => {
    const activo = arrastre.current
    if (!activo) return
    setDesplazos((previos) => ({
      ...previos,
      [activo.clave]: {
        x: activo.baseX + (evento.clientX - activo.inicioX),
        y: activo.baseY + (evento.clientY - activo.inicioY)
      }
    }))
  }, [])

  const alSoltar = useCallback((evento) => {
    if (evento.currentTarget.hasPointerCapture(evento.pointerId)) {
      evento.currentTarget.releasePointerCapture(evento.pointerId)
    }
    arrastre.current = null
  }, [])

  return (
    <>
      <ContadorMonedas total={contador} />
      <div className="capa-piezas" aria-hidden="true">
      {iniciales.map((pieza) => {
        const estado = recogidas[pieza.clave]
        if (estado === 'fuera') return null

        const posicion = {
          position: 'absolute',
          left: `${pieza.izquierda}%`,
          top: `${pieza.arriba}%`
        }

        if (pieza.esFlor) {
          const desplazo = desplazos[pieza.clave] || { x: 0, y: 0 }
          const movida = desplazo.x !== 0 || desplazo.y !== 0
          return (
            <span
              key={pieza.clave}
              className={movida ? 'pieza-flor' : 'pieza-flor flota'}
              style={{
                ...posicion,
                transform: movida ? `translate3d(${desplazo.x}px, ${desplazo.y}px, 0)` : undefined,
                animationDelay: `${pieza.retardo}s`,
                animationDuration: `${pieza.duracion}s`
              }}
              onPointerDown={(evento) => alBajar(evento, pieza.clave)}
              onPointerMove={alMover}
              onPointerUp={alSoltar}
              onPointerCancel={alSoltar}
            >
              <Margarita tam={pieza.tam} />
            </span>
          )
        }

        return (
          <span key={pieza.clave} style={posicion} className={estado ? 'pieza-moneda' : 'pieza-moneda flota'}>
            {estado === 'volando' && <Chispas tam={pieza.tam * 1.9} />}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className={estado === 'volando' ? 'boton-moneda recogida' : 'boton-moneda gira'}
              style={{ animationDelay: `${pieza.retardo}s`, animationDuration: `${pieza.duracion}s` }}
              onClick={() => recoger(pieza.clave)}
            >
              <Moneda tam={pieza.tam} />
            </button>
          </span>
        )
      })}
      </div>
    </>
  )
}