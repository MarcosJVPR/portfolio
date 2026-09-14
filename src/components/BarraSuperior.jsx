import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

function Hoja({ activo }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      className="trazo"
      style={{
        transform: activo ? 'rotate(20deg) scale(1.06)' : 'none',
        transition: 'transform 340ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <path d="M4 20 C6 11, 12 5, 20 4 C19 12, 13 19, 4 20 Z" fill="currentColor" />
    </svg>
  )
}

export default function BarraSuperior() {
  const { t, idioma, alternar } = useLang()
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef(null)

  useEffect(() => {
    if (!abierto) return
    const alPulsarFuera = (evento) => {
      if (contenedor.current && !contenedor.current.contains(evento.target)) setAbierto(false)
    }
    const alEscapar = (evento) => {
      if (evento.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('mousedown', alPulsarFuera)
    document.addEventListener('keydown', alEscapar)
    return () => {
      document.removeEventListener('mousedown', alPulsarFuera)
      document.removeEventListener('keydown', alEscapar)
    }
  }, [abierto])

  const secciones = [
    { id: 'proyectos', texto: t.nav.proyectos },
    { id: 'casos', texto: t.nav.casos },
    { id: 'sobre', texto: t.nav.sobre },
    { id: 'contacto', texto: t.nav.contacto }
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="cristal mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 sm:px-6">
        <Link to="/" className="font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Marcos Pérez
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label={t.nav.secciones}>
          {secciones.map((seccion) => (
            <Link key={seccion.id} to={`/#${seccion.id}`} className="text-sm font-semibold transition-opacity hover:opacity-60">
              {seccion.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={alternar}
            aria-label={t.idioma.etiqueta}
            className="cristal flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold"
          >
            <span aria-hidden="true" style={{ opacity: idioma === 'es' ? 1 : 0.38, transition: 'opacity 220ms' }}>
              ES
            </span>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>
              /
            </span>
            <span aria-hidden="true" style={{ opacity: idioma === 'en' ? 1 : 0.38, transition: 'opacity 220ms' }}>
              EN
            </span>
          </button>

          <div ref={contenedor} className="relative md:hidden">
            <button
              type="button"
              onClick={() => setAbierto((estado) => !estado)}
              aria-expanded={abierto}
              aria-haspopup="menu"
              aria-label={abierto ? t.nav.cerrar : t.nav.abrir}
              className="cristal flex h-9 w-9 items-center justify-center rounded-full"
              style={{ color: 'var(--color-musgo)' }}
            >
              <Hoja activo={abierto} />
            </button>

            {abierto && (
              <div role="menu" className="cristal desplegable absolute right-0 top-12 w-52 overflow-hidden rounded-3xl p-2">
                {secciones.map((seccion, indice) => (
                  <Link
                    key={seccion.id}
                    role="menuitem"
                    to={`/#${seccion.id}`}
                    onClick={() => setAbierto(false)}
                    className="desplegable-fila block rounded-2xl px-4 py-2.5 text-sm font-semibold hover:bg-white/45"
                    style={{ animationDelay: `${40 * indice}ms` }}
                  >
                    {seccion.texto}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}