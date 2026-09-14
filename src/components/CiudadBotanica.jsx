import { useMemo } from 'react'
import { useParallax } from '../hooks/useParallax'

function ruido(semilla) {
  const valor = Math.sin(semilla * 311.7) * 43758.5453
  return valor - Math.floor(valor)
}

function Torre({ x, ancho, alto, color, colorVerde, semilla }) {
  const plantas = Math.max(2, Math.round(alto / 46))
  const balcones = useMemo(
    () =>
      Array.from({ length: plantas }, (_, i) => ({
        clave: `${semilla}-${i}`,
        y: 420 - alto + (i * alto) / plantas + 10,
        salida: 8 + ruido(semilla + i) * 14
      })),
    [plantas, alto, semilla]
  )

  return (
    <g>
      <path
        d={`M${x} 420 L${x} ${420 - alto} Q${x + ancho / 2} ${420 - alto - 26} ${x + ancho} ${420 - alto} L${x + ancho} 420 Z`}
        fill={color}
      />
      {balcones.map((balcon) => (
        <g key={balcon.clave}>
          <rect x={x - balcon.salida} y={balcon.y} width={ancho + balcon.salida * 2} height="5" rx="2.5" fill={colorVerde} opacity="0.95" />
          <path
            d={`M${x - balcon.salida} ${balcon.y} q${(ancho + balcon.salida * 2) / 4} 16 ${(ancho + balcon.salida * 2) / 2} 2 q${(ancho + balcon.salida * 2) / 4} 14 ${(ancho + balcon.salida * 2) / 2} -2`}
            fill="none"
            stroke={colorVerde}
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      ))}
      <circle cx={x + ancho / 2} cy={420 - alto - 14} r={ancho * 0.26} fill={colorVerde} opacity="0.9" />
    </g>
  )
}

function Cupula({ x, radio, color, colorVidrio }) {
  return (
    <g>
      <path d={`M${x - radio} 420 A${radio} ${radio * 0.92} 0 0 1 ${x + radio} 420 Z`} fill={colorVidrio} opacity="0.85" />
      <path d={`M${x - radio} 420 A${radio} ${radio * 0.92} 0 0 1 ${x + radio} 420`} fill="none" stroke={color} strokeWidth="3.5" />
      <path d={`M${x} 420 L${x} ${420 - radio * 0.92}`} stroke={color} strokeWidth="2.5" opacity="0.6" />
      <path d={`M${x - radio * 0.62} ${420 - radio * 0.5} Q${x} ${420 - radio * 1.02} ${x + radio * 0.62} ${420 - radio * 0.5}`} fill="none" stroke={color} strokeWidth="2.5" opacity="0.6" />
      <path d={`M${x - radio * 0.35} 420 L${x - radio * 0.35} ${420 - radio * 0.83}`} stroke={color} strokeWidth="2" opacity="0.45" />
      <path d={`M${x + radio * 0.35} 420 L${x + radio * 0.35} ${420 - radio * 0.83}`} stroke={color} strokeWidth="2" opacity="0.45" />
    </g>
  )
}

function Aro({ x, y, radio, color }) {
  return (
    <g opacity="0.75">
      <circle cx={x} cy={y} r={radio} fill="none" stroke={color} strokeWidth="5" />
      <circle cx={x} cy={y} r={radio * 0.34} fill="none" stroke={color} strokeWidth="3" />
      <path d={`M${x} ${y + radio} L${x} 420`} stroke={color} strokeWidth="4" />
    </g>
  )
}

function CapaLejana() {
  return (
    <svg viewBox="0 0 1440 440" preserveAspectRatio="xMidYMax slice" className="trazo h-full w-full">
      <Torre x={120} ancho={46} alto={228} color="#bcd6c4" colorVerde="#9dc4a6" semilla={2} />
      <Torre x={228} ancho={34} alto={166} color="#bcd6c4" colorVerde="#9dc4a6" semilla={5} />
      <Aro x={356} y={196} radio={62} color="#b2cfbc" />
      <Torre x={470} ancho={52} alto={262} color="#bcd6c4" colorVerde="#9dc4a6" semilla={9} />
      <Cupula x={640} radio={96} color="#a9c9b4" colorVidrio="#cfe3d4" />
      <Torre x={806} ancho={40} alto={204} color="#bcd6c4" colorVerde="#9dc4a6" semilla={13} />
      <Torre x={900} ancho={58} alto={286} color="#bcd6c4" colorVerde="#9dc4a6" semilla={21} />
      <Aro x={1064} y={172} radio={54} color="#b2cfbc" />
      <Torre x={1180} ancho={44} alto={222} color="#bcd6c4" colorVerde="#9dc4a6" semilla={29} />
      <Cupula x={1340} radio={82} color="#a9c9b4" colorVidrio="#cfe3d4" />
    </svg>
  )
}

function CapaMedia() {
  return (
    <svg viewBox="0 0 1440 440" preserveAspectRatio="xMidYMax slice" className="trazo h-full w-full">
      <Torre x={64} ancho={64} alto={196} color="#8fb69c" colorVerde="#6fa47e" semilla={31} />
      <Cupula x={268} radio={110} color="#5d8f72" colorVidrio="#a6cbb2" />
      <Torre x={430} ancho={72} alto={244} color="#8fb69c" colorVerde="#6fa47e" semilla={37} />
      <Aro x={600} y={214} radio={74} color="#79a98a" />
      <Torre x={742} ancho={58} alto={172} color="#8fb69c" colorVerde="#6fa47e" semilla={43} />
      <Cupula x={930} radio={124} color="#5d8f72" colorVidrio="#a6cbb2" />
      <Torre x={1116} ancho={68} alto={226} color="#8fb69c" colorVerde="#6fa47e" semilla={47} />
      <Torre x={1252} ancho={50} alto={158} color="#8fb69c" colorVerde="#6fa47e" semilla={53} />
    </svg>
  )
}

export default function CiudadBotanica() {
  const lejos = useParallax(0.03)
  const medio = useParallax(0.07)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] overflow-hidden" style={{ height: '58vh' }}>
      <div
        className="absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 34%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 34%, black 100%)'
        }}
      >
        <div ref={lejos} className="absolute inset-x-0 bottom-0" style={{ height: '100%', opacity: 0.6 }}>
          <CapaLejana />
        </div>
        <div ref={medio} className="absolute inset-x-0 bottom-0" style={{ height: '82%', opacity: 0.78 }}>
          <CapaMedia />
        </div>
      </div>
    </div>
  )
}
