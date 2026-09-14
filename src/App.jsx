import { Route, Routes } from 'react-router-dom'
import BarraSuperior from './components/BarraSuperior'
import SketchFilters from './components/SketchFilters'
import Grano from './components/Grano'
import MarcoPapel from './components/MarcoPapel'
import Destellos from './components/Destellos'
import DesplazarArriba from './components/DesplazarArriba'
import Inicio from './paginas/Inicio'
import ProyectoDetalle from './paginas/ProyectoDetalle'
import NoEncontrado from './paginas/NoEncontrado'

export default function App() {
  return (
    <>
      <SketchFilters />
      <DesplazarArriba />
      <BarraSuperior />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Destellos />
      <Grano />
      <MarcoPapel />
    </>
  )
}