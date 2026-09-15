import { useLang } from '../i18n/LanguageContext'

function Hoja() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="trazo">
      <path d="M4 20 C6 11, 12 5, 20 4 C19 12, 13 19, 4 20 Z" fill="currentColor" />
    </svg>
  )
}

export default function Trayectoria() {
  const { t } = useLang()

  return (
    <section id="trayectoria" className="seccion">
      <div className="envoltura">
        <h2 className="subrayado-sol inline">{t.trayectoria.titulo}</h2>
        <p className="mt-6 text-lg">{t.trayectoria.entrada}</p>

        <ol className="trayectoria">
          {t.trayectoria.puestos.map((puesto, indice) => (
            <li key={puesto.empresa} className="trayectoria-fila">
              <span className="trayectoria-nodo" aria-hidden="true">
                <Hoja />
              </span>

              <div className="trayectoria-cuerpo">
                <p className="trayectoria-periodo">
                  {puesto.periodo}
                  {indice === 0 && <span className="trayectoria-actual">{t.trayectoria.actual}</span>}
                </p>

                <h3 className="trayectoria-puesto">{puesto.puesto}</h3>

                <p className="trayectoria-empresa">
                  {puesto.empresa}
                  <span aria-hidden="true"> · </span>
                  <span className="trayectoria-lugar">{puesto.lugar}</span>
                </p>

                <p className="trayectoria-resumen">{puesto.resumen}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {puesto.stack.map((herramienta) => (
                    <span key={herramienta} className="etiqueta-stack">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="trayectoria-formacion-titulo">{t.trayectoria.formacionTitulo}</h3>

        <ul className="trayectoria-formacion">
          {t.trayectoria.formacion.map((estudio) => (
            <li key={estudio.centro} className="papel trayectoria-estudio">
              <p className="trayectoria-periodo">{estudio.periodo}</p>
              <p className="trayectoria-estudio-titulo">{estudio.titulo}</p>
              <p className="trayectoria-empresa">
                {estudio.centro}
                <span aria-hidden="true"> · </span>
                <span className="trayectoria-lugar">{estudio.lugar}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
