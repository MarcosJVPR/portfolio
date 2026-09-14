import { useLang } from '../i18n/LanguageContext'

export default function Contacto() {
  const { t } = useLang()

  return (
    <section id="contacto" className="seccion relative overflow-hidden pb-48">
      <div className="envoltura relative z-20">
        <h2 className="subrayado-sol inline">{t.contacto.titulo}</h2>
        <p className="mt-6 text-lg">{t.contacto.entrada}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={`mailto:${t.contacto.email}`}
            className="text-xl font-semibold underline underline-offset-[6px] sm:text-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.contacto.email}
          </a>
          <span className="font-semibold" style={{ color: 'var(--color-tinta-suave)' }}>
            {t.contacto.telefono}
          </span>
          <span style={{ color: 'var(--color-tinta-suave)' }}>{t.contacto.ciudad}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {t.contacto.enlaces.map((enlace) => (
            <a key={enlace.etiqueta} href={enlace.url} target="_blank" rel="noreferrer" className="boton boton-hueco">
              {enlace.etiqueta}
            </a>
          ))}
          <a href="/cv/Marcos_Perez_CV.pdf" download className="boton boton-solido">
            {t.contacto.cv}
          </a>
        </div>

        <p className="mt-16 text-sm" style={{ color: 'var(--color-tinta-suave)' }}>
          {t.contacto.pie}
        </p>
      </div>
      <div className="banda-prado" aria-hidden="true" />
    </section>
  )
}