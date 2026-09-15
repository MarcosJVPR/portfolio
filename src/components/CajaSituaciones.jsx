import { useCallback, useMemo, useRef, useState } from 'react'
import { casos } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'

const DESTINOS = [
  { x: 24, y: 30 },
  { x: 72, y: 24 },
  { x: 50, y: 66 },
  { x: 18, y: 66 },
  { x: 80, y: 62 },
  { x: 38, y: 20 }
]

function Caja({ abierta }) {
  return (
    <svg viewBox="0 0 220 190" width="100%" height="100%" aria-hidden="true" className="trazo">
      <g
        style={{
          transformOrigin: '52px 96px',
          transform: abierta ? 'rotate(-58deg)' : 'rotate(-6deg)',
          transition: 'transform 620ms cubic-bezier(0.34, 1.4, 0.5, 1)'
        }}
      >
        <path d="M52 96 L104 78 L104 60 L52 78 Z" fill="#d9b483" stroke="#8a6234" strokeWidth="2.5" />
      </g>
      <g
        style={{
          transformOrigin: '168px 96px',
          transform: abierta ? 'rotate(58deg)' : 'rotate(6deg)',
          transition: 'transform 620ms cubic-bezier(0.34, 1.4, 0.5, 1)'
        }}
      >
        <path d="M168 96 L116 78 L116 60 L168 78 Z" fill="#d9b483" stroke="#8a6234" strokeWidth="2.5" />
      </g>

      <path d="M52 92 L110 74 L168 92 L110 110 Z" fill="#2e2413" opacity={abierta ? 0.55 : 0} style={{ transition: 'opacity 500ms' }} />
      <path d="M52 92 L110 110 L110 176 L52 158 Z" fill="#c9a36d" stroke="#8a6234" strokeWidth="2.5" />
      <path d="M168 92 L110 110 L110 176 L168 158 Z" fill="#b98f57" stroke="#8a6234" strokeWidth="2.5" />
      <path d="M110 110 L110 176" stroke="#8a6234" strokeWidth="2" opacity="0.5" />
      <path d="M64 124 L96 136" stroke="#8a6234" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M156 124 L124 136" stroke="#8a6234" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </svg>
  )
}

export default function CajaSituaciones() {
  const { t, idioma } = useLang()
  const [abierta, setAbierta] = useState(false)
  const [cartas, setCartas] = useState(() =>
    casos.map((caso, i) => ({ id: caso.id, dx: 0, dy: 0, z: i + 1, expandida: false }))
  )
  const arrastre = useRef(null)
  const zTope = useRef(casos.length)

  const porId = useMemo(() => Object.fromEntries(casos.map((caso) => [caso.id, caso])), [])

  const alFrente = useCallback((id) => {
    zTope.current += 1
    const z = zTope.current
    setCartas((previas) => previas.map((carta) => (carta.id === id ? { ...carta, z } : carta)))
  }, [])

  const pintar = useCallback(() => {
    const activo = arrastre.current
    if (!activo) return
    activo.cuadro = 0
    activo.nodo.style.transform = `translate(-50%, -50%) translate(${activo.dx}px, ${activo.dy}px) scale(1)`
  }, [])

  const alBajar = useCallback(
    (evento, id) => {
      if (evento.target.closest('button')) return
      const nodo = evento.currentTarget
      nodo.setPointerCapture(evento.pointerId)
      nodo.classList.add('carta-arrastrando')
      const carta = cartas.find((item) => item.id === id)
      arrastre.current = {
        id,
        nodo,
        inicioX: evento.clientX,
        inicioY: evento.clientY,
        baseX: carta.dx,
        baseY: carta.dy,
        dx: carta.dx,
        dy: carta.dy,
        movido: false,
        cuadro: 0
      }
      alFrente(id)
    },
    [cartas, alFrente]
  )

  const alMover = useCallback(
    (evento) => {
      const activo = arrastre.current
      if (!activo) return
      const dx = evento.clientX - activo.inicioX
      const dy = evento.clientY - activo.inicioY
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) activo.movido = true
      activo.dx = activo.baseX + dx
      activo.dy = activo.baseY + dy
      if (!activo.cuadro) activo.cuadro = window.requestAnimationFrame(pintar)
    },
    [pintar]
  )

  const alSoltar = useCallback((evento, id) => {
    const activo = arrastre.current
    if (evento.currentTarget.hasPointerCapture(evento.pointerId)) {
      evento.currentTarget.releasePointerCapture(evento.pointerId)
    }
    evento.currentTarget.classList.remove('carta-arrastrando')
    if (activo) {
      if (activo.cuadro) window.cancelAnimationFrame(activo.cuadro)
      const { dx, dy, movido } = activo
      arrastre.current = null
      setCartas((previas) =>
        previas.map((carta) =>
          carta.id === id ? { ...carta, dx, dy, expandida: movido ? carta.expandida : !carta.expandida } : carta
        )
      )
      return
    }
    arrastre.current = null
  }, [])

  const guardar = useCallback(() => {
    setAbierta(false)
    setCartas((previas) => previas.map((carta) => ({ ...carta, dx: 0, dy: 0, expandida: false })))
  }, [])

  return (
    <section id="casos" className="seccion seccion-pradera">
      <div className="envoltura relative z-20">
        <h2 className="subrayado-sol inline">{t.caja.titulo}</h2>
        <p className="mt-6 text-lg">{t.caja.entrada}</p>

        <div className="prado">
          {cartas.map((carta, indice) => {
            const caso = porId[carta.id]
            const contenido = caso[idioma]
            const destino = DESTINOS[indice % DESTINOS.length]

            return (
              <article
                key={carta.id}
                className={`carta-caja${carta.expandida ? ' carta-abierta' : ''}`}
                style={{
                  left: abierta ? `${destino.x}%` : '50%',
                  top: abierta ? `${destino.y}%` : '62%',
                  zIndex: carta.z,
                  opacity: abierta ? 1 : 0,
                  transform: `translate(-50%, -50%) translate(${carta.dx}px, ${carta.dy}px) scale(${abierta ? 1 : 0.2})`,
                  transitionDelay: abierta ? `${indice * 110}ms` : '0ms',
                  pointerEvents: abierta ? 'auto' : 'none',
                  borderTopColor: caso.acento
                }}
                onPointerDown={(evento) => alBajar(evento, carta.id)}
                onPointerMove={alMover}
                onPointerUp={(evento) => alSoltar(evento, carta.id)}
                onPointerCancel={(evento) => alSoltar(evento, carta.id)}
              >
                <p className="text-xs font-bold" style={{ color: caso.acento }}>
                  {caso.proyecto}
                </p>
                <h3 className="mt-1 text-lg leading-tight">{contenido.titulo}</h3>

                {carta.expandida && (
                  <div className="carta-cuerpo">
                    {['problema', 'restriccion', 'decision', 'resultado'].map((clave) => (
                      <div key={clave} className="carta-fila">
                        <span className="text-xs font-bold" style={{ color: caso.acento }}>
                          {t.casos.etiquetas[clave]}
                        </span>
                        <p className="mt-1 text-sm">{contenido[clave]}</p>
                      </div>
                    ))}
                    <button type="button" className="carta-cerrar" onClick={() => alFrente(carta.id)}>
                      {t.caja.cerrar}
                    </button>
                  </div>
                )}
              </article>
            )
          })}

          <div className={`caja-envase${abierta ? ' caja-abierta' : ''}`}>
            <Caja abierta={abierta} />
            {!abierta && (
              <button type="button" className="boton boton-solido caja-pulsar" onClick={() => setAbierta(true)}>
                {t.caja.pulsar}
              </button>
            )}
          </div>

          {abierta && (
            <p className="prado-pista">
              {t.caja.pista}{' '}
              <button type="button" className="prado-recoger" onClick={guardar}>
                {t.caja.recoger}
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}