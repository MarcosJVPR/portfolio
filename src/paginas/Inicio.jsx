import Hero from '../components/Hero'
import Proyectos from '../components/Proyectos'
import CajaSituaciones from '../components/CajaSituaciones'
import Trayectoria from '../components/Trayectoria'
import Sobre from '../components/Sobre'
import Contacto from '../components/Contacto'

export default function Inicio() {
  return (
    <>
      <Hero />
      <Proyectos />
      <CajaSituaciones />
      <Trayectoria />
      <Sobre />
      <Contacto />
    </>
  )
}