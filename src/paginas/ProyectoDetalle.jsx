import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { casosDeProyecto, proyectoPorSlug, proyectoSiguiente } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import FichaCaso from '../components/FichaCaso'

export default function ProyectoDetalle() {
  const { slug } = useParams()
  const { t, idioma } = useLang()
  const proyecto = proyectoPorSlug(slug)

  useEffect(() => {
    if (!proyecto) return
    document.title = `${proyecto.nombre} · Marcos Pérez`
    return () => {
      document.title = t.meta.titulo
    }
  }, [proyecto, t.meta.titulo])

  if (!proyecto) return <Navigate to="/404" replace />

  const contenido = proyecto[idioma]
  const casos = casosDeProyecto(proyecto.id)
  const siguiente = proyectoSiguiente(proyecto.slug)

  return (
    <article>
      <header className="relative overflow-hidden pt-32 pb-16">
        <div
          className="acuarela absolute inset-0"
          style={{ background: `linear-gradient(168deg, ${proyecto.acento}, transparent 58%)`, opacity: 0.42 }}
          aria-hidden="true"
        />
        <div className="envoltura relative z-10">
          <Link to="/#proyectos" className="text-sm font-semibold underline underline-offset-4">
            {t.detalle.volver}
          </Link>

          <h1 className="mt-6 max-w-[14ch] text-[clamp(2.4rem,1.4rem+4vw,4.4rem)]">{proyecto.nombre}</h1>
          <p className="mt-4 text-xl font-semibold" style={{ color: proyecto.acento, maxWidth: '30ch' }}>
            {contenido.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {proyecto.stack.map((herramienta) => (
              <span key={herramienta} className="etiqueta-stack">
                {herramienta}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={proyecto.url} target="_blank" rel="noreferrer" className="boton boton-solido">
              {t.proyectos.verSitio}
            </a>
            {proyecto.repo && (
              <a href={proyecto.repo} target="_blank" rel="noreferrer" className="boton boton-hueco">
                {t.proyectos.verCodigo}
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="seccion pt-4">
        <div className="envoltura grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="grid gap-5">
            <h2 className="subrayado-sol inline text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)]">{t.detalle.porQue}</h2>
            <p>{contenido.porQue}</p>
            <p className="text-sm" style={{ color: 'var(--color-tinta-suave)' }}>
              <strong style={{ color: 'var(--color-tinta)' }}>{t.proyectos.rol}:</strong> {contenido.rol}
            </p>
          </div>

          <div className="papel flex flex-col justify-center gap-3 p-8" style={{ borderRadius: 'var(--radius-hoja)' }}>
            <span className="cifra" style={{ color: proyecto.acento }}>
              {contenido.metricaCifra}
            </span>
            <p className="text-[0.97rem]" style={{ color: 'var(--color-tinta-suave)' }}>
              {contenido.metricaTexto}
            </p>
          </div>
        </div>
      </section>

      <section className="seccion pt-0">
        <div className="envoltura">
          <h2 className="subrayado-sol inline text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)]">{t.detalle.arquitectura}</h2>
          <ul className="mt-8 grid gap-4">
            {contenido.arquitectura.map((punto) => (
              <li
                key={punto.slice(0, 28)}
                className="papel grid gap-3 p-6 sm:grid-cols-[auto_1fr] sm:items-start"
                style={{ borderRadius: 'var(--radius-hoja)' }}
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-block h-3 w-3 rounded-full"
                  style={{ background: proyecto.acento }}
                />
                <p className="text-[0.99rem]">{punto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {casos.length > 0 && (
        <section className="seccion pt-0">
          <div className="envoltura">
            <h2 className="subrayado-sol inline text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)]">{t.detalle.decisiones}</h2>
            <div className="mt-8 grid gap-8">
              {casos.map((caso) => (
                <FichaCaso key={caso.id} caso={caso} mostrarProyecto={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="seccion pt-0">
        <div className="envoltura">
          <h2 className="subrayado-sol inline text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)]">{t.detalle.galeria}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proyecto.capturas.map((captura, indice) => (
              <img
                key={captura}
                src={captura}
                alt={`${proyecto.nombre} ${indice + 1}`}
                loading="lazy"
                width="1600"
                height="1100"
                className="papel h-auto w-full"
                style={{ borderRadius: 'var(--radius-hoja)' }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion pt-0">
        <div className="envoltura">
          <div
            className="papel p-8 sm:p-10"
            style={{ borderRadius: 'var(--radius-hoja)', background: `color-mix(in oklab, ${proyecto.acento} 12%, var(--color-papel))` }}
          >
            <h2 className="text-[clamp(1.4rem,1.1rem+1.2vw,1.9rem)]">{t.detalle.aprendido}</h2>
            <p className="mt-4 text-lg">{contenido.aprendido}</p>
          </div>

          <Link
            to={`/proyectos/${siguiente.slug}`}
            className="papel mt-8 flex flex-wrap items-center justify-between gap-4 p-7 transition-transform hover:-translate-y-1"
            style={{ borderRadius: 'var(--radius-hoja)' }}
          >
            <span className="text-sm font-bold" style={{ color: 'var(--color-tinta-suave)' }}>
              {t.detalle.siguiente}
            </span>
            <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {siguiente.nombre}
            </span>
          </Link>
        </div>
      </section>
    </article>
  )
}
