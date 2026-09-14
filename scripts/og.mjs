import { chromium } from 'playwright'

const ORIGEN = process.argv[2] || 'http://localhost:5173'
const ARCHIVO = 'public/og.png'

const navegador = await chromium.launch()
const contexto = await navegador.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
  locale: 'en-US'
})
const pagina = await contexto.newPage()

await pagina.goto(ORIGEN, { waitUntil: 'networkidle', timeout: 45000 })
await pagina.evaluate(() => document.fonts && document.fonts.ready)
await pagina.waitForTimeout(3500)
await pagina.screenshot({ path: ARCHIVO, type: 'png' })

await navegador.close()
console.log(`${ARCHIVO} generado desde ${ORIGEN}`)
