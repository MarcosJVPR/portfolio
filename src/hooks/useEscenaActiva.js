import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useEscenaActiva() {
  const [activa, setActiva] = useState(false)
  const reducido = useReducedMotion()

  useEffect(() => {
    if (reducido) return
    if (window.matchMedia('(max-width: 720px)').matches) return
    if (navigator.deviceMemory && navigator.deviceMemory < 4) return
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return

    const inactivo = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 900))
    const id = inactivo(() => setActiva(true))
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [reducido])

  return activa
}
