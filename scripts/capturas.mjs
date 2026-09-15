import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const SALIDA = 'medios/projects'
const ANCHO = 1600
const ALTO = 1100
const ESPERA = 1600

const selectoresCookies = [
  'button:has-text("Aceptar")',
  'button:has-text("Accept")',
  'button:has-text("Entendido")',
  '[id*="cookie"] button',
  '[class*="cookie"] button'
]

const objetivos = [
  {
    id: 'lente',
    base: 'https://lente-democratica.vercel.app',
    tomas: [
      { nombre: 'lente', ruta: '/', desplazamiento: 0 },
      { nombre: 'lente-1', ruta: '/', desplazamiento: 900 },
      { nombre: 'lente-2', ruta: '/', desplazamiento: 1900 },
      { nombre: 'lente-3', ruta: '/', desplazamiento: 3000 }
    ]
  },
  {
    id: 'zolarium',
    base: 'https://zolariumapp.com',
    tomas: [
      { nombre: 'zolarium', ruta: '/', desplazamiento: 0, espera: 2600 },
      { nombre: 'zolarium-1', ruta: '/', desplazamiento: 800 },
      { nombre: 'zolarium-2', ruta: '/', desplazamiento: 1700 },
      { nombre: 'zolarium-3', ruta: '/', desplazamiento: 2600 }
    ]
  },
  {
    id: 'copilot',
    base: 'https://ai-for-small-businesses.vercel.app',
    tomas: [
      { nombre: 'copilot', ruta: '/', desplazamiento: 0, espera: 2200 },
      { nombre: 'copilot-1', ruta: '/', desplazamiento: 800 },
      { nombre: 'copilot-2', ruta: '/', desplazamiento: 1600 },
      { nombre: 'copilot-3', ruta: '/', desplazamiento: 2400 }
    ]
  },
  {
    id: 'travel',
    base: 'https://travel-to-spain.vercel.app',
    tomas: [
      { nombre: 'travel', ruta: '/', desplazamiento: 0, espera: 5200 },
      { nombre: 'travel-1', ruta: '/', desplazamiento: 800, espera: 3200 },
      { nombre: 'travel-2', ruta: '/', desplazamiento: 1600, espera: 3200 },
      { nombre: 'travel-3', ruta: '/', desplazamiento: 2400, espera: 3200 }
    ]
  }
]

const soloEstos = process.argv.slice(2)

async function cerrarAvisos(pagina) {
  for (const selector of selectoresCookies) {
    const boton = pagina.locator(selector).first()
    if ((await boton.count()) > 0 && (await boton.isVisible().catch(() => false))) {
      await boton.click({ timeout: 2000 }).catch(() => {})
      await pagina.waitForTimeout(400)
      return
    }
  }
}

async function ejecutar(pagina, acciones) {
  for (const accion of acciones) {
    const elemento = pagina.locator(accion.selector).first()
    if ((await elemento.count()) === 0) {
      console.log(`    sin elemento para ${accion.selector}`)
      continue
    }
    if (accion.tipo === 'escribir') await elemento.fill(accion.texto, { timeout: 5000 }).catch(() => {})
    if (accion.tipo === 'pulsar') await elemento.click({ timeout: 5000 }).catch(() => {})
    await pagina.waitForTimeout(accion.espera || 900)
  }
}

async function capturar(navegador, objetivo) {
  const contexto = await navegador.newContext({
    viewport: { width: ANCHO, height: ALTO },
    deviceScaleFactor: 1,
    locale: 'es-ES',
    reducedMotion: 'no-preference'
  })
  const pagina = await contexto.newPage()
  let ultimaRuta = null

  for (const toma of objetivo.tomas) {
    const destino = `${objetivo.base}${toma.ruta}`

    if (destino !== ultimaRuta) {
      await pagina.goto(destino, { waitUntil: 'networkidle', timeout: 45000 })
      await pagina.evaluate(() => document.fonts && document.fonts.ready)
      await cerrarAvisos(pagina)
      ultimaRuta = destino
    }

    if (toma.acciones) await ejecutar(pagina, toma.acciones)

    await pagina.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), toma.desplazamiento)
    await pagina.waitForTimeout(toma.espera || ESPERA)

    const archivo = path.join(SALIDA, `${toma.nombre}.jpg`)
    await pagina.screenshot({
      path: archivo,
      type: 'jpeg',
      quality: 84,
      clip: toma.recorte ? { x: 0, y: 0, width: ANCHO, height: ALTO, ...toma.recorte } : undefined
    })
    console.log(`  ${archivo}`)
  }

  await contexto.close()
}

async function principal() {
  await mkdir(SALIDA, { recursive: true })
  const navegador = await chromium.launch()
  const pendientes = soloEstos.length > 0 ? objetivos.filter((o) => soloEstos.includes(o.id)) : objetivos

  for (const objetivo of pendientes) {
    console.log(`\n${objetivo.id} → ${objetivo.base}`)
    try {
      await capturar(navegador, objetivo)
    } catch (error) {
      console.error(`  fallo en ${objetivo.id}: ${error.message}`)
    }
  }

  await navegador.close()
  console.log(`\nlisto. Revisa ${SALIDA} y borra las que no sirvan antes de commitear.`)
}

principal()
