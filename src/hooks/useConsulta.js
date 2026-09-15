import { useEffect, useState } from 'react'

export function useConsulta(consulta) {
  const [coincide, setCoincide] = useState(false)

  useEffect(() => {
    const medio = window.matchMedia(consulta)
    setCoincide(medio.matches)
    const alCambiar = (evento) => setCoincide(evento.matches)
    medio.addEventListener('change', alCambiar)
    return () => medio.removeEventListener('change', alCambiar)
  }, [consulta])

  return coincide
}
