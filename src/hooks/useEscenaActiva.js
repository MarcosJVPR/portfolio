import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const ESPERA_MAXIMA = 700

export function useEscenaActiva(precargar) {
  const [activa, setActiva] = useState(false)
  const reducido = useReducedMotion()

  useEffect(() => {
    if (reducido) return
    if (window.matchMedia('(max-width: 720px)').matches) return
    if (navigator.deviceMemory && navigator.deviceMemory < 4) return
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return

    let cancelado = false

    const arrancar = () => {
      if (cancelado) return
      if (precargar) precargar()
      setActiva(true)
    }

    const soportaInactivo = typeof window.requestIdleCallback === 'function'
    const id = soportaInactivo
      ? window.requestIdleCallback(arrancar, { timeout: ESPERA_MAXIMA })
      : window.setTimeout(arrancar, 200)

    return () => {
      cancelado = true
      if (soportaInactivo && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [reducido, precargar])

  return activa
}