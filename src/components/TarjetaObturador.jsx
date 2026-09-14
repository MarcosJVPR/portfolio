import { useLang } from '../i18n/LanguageContext'
import ArteProyecto from './ArteProyecto'

export default function TarjetaObturador({ proyecto }) {
  const { t, idioma } = useLang()
  const contenido = proyecto[idioma]

  return (
    <article className="papel obturador flex h-full flex-col" style={{ borderRadius: 'var(--radius-hoja)' }}>
      <a
        href={proyecto.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${proyecto.nombre}: ${t.proyectos.verSitio}`}
        className="relative block aspect-[16/11] w-full overflow-hidden"
        style={{ borderBottom: '1.5px solid var(--borde-tinta)' }}
      >
        <span
          className="obturador-revelado block bg-cover bg-top"
          style={{ backgroundImage: `url(${proyecto.imagen})`, backgroundColor: 'var(--color-papel-hondo)' }}
        />
        <span className="obturador-panel block">
          <ArteProyecto id={proyecto.id} />
        </span>
      </a>

      <div className="relative z-[3] flex flex-1 flex-col gap-4 p-6" style={{ background: 'inherit' }}>
        <div>
          <h3>
            <a href={proyecto.url} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
              {proyecto.nombre}
            </a>
          </h3>
          <p className="mt-1 font-semibold" style={{ color: proyecto.acento }}>
            {contenido.tagline}
          </p>
        </div>

        <p className="text-[0.97rem]" style={{ color: 'var(--color-tinta-suave)' }}>
          {contenido.descripcion}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {proyecto.stack.map((herramienta) => (
            <span key={herramienta} className="etiqueta-stack">
              {herramienta}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <a href={proyecto.url} target="_blank" rel="noreferrer" className="boton boton-hueco !py-2 !text-sm">
            {t.proyectos.verSitio}
          </a>
          {proyecto.repo && (
            <a href={proyecto.repo} target="_blank" rel="noreferrer" className="text-sm font-semibold underline underline-offset-4">
              {t.proyectos.verCodigo}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
