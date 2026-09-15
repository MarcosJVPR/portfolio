import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import Proyectos from '../components/Proyectos'
import Hero from '../components/Hero'
import Trayectoria from '../components/Trayectoria'
import PieDePagina from '../components/PieDePagina'
import BarraSuperior from '../components/BarraSuperior'
import ProyectoDetalle from '../paginas/ProyectoDetalle'
import CajaSituaciones from '../components/CajaSituaciones'
import { casos, proyectos, proyectoSiguiente } from '../data/projects'

function montar(componente, ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <LanguageProvider>{componente}</LanguageProvider>
    </MemoryRouter>
  )
}

describe('datos del portafolio', () => {
  it('todos los proyectos apuntan a un dominio real y tienen slug único', () => {
    const slugs = proyectos.map((proyecto) => proyecto.slug)
    expect(new Set(slugs).size).toBe(proyectos.length)
    proyectos.forEach((proyecto) => {
      expect(proyecto.url).toMatch(/^https:\/\//)
      expect(proyecto.slug).toMatch(/^[a-z0-9-]+$/)
    })
  })

  it('cada caso pertenece a un proyecto existente', () => {
    const ids = proyectos.map((proyecto) => proyecto.id)
    casos.forEach((caso) => {
      expect(ids).toContain(caso.proyectoId)
    })
  })

  it('el proyecto siguiente nunca es el actual', () => {
    proyectos.forEach((proyecto) => {
      expect(proyectoSiguiente(proyecto.slug).slug).not.toBe(proyecto.slug)
    })
  })

  it('cada proyecto tiene contenido completo en los dos idiomas', () => {
    proyectos.forEach((proyecto) => {
      ;['es', 'en'].forEach((idioma) => {
        expect(proyecto[idioma].tagline.length).toBeGreaterThan(0)
        expect(proyecto[idioma].porQue.length).toBeGreaterThan(0)
        expect(proyecto[idioma].arquitectura.length).toBeGreaterThanOrEqual(3)
      })
    })
  })
})

describe('navegación e idioma', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('marcos-portfolio-idioma', 'es')
  })

  it('cada tarjeta de proyecto enlaza directamente a la web en vivo', () => {
    montar(<Proyectos />)
    proyectos.forEach((proyecto) => {
      const enlaces = screen.getAllByRole('link', { name: new RegExp(proyecto.nombre, 'i') })
      expect(enlaces.length).toBeGreaterThan(0)
      enlaces.forEach((enlace) => {
        expect(enlace).toHaveAttribute('href', proyecto.url)
        expect(enlace).toHaveAttribute('target', '_blank')
      })
    })
  })

  it('cada tarjeta ofrece además el caso completo sin robarle el sitio al enlace en vivo', () => {
    montar(<Proyectos />)
    const casos = screen
      .getAllByRole('link')
      .map((enlace) => enlace.getAttribute('href'))
      .filter((destino) => destino && destino.startsWith('/proyectos/'))
    proyectos.forEach((proyecto) => {
      expect(casos).toContain(`/proyectos/${proyecto.slug}`)
    })
  })

  it('la caja guarda las cartas hasta que se pulsa y luego las suelta', async () => {
    const usuario = userEvent.setup()
    montar(<CajaSituaciones />)
    expect(screen.queryByText(/arrastra las cartas/i)).not.toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: /púlsame/i }))

    expect(screen.getByText(/arrastra las cartas/i)).toBeInTheDocument()
    casos.forEach((caso) => {
      expect(screen.getByText(caso.es.titulo)).toBeInTheDocument()
    })
  })

  it('cambia todo el contenido al pulsar el conmutador de idioma', async () => {
    const usuario = userEvent.setup()
    montar(
      <>
        <BarraSuperior />
        <Proyectos />
      </>
    )
    expect(screen.getByText(/algunos proyectos a los que he dado vida/i)).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: /cambiar idioma/i }))

    expect(screen.getByText(/some projects i brought to life/i)).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })

  it('la navegación de escritorio enlaza a las cinco secciones de la portada', () => {
    montar(<BarraSuperior />)
    const navegacion = screen.getByRole('navigation')
    const destinos = within(navegacion)
      .getAllByRole('link')
      .map((enlace) => enlace.getAttribute('href'))
    expect(destinos).toEqual(['/#proyectos', '/#casos', '/#trayectoria', '/#sobre', '/#contacto'])
  })

  it('la página de detalle muestra arquitectura, casos y proyecto siguiente', () => {
    montar(
      <Routes>
        <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
      </Routes>,
      '/proyectos/lente-democratica'
    )
    expect(screen.getByRole('heading', { level: 1, name: /lente democrática/i })).toBeInTheDocument()
    expect(screen.getByText(/cómo está construido/i)).toBeInTheDocument()
    expect(screen.getByText(/el hallazgo que decidí no publicar/i)).toBeInTheDocument()
    expect(screen.getByText(/siguiente proyecto/i)).toBeInTheDocument()
  })
})

describe('portada para quien contrata', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('marcos-portfolio-idioma', 'es')
  })

  it('el hero tiene un h1 con el nombre y el rol', () => {
    montar(<Hero />)
    const titular = screen.getByRole('heading', { level: 1 })
    expect(titular).toHaveTextContent(/marcos pérez/i)
    expect(titular).toHaveTextContent(/fullstack/i)
  })

  it('el hero muestra la presentación y los tres marcadores', () => {
    montar(<Hero />)
    expect(screen.getByText(/react, typescript y node/i)).toBeInTheDocument()
    const marcadores = screen.getAllByRole('listitem').filter((elemento) => elemento.className.includes('hero-marcador'))
    expect(marcadores).toHaveLength(3)
  })

  it('la trayectoria lista las cuatro empresas en orden', () => {
    montar(<Trayectoria />)
    const empresas = ['City Voice', 'Zero Latency Madrid', 'UClinic Center', 'Construcciones Acacias']
    empresas.forEach((empresa) => {
      expect(screen.getByText(new RegExp(empresa, 'i'))).toBeInTheDocument()
    })
  })

  it('el pie enlaza a LinkedIn, GitHub y al correo', () => {
    montar(<PieDePagina />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://linkedin.com/in/marcosjvpr')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/MarcosJVPR')
    expect(screen.getByRole('link', { name: /perezmarcosjulio/i })).toHaveAttribute(
      'href',
      'mailto:perezmarcosjulio@gmail.com'
    )
  })
})