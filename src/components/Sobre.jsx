import { useLang } from '../i18n/LanguageContext'

export default function Sobre() {
  const { t } = useLang()

  return (
    <section id="sobre" className="seccion">
      <div className="envoltura grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="subrayado-sol inline">{t.sobre.titulo}</h2>
          <div className="mt-7 grid gap-5">
            {t.sobre.parrafos.map((parrafo) => (
              <p key={parrafo.slice(0, 24)}>{parrafo}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="papel p-7" style={{ borderRadius: 'var(--radius-hoja)' }}>
            <h3 className="text-xl">{t.sobre.habilidadesTitulo}</h3>
            <dl className="mt-5 grid gap-4">
              {t.sobre.habilidades.map((bloque) => (
                <div key={bloque.grupo}>
                  <dt className="text-sm font-bold" style={{ color: 'var(--color-musgo)' }}>
                    {bloque.grupo}
                  </dt>
                  <dd className="mt-0.5 text-[0.95rem]" style={{ color: 'var(--color-tinta-suave)' }}>
                    {bloque.items}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}