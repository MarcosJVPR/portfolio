import { Suspense, lazy, useCallback, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useEscenaActiva } from '../hooks/useEscenaActiva'
import { useConsulta } from '../hooks/useConsulta'
import { encenderPulso, apagarPulso } from '../estado/pulso'
import Monedas from './Monedas'

const cargarEscena = () => import('./Scene')
const Scene = lazy(cargarEscena)

function Burbujas({ marcadores }) {
  const [desplazos, setDesplazos] = useState({})
  const arrastre = useRef(null)

  const pintar = useCallback(() => {
    const activo = arrastre.current
    if (!activo) return
    activo.cuadro = 0
    activo.nodo.style.translate = `${activo.x}px ${activo.y}px`
  }, [])

  const alBajar = useCallback((evento, indice) => {
    const nodo = evento.currentTarget
    nodo.setPointerCapture(evento.pointerId)
    nodo.classList.add('arrastrando')
    const previo = arrastre.previos?.[indice] || { x: 0, y: 0 }
    arrastre.current = {
      indice,
      nodo,
      inicioX: evento.clientX,
      inicioY: evento.clientY,
      baseX: previo.x,
      baseY: previo.y,
      x: previo.x,
      y: previo.y,
      cuadro: 0
    }
    nodo.style.translate = `${previo.x}px ${previo.y}px`
  }, [])

  const alMover = useCallback(
    (evento) => {
      const activo = arrastre.current
      if (!activo) return
      activo.x = activo.baseX + (evento.clientX - activo.inicioX)
      activo.y = activo.baseY + (evento.clientY - activo.inicioY)
      if (!activo.cuadro) activo.cuadro = window.requestAnimationFrame(pintar)
    },
    [pintar]
  )

  const alSoltar = useCallback((evento) => {
    const activo = arrastre.current
    if (evento.currentTarget.hasPointerCapture(evento.pointerId)) {
      evento.currentTarget.releasePointerCapture(evento.pointerId)
    }
    if (!activo) return
    if (activo.cuadro) window.cancelAnimationFrame(activo.cuadro)
    const { indice, x, y } = activo
    arrastre.previos = { ...(arrastre.previos || {}), [indice]: { x, y } }
    arrastre.current = null
    setDesplazos((previas) => ({ ...previas, [indice]: { x, y } }))
  }, [])

  return (
    <ul className="hero-burbujas">
      {marcadores.map((marcador, indice) => {
        const movida = desplazos[indice]
        return (
          <li
            key={marcador.texto}
            className={`hero-marcador hero-burbuja${movida ? ' arrastrando' : ''}`}
            style={movida ? { translate: `${movida.x}px ${movida.y}px` } : undefined}
            onPointerEnter={() => encenderPulso(indice)}
            onPointerLeave={apagarPulso}
            onPointerDown={(evento) => alBajar(evento, indice)}
            onPointerMove={alMover}
            onPointerUp={alSoltar}
            onPointerCancel={alSoltar}
          >
            <span className="hero-marcador-cifra">{marcador.cifra}</span>
            <span className="hero-marcador-texto">{marcador.texto}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default function Hero() {
  const { t } = useLang()
  const escenaActiva = useEscenaActiva(cargarEscena)
  const haySitio = useConsulta('(min-width: 1024px)')

  return (
    <section id="inicio" className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      <img
        src="/arte/hero-ciudad-1920.webp"
        srcSet="/arte/hero-ciudad-1280.webp 1280w, /arte/hero-ciudad-1920.webp 1920w, /arte/hero-ciudad-2560.webp 2560w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {escenaActiva && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      <div className="luz-hero" aria-hidden="true" />
      <div className="motas" aria-hidden="true" />

      <Monedas />

      {haySitio && <Burbujas marcadores={t.hero.marcadores} />}

      <div className="envoltura hero-envoltura relative z-40 pb-14">
        <div className="cristal entrada hero-tarjeta inline-flex flex-col gap-3 rounded-[2rem] px-7 py-6">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <span aria-hidden="true" style={{ color: 'var(--color-hoja)' }}>
              &#9679;
            </span>
            {t.hero.disponibilidad}
          </p>

          <h1 className="hero-nombre">
            {t.hero.nombre}
            <span className="hero-rol">{t.hero.rol}</span>
          </h1>

          <p className="hero-lema">{t.hero.titulo}</p>

          <p className="hero-entrada">{t.hero.entrada}</p>

          {!haySitio && (
            <ul className="hero-marcadores">
              {t.hero.marcadores.map((marcador) => (
                <li key={marcador.texto} className="hero-marcador">
                  <span className="hero-marcador-cifra">{marcador.cifra}</span>
                  <span className="hero-marcador-texto">{marcador.texto}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#proyectos" className="boton boton-solido !py-2.5 !text-sm">
              {t.hero.ctaProyectos}
            </a>
            <a href="/cv/Marcos_Perez_CV.pdf" download className="boton boton-hueco !py-2.5 !text-sm">
              {t.hero.ctaCv}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}