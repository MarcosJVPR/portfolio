import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useParallax(velocidad = 0.2) {
  const referencia = useRef(null)
  const reducido = useReducedMotion()

  useEffect(() => {
    if (reducido) return
    const nodo = referencia.current
    if (!nodo) return

    let pedido = null
    const actualizar = () => {
      pedido = null
      const caja = nodo.getBoundingClientRect()
      const centro = caja.top + caja.height / 2 - window.innerHeight / 2
      nodo.style.transform = `translate3d(0, ${(-centro * velocidad).toFixed(2)}px, 0)`
    }
    const alDesplazar = () => {
      if (pedido === null) pedido = window.requestAnimationFrame(actualizar)
    }

    actualizar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    window.addEventListener('resize', alDesplazar)
    return () => {
      window.removeEventListener('scroll', alDesplazar)
      window.removeEventListener('resize', alDesplazar)
      if (pedido !== null) window.cancelAnimationFrame(pedido)
    }
  }, [velocidad, reducido])

  return referencia
}
