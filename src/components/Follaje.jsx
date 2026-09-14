import { useMemo } from 'react'
import { useParallax } from '../hooks/useParallax'

function ruido(semilla) {
  const valor = Math.sin(semilla * 127.1) * 43758.5453
  return valor - Math.floor(valor)
}

function Hoja({ x, y, giro, escala, color, opacidad }) {
  return (
    <path
      d="M0 0 C 9 -13, 28 -17, 42 -5 C 28 8, 9 12, 0 0 Z"
      fill={color}
      opacity={opacidad}
      transform={`translate(${x} ${y}) rotate(${giro}) scale(${escala})`}
    />
  )
}

function Guirnalda({ cantidad, base, amplitud, color, colorClaro, escalaBase, semilla }) {
  const hojas = useMemo(() => {
    const paso = 1440 / cantidad
    return Array.from({ length: cantidad }, (_, i) => {
      const a = ruido(semilla + i * 1.7)
      const b = ruido(semilla + i * 3.3 + 11)
      const c = ruido(semilla + i * 5.1 + 23)
      return {
        clave: `${semilla}-${i}`,
        x: i * paso + (a - 0.5) * paso * 0.9,
        y: base + Math.sin(i * 0.55 + semilla) * amplitud + b * amplitud * 0.8,
        giro: 20 + c * 150,
        escala: escalaBase * (0.65 + a * 0.75),
        color: b > 0.62 ? colorClaro : color,
        opacidad: 0.82 + c * 0.18
      }
    })
  }, [cantidad, base, amplitud, color, colorClaro, escalaBase, semilla])

  return (
    <g>
      {hojas.map((hoja) => (
        <Hoja
          key={hoja.clave}
          x={hoja.x}
          y={hoja.y}
          giro={hoja.giro}
          escala={hoja.escala}
          color={hoja.color}
          opacidad={hoja.opacidad}
        />
      ))}
    </g>
  )
}

export function Dosel() {
  const capaLenta = useParallax(0.05)
  const capaMedia = useParallax(0.1)

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden" style={{ height: '30vh' }}>
      <div ref={capaLenta} className="absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMin slice" className="trazo w-full" style={{ height: '30vh' }}>
          <path
            d="M0,0 H1440 V62 c-46,34 -104,26 -142,2 -34,-22 -80,-16 -106,10 -28,28 -78,30 -112,4 -32,-24 -80,-16 -104,12 -26,30 -78,30 -110,2 -30,-26 -80,-16 -104,12 -24,28 -74,28 -106,2 -30,-24 -78,-14 -102,14 -24,28 -74,26 -104,0 -28,-24 -74,-14 -98,14 -22,26 -60,28 -92,10 -26,-14 -54,-10 -78,10 -22,18 -52,22 -82,12 Z"
            fill="#1f4a38"
            opacity="0.94"
          />
          <Guirnalda cantidad={46} base={92} amplitud={20} color="#1f4a38" colorClaro="#2f6b4f" escalaBase={1.25} semilla={3} />
        </svg>
      </div>

      <div ref={capaMedia} className="absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMin slice" className="trazo w-full" style={{ height: '24vh' }}>
          <path
            d="M0,0 H1440 V40 c-40,30 -92,22 -124,0 -30,-20 -72,-16 -96,8 -26,26 -74,28 -104,4 -28,-22 -74,-14 -96,12 -24,28 -72,28 -102,2 -28,-24 -74,-14 -96,14 -22,26 -70,26 -98,2 -28,-24 -72,-14 -94,14 -22,26 -60,26 -88,6 -26,-18 -54,-12 -76,10 -20,20 -50,24 -78,14 Z"
            fill="#4f8f5c"
            opacity="0.9"
          />
          <Guirnalda cantidad={40} base={68} amplitud={18} color="#4f8f5c" colorClaro="#7fb069" escalaBase={1.05} semilla={17} />
        </svg>
      </div>

      <div className="absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="xMidYMin slice" className="trazo w-full" style={{ height: '15vh' }}>
          <path
            d="M0,0 H1440 V26 c-34,22 -78,16 -106,-2 -26,-17 -64,-14 -86,6 -24,22 -68,24 -94,2 -26,-21 -68,-14 -88,10 -20,24 -64,26 -92,4 -26,-20 -66,-12 -86,12 -20,24 -62,24 -88,2 -26,-22 -68,-14 -90,10 -20,22 -56,24 -82,8 -24,-16 -50,-12 -72,8 -18,16 -44,20 -70,10 Z"
            fill="#7fb069"
            opacity="0.7"
          />
          <Guirnalda cantidad={34} base={46} amplitud={14} color="#7fb069" colorClaro="#f2c14e" escalaBase={0.9} semilla={41} />
        </svg>
      </div>
    </div>
  )
}

export function Suelo() {
  const capa = useParallax(0.04)

  return (
    <div ref={capa} className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={{ height: '20vh' }}>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className="trazo h-full w-full">
        <path
          d="M0,220 V120 c40,-22 84,-6 116,10 30,15 66,12 92,-8 30,-23 74,-18 102,6 26,22 66,22 94,2 30,-21 74,-16 100,8 26,24 68,24 96,2 28,-22 72,-18 100,6 26,22 66,22 92,2 30,-21 76,-14 102,10 26,24 68,22 96,0 28,-22 74,-16 106,8 26,20 60,26 98,12 V220 Z"
          fill="#2f6b4f"
          opacity="0.95"
        />
        <Guirnalda cantidad={38} base={128} amplitud={16} color="#2f6b4f" colorClaro="#7fb069" escalaBase={1} semilla={7} />
        <path
          d="M0,220 V168 c48,-18 92,-2 124,14 30,15 64,10 88,-8 28,-21 70,-16 96,6 26,22 64,20 90,0 28,-21 72,-14 96,10 26,24 66,22 92,0 28,-22 72,-16 100,8 26,22 66,20 92,-2 28,-24 74,-16 104,8 26,20 58,24 98,10 V220 Z"
          fill="#1f4a38"
          opacity="0.92"
        />
      </svg>
    </div>
  )
}
