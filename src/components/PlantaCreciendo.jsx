import { useEffect, useRef, useState } from 'react'

export default function PlantaCreciendo() {
  const contenedor = useRef(null)
  const [crecida, setCrecida] = useState(false)

  useEffect(() => {
    const nodo = contenedor.current
    if (!nodo) return
    if (!('IntersectionObserver' in window)) {
      setCrecida(true)
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setCrecida(true)
          observador.disconnect()
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.2 }
    )

    observador.observe(nodo)
    return () => observador.disconnect()
  }, [])

  return (
    <div ref={contenedor} className={`planta${crecida ? ' planta-crecida' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 200 420" className="trazo" width="100%" height="100%">
        <g className="planta-tierra">
          <path
            d="M34 392 Q100 376 166 392 L166 404 Q100 418 34 404 Z"
            fill="#c9a36d"
            stroke="var(--color-tinta)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M52 396 L60 390 M88 398 L96 392 M126 396 L134 390" stroke="#8a6234" strokeWidth="2" strokeLinecap="round" />
        </g>

        <path
          className="planta-tallo"
          d="M100 392 C100 336, 92 300, 98 252 C104 206, 96 172, 100 132"
          fill="none"
          stroke="var(--color-hoja)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <g className="planta-hoja planta-hoja-1">
          <path
            d="M98 318 C70 314, 48 296, 44 272 C72 268, 94 288, 98 318 Z"
            fill="var(--color-hoja)"
            stroke="var(--color-tinta)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M96 314 C82 306, 68 294, 54 278" stroke="var(--color-musgo)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>

        <g className="planta-hoja planta-hoja-2">
          <path
            d="M100 254 C128 250, 152 232, 156 208 C128 204, 104 224, 100 254 Z"
            fill="var(--color-hoja)"
            stroke="var(--color-tinta)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M102 250 C116 242, 132 230, 146 214" stroke="var(--color-musgo)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>

        <g className="planta-hoja planta-hoja-3">
          <path
            d="M98 196 C74 194, 56 180, 52 160 C76 156, 94 172, 98 196 Z"
            fill="var(--color-hoja)"
            stroke="var(--color-tinta)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </g>

        <g className="planta-flor">
          <g className="planta-petalos">
            {Array.from({ length: 12 }, (_, indice) => (
              <ellipse
                key={indice}
                cx="100"
                cy="76"
                rx="13"
                ry="30"
                fill="var(--color-sol)"
                stroke="var(--color-tinta)"
                strokeWidth="2"
                transform={`rotate(${indice * 30} 100 106)`}
              />
            ))}
          </g>
          <circle cx="100" cy="106" r="24" fill="#8a6234" stroke="var(--color-tinta)" strokeWidth="2.4" />
          <circle cx="100" cy="106" r="15" fill="#6d4a24" opacity="0.65" />
          <path
            className="planta-cara"
            d="M92 102 L92 104 M108 102 L108 104 M92 114 Q100 121 108 114"
            stroke="var(--color-papel)"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}