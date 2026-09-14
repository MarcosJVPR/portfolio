import { useLang } from '../i18n/LanguageContext'

function Fila({ etiqueta, texto, acento }) {
  return (
    <div className="grid gap-1.5 border-t-[1.5px] py-5 sm:grid-cols-[10rem_1fr] sm:gap-6" style={{ borderColor: 'var(--borde-tinta)' }}>
      <span className="text-sm font-bold" style={{ color: acento }}>
        {etiqueta}
      </span>
      <p className="text-[0.99rem]">{texto}</p>
    </div>
  )
}

export default function FichaCaso({ caso, mostrarProyecto = true }) {
  const { t, idioma } = useLang()
  const contenido = caso[idioma]

  return (
    <article className="papel p-7 sm:p-10" style={{ borderRadius: 'var(--radius-hoja)' }}>
      {mostrarProyecto && (
        <p className="text-sm font-bold" style={{ color: caso.acento }}>
          {caso.proyecto}
        </p>
      )}
      <h3 className="mt-2 text-2xl">{contenido.titulo}</h3>

      <div className="mt-7">
        <Fila etiqueta={t.casos.etiquetas.problema} texto={contenido.problema} acento={caso.acento} />
        <Fila etiqueta={t.casos.etiquetas.restriccion} texto={contenido.restriccion} acento={caso.acento} />
        <Fila etiqueta={t.casos.etiquetas.decision} texto={contenido.decision} acento={caso.acento} />
        <Fila etiqueta={t.casos.etiquetas.resultado} texto={contenido.resultado} acento={caso.acento} />
      </div>
    </article>
  )
}
