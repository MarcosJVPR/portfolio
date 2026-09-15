import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, stat, copyFile } from 'node:fs/promises'
import path from 'node:path'

const RAIZ = 'dist'
const ARCHIVO = 'public/og.png'
const COPIA = 'dist/og.png'

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
}

async function existe(ruta) {
  try {
    const info = await stat(ruta)
    return info.isFile()
  } catch {
    return false
  }
}

function servirEstaticos(raiz) {
  return createServer(async (peticion, respuesta) => {
    const url = new URL(peticion.url, 'http://localhost')
    const pedido = decodeURIComponent(url.pathname)
    const candidato = path.join(raiz, pedido)
    const seguro = path.resolve(candidato).startsWith(path.resolve(raiz))
    const destino = seguro && (await existe(candidato)) ? candidato : path.join(raiz, 'index.html')

    try {
      const cuerpo = await readFile(destino)
      respuesta.writeHead(200, { 'Content-Type': TIPOS[path.extname(destino)] || 'application/octet-stream' })
      respuesta.end(cuerpo)
    } catch {
      respuesta.writeHead(404)
      respuesta.end()
    }
  })
}

function escuchar(servidor) {
  return new Promise((resolver) => {
    servidor.listen(0, '127.0.0.1', () => resolver(servidor.address().port))
  })
}

const externo = process.argv[2]

if (!externo && !(await existe(path.join(RAIZ, 'index.html')))) {
  console.error(`No existe ${RAIZ}/index.html. Ejecuta npm run build antes de npm run og.`)
  process.exit(1)
}

const servidor = externo ? null : servirEstaticos(RAIZ)
const puerto = servidor ? await escuchar(servidor) : null
const origen = externo || `http://127.0.0.1:${puerto}`

const navegador = await chromium.launch()
const contexto = await navegador.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
  locale: 'en-US'
})
const pagina = await contexto.newPage()

await pagina.goto(origen, { waitUntil: 'networkidle', timeout: 45000 })
await pagina.evaluate(() => document.fonts && document.fonts.ready)
await pagina.waitForTimeout(3500)
await pagina.screenshot({ path: ARCHIVO, type: 'png' })

await navegador.close()
if (servidor) servidor.close()

if (await existe(path.join(RAIZ, 'index.html'))) await copyFile(ARCHIVO, COPIA)

console.log(`${ARCHIVO} generado desde ${origen}`)
