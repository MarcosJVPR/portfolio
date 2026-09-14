import { Suspense, lazy } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useEscenaActiva } from '../hooks/useEscenaActiva'
import Monedas from './Monedas'

const Scene = lazy(() => import('./Scene'))

export default function Hero() {
  const { t } = useLang()
  const escenaActiva = useEscenaActiva()

  return (
    <section id="inicio" className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      <img
        src="/arte/hero-ciudad.webp"
        srcSet="/arte/hero-ciudad-1280.webp 1280w, /arte/hero-ciudad.webp 2560w"
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

      <div className="envoltura relative z-40 pb-16">
        <div className="cristal entrada inline-flex max-w-2xl flex-col gap-4 rounded-[2rem] px-8 py-7">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <span aria-hidden="true" style={{ color: 'var(--color-hoja)' }}>
              &#9679;
            </span>
            {t.hero.disponibilidad}
          </p>

          <p className="text-[1.35rem] leading-snug" style={{ fontFamily: 'var(--font-display)', maxWidth: '30ch' }}>
            {t.hero.titulo}
          </p>

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