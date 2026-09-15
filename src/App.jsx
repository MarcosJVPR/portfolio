import { Route, Routes } from 'react-router-dom'
import { useLang } from './i18n/LanguageContext'
import BarraSuperior from './components/BarraSuperior'
import SketchFilters from './components/SketchFilters'
import Grano from './components/Grano'
import MarcoPapel from './components/MarcoPapel'
import Destellos from './components/Destellos'
import DesplazarArriba from './components/DesplazarArriba'
import PieDePagina from './components/PieDePagina'
import DatosEstructurados from './components/DatosEstructurados'
import Inicio from './paginas/Inicio'
import ProyectoDetalle from './paginas/ProyectoDetalle'
import NoEncontrado from './paginas/NoEncontrado'

export default function App() {
  const { t } = useLang()

  return (
    <>
      <a href="#contenido" className="saltar-contenido">
        {t.saltar}
      </a>
      <SketchFilters />
      <DatosEstructurados />
      <DesplazarArriba />
      <BarraSuperior />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <PieDePagina />
      <Destellos />
      <Grano />
      <MarcoPapel />
    </>
  )
}