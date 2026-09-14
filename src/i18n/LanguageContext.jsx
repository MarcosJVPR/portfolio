import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import es from './es'
import en from './en'

const diccionarios = { es, en }
const CLAVE = 'marcos-portfolio-idioma'
const POR_DEFECTO = 'en'

function detectarIdioma() {
  if (typeof window === 'undefined') return POR_DEFECTO

  const guardado = window.localStorage.getItem(CLAVE)
  if (guardado === 'es' || guardado === 'en') return guardado

  const preferidos =
    Array.isArray(window.navigator.languages) && window.navigator.languages.length > 0
      ? window.navigator.languages
      : [window.navigator.language]

  for (const etiqueta of preferidos) {
    const base = String(etiqueta || '')
      .toLowerCase()
      .split('-')[0]
    if (base === 'es') return 'es'
    if (base === 'en') return 'en'
  }

  return POR_DEFECTO
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [idioma, setIdioma] = useState(detectarIdioma)

  useEffect(() => {
    window.localStorage.setItem(CLAVE, idioma)
    document.documentElement.lang = idioma
    document.title = diccionarios[idioma].meta.titulo
    const descripcion = document.querySelector('meta[name="description"]')
    if (descripcion) descripcion.setAttribute('content', diccionarios[idioma].meta.descripcion)
  }, [idioma])

  const valor = useMemo(
    () => ({
      idioma,
      t: diccionarios[idioma],
      alternar: () => setIdioma((actual) => (actual === 'es' ? 'en' : 'es'))
    }),
    [idioma]
  )

  return <LanguageContext.Provider value={valor}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const contexto = useContext(LanguageContext)
  if (!contexto) throw new Error('useLang debe usarse dentro de LanguageProvider')
  return contexto
}
