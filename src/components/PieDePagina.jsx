import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

function Flecha() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="trazo pie-flecha">
      <path d="M4 12 H18 M12 6 L19 12 L12 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PieDePagina() {
  const { t } = useLang()

  const secciones = [
    { id: 'proyectos', texto: t.nav.proyectos },
    { id: 'casos', texto: t.nav.casos },
    { id: 'trayectoria', texto: t.nav.trayectoria },
    { id: 'sobre', texto: t.nav.sobre },
    { id: 'contacto', texto: t.nav.contacto }
  ]

  return (
    <footer className="pie">
      <div className="envoltura pie-rejilla">
        <div>
          <p className="pie-nombre">{t.hero.nombre}</p>
          <p className="pie-lema">{t.pie.lema}</p>
        </div>

        <nav aria-label={t.pie.navegacion}>
          <p className="pie-titulo">{t.pie.navegacion}</p>
          <ul className="pie-lista">
            {secciones.map((seccion) => (
              <li key={seccion.id}>
                <Link to={`/#${seccion.id}`} className="pie-enlace">
                  {seccion.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="pie-titulo">{t.pie.contactoTitulo}</p>
          <ul className="pie-lista">
            <li>
              <a href={`mailto:${t.contacto.email}`} className="pie-enlace">
                {t.contacto.email}
              </a>
            </li>
            {t.contacto.enlaces.map((enlace) => (
              <li key={enlace.etiqueta}>
                <a href={enlace.url} target="_blank" rel="noreferrer" className="pie-enlace">
                  {enlace.etiqueta}
                  <Flecha />
                </a>
              </li>
            ))}
            <li>
              <a href="/cv/Marcos_Perez_CV.pdf" download className="pie-enlace">
                {t.contacto.cv}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="envoltura pie-inferior">
        <p>{t.pie.hecho}</p>
        <p>{t.pie.privacidad}</p>
        <p className="pie-derechos">
          <span aria-hidden="true">© </span>
          {new Date().getFullYear()} {t.pie.derechos}
        </p>
      </div>
    </footer>
  )
}
