import { useMemo } from 'react'

function ruido(semilla) {
  const valor = Math.sin(semilla * 53.17) * 43758.5453
  return valor - Math.floor(valor)
}

export default function Destellos({ cantidad = 30 }) {
  const particulas = useMemo(
    () =>
      Array.from({ length: cantidad }, (_, i) => {
        const a = ruido(i * 2.3 + 5)
        const b = ruido(i * 4.7 + 19)
        const c = ruido(i * 7.1 + 31)
        const d = ruido(i * 9.3 + 47)
        return {
          clave: i,
          izquierda: a * 100,
          arriba: b * 100,
          tam: 3 + c * 6,
          duracion: 11 + d * 13,
          retardo: -(a * 24),
          deriva: (c - 0.5) * 34
        }
      }),
    [cantidad]
  )

  return (
    <div className="destellos" aria-hidden="true">
      {particulas.map((particula) => (
        <span
          key={particula.clave}
          className="destello"
          style={{
            left: `${particula.izquierda}%`,
            top: `${particula.arriba}%`,
            width: `${particula.tam}px`,
            height: `${particula.tam}px`,
            animationDuration: `${particula.duracion}s`,
            animationDelay: `${particula.retardo}s`,
            '--deriva': `${particula.deriva}px`
          }}
        />
      ))}
    </div>
  )
}
