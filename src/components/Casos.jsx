import { casos } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import FichaCaso from './FichaCaso'

export default function Casos() {
  const { t } = useLang()

  return (
    <section id="casos" className="seccion">
      <div className="envoltura">
        <h2 className="subrayado-sol inline">{t.casos.titulo}</h2>
        <p className="mt-6 text-lg">{t.casos.entrada}</p>

        <div className="mt-12 grid gap-8">
          {casos.map((caso) => (
            <FichaCaso key={caso.id} caso={caso} />
          ))}
        </div>
      </div>
    </section>
  )
}