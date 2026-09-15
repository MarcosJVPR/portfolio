import { Link } from 'react-router-dom'
import { proyectos } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import TarjetaObturador from './TarjetaObturador'
import ArteProyecto from './ArteProyecto'

function Destacado({ proyecto }) {
  const { t, idioma } = useLang()
  const contenido = proyecto[idioma]

  return (
    <article className="papel obturador grid gap-0 overflow-hidden lg:grid-cols-[1.05fr_1fr]" style={{ borderRadius: 'var(--radius-hoja)' }}>
      <a
        href={proyecto.url}
        target="_blank"
        rel="noreferrer"
        className="relative block min-h-[20rem]"
        aria-label={`${proyecto.nombre}: ${t.proyectos.verSitio}`}
      >
        <div
          className="obturador-revelado bg-cover bg-top"
          style={{ backgroundImage: `url(${proyecto.imagen})`, backgroundColor: 'var(--color-papel-hondo)' }}
        />
        <div className="obturador-panel">
          <ArteProyecto id={proyecto.id} />
        </div>
        <span
          className="absolute left-5 top-5 z-[3] rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: 'var(--color-papel)', border: '1.5px solid var(--borde-tinta)' }}
        >
          {t.proyectos.destacado}
        </span>
      </a>

      <div className="relative z-[3] flex flex-col gap-5 p-7 sm:p-10">
        <div>
          <h3 className="text-3xl">
            <a href={proyecto.url} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
              {proyecto.nombre}
            </a>
          </h3>
          <p className="mt-2 text-lg font-semibold" style={{ color: proyecto.acento }}>
            {contenido.tagline}
          </p>
        </div>

        <p>{contenido.descripcion}</p>

        <div className="flex items-baseline gap-4 border-y-[1.5px] py-4" style={{ borderColor: 'var(--borde-tinta)' }}>
          <span className="cifra" style={{ color: proyecto.acento }}>
            {contenido.metricaCifra}
          </span>
          <span className="text-sm leading-snug" style={{ color: 'var(--color-tinta-suave)', maxWidth: '34ch' }}>
            {contenido.metricaTexto}
          </span>
        </div>

        <p className="text-sm" style={{ color: 'var(--color-tinta-suave)' }}>
          <strong style={{ color: 'var(--color-tinta)' }}>{t.proyectos.rol}:</strong> {contenido.rol}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {proyecto.stack.map((herramienta) => (
            <span key={herramienta} className="etiqueta-stack">
              {herramienta}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a href={proyecto.url} target="_blank" rel="noreferrer" className="boton boton-solido">
            {t.proyectos.verSitio}
          </a>
          <Link to={`/proyectos/${proyecto.slug}`} className="enlace-caso">
            {t.proyectos.verDetalle}
          </Link>
          {proyecto.repo && (
            <a href={proyecto.repo} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
              {t.proyectos.verCodigo}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Proyectos() {
  const { t } = useLang()
  const destacado = proyectos.find((proyecto) => proyecto.destacado)
  const resto = proyectos.filter((proyecto) => !proyecto.destacado)

  return (
    <section id="proyectos" className="seccion seccion-nube">
      <div className="envoltura">
        <h2 className="subrayado-sol inline">{t.proyectos.titulo}</h2>
        <p className="mt-6 text-lg">{t.proyectos.entrada}</p>

        <div className="mt-12">{destacado && <Destacado proyecto={destacado} />}</div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {resto.map((proyecto) => (
            <TarjetaObturador key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>
    </section>
  )
}