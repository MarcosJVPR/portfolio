import { useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

const ID = 'datos-estructurados'

export default function DatosEstructurados() {
  const { t, idioma } = useLang()

  useEffect(() => {
    const origen = window.location.origin

    const persona = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: t.hero.nombre,
      jobTitle: t.hero.rol,
      email: `mailto:${t.contacto.email}`,
      telephone: t.contacto.telefono,
      url: origen,
      image: `${origen}/retrato/marcos-600.webp`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madrid',
        addressCountry: 'ES'
      },
      sameAs: t.contacto.enlaces.map((enlace) => enlace.url),
      knowsLanguage: ['es', 'en'],
      knowsAbout: t.sobre.habilidades.flatMap((bloque) => bloque.items.split(', ')),
      worksFor: {
        '@type': 'Organization',
        name: t.trayectoria.puestos[0].empresa
      }
    }

    let etiqueta = document.getElementById(ID)
    if (!etiqueta) {
      etiqueta = document.createElement('script')
      etiqueta.id = ID
      etiqueta.type = 'application/ld+json'
      document.head.appendChild(etiqueta)
    }
    etiqueta.textContent = JSON.stringify(persona)
  }, [t, idioma])

  return null
}