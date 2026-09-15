import { Suspense, lazy } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useEscenaActiva } from '../hooks/useEscenaActiva'
import { useConsulta } from '../hooks/useConsulta'
import { encenderPulso, apagarPulso } from '../estado/pulso'
import Monedas from './Monedas'

const cargarEscena = () => import('./Scene')
const Scene = lazy(cargarEscena)

function Marcador({ marcador, indice, flotante }) {
  const manejadores = flotante
    ? {
        onPointerEnter: () => encenderPulso(indice),
        onPointerLeave: apagarPulso
      }
    : {}

  return (
    <li className={flotante ? 'hero-marcador hero-burbuja' : 'hero-marcador'} {...manejadores}>
      <span className="hero-marcador-cifra">{marcador.cifra}</span>
      <span className="hero-marcador-texto">{marcador.texto}</span>
    </li>
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

      {haySitio && (
        <ul className="hero-burbujas">
          {t.hero.marcadores.map((marcador, indice) => (
            <Marcador key={marcador.texto} marcador={marcador} indice={indice} flotante />
          ))}
        </ul>
      )}

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
              {t.hero.marcadores.map((marcador, indice) => (
                <Marcador key={marcador.texto} marcador={marcador} indice={indice} />
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