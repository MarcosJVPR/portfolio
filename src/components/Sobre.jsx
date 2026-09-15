import { useLang } from '../i18n/LanguageContext'

function Garabatos() {
  return (
    <svg viewBox="0 0 260 300" className="retrato-garabatos trazo" aria-hidden="true">
      <g fill="none" stroke="var(--color-tinta)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M206 54 C206 42, 215 34, 226 36 C236 38, 240 48, 235 57 C231 64, 226 66, 226 74" />
        <path d="M222 84 L230 84" />
        <path d="M34 232 L34 252 M24 242 L44 242" />
        <path d="M28 66 L28 82 M20 74 L36 74" />
        <path d="M188 246 C196 236, 210 236, 216 246 C222 256, 214 268, 202 266" />
        <path d="M200 276 L202 276" />
      </g>
      <g fill="var(--color-sol)" stroke="var(--color-tinta)" strokeWidth="1.8">
        <path d="M232 110 L236 120 L246 124 L236 128 L232 138 L228 128 L218 124 L228 120 Z" />
        <path d="M22 158 L25 165 L32 168 L25 171 L22 178 L19 171 L12 168 L19 165 Z" />
      </g>
    </svg>
  )
}

export default function Sobre() {
  const { t } = useLang()

  return (
    <section id="sobre" className="seccion">
      <div className="envoltura grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="subrayado-sol inline">{t.sobre.titulo}</h2>

          <div className="retrato-bloque">
            <figure className="retrato">
              <img
                src="/retrato/marcos-600.webp"
                srcSet="/retrato/marcos-320.webp 320w, /retrato/marcos-600.webp 600w"
                sizes="(max-width: 720px) 60vw, 19rem"
                alt={t.sobre.retratoAlt}
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <Garabatos />
            </figure>
          </div>

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