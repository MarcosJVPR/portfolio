import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

export default function NoEncontrado() {
  const { t } = useLang()

  return (
    <section className="seccion flex min-h-screen items-center pt-28">
      <div className="envoltura">
        <p className="cifra">404</p>
        <h1 className="mt-4 max-w-[16ch]">{t.noEncontrado.titulo}</h1>
        <p className="mt-6 text-lg">{t.noEncontrado.entrada}</p>
        <Link to="/" className="boton boton-solido mt-9">
          {t.noEncontrado.volver}
        </Link>
      </div>
    </section>
  )
}
