import { mkdir, writeFile } from 'node:fs/promises'
import { proyectos } from '../src/data/projects.js'

const CARPETA = 'public'

function resolverSitio() {
  const directo = process.env.SITIO
  if (directo) return directo.replace(/\/$/, '')

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`

  return null
}

const sitio = resolverSitio()
const hoy = new Date().toISOString().slice(0, 10)

await mkdir(CARPETA, { recursive: true })

const robots = sitio
  ? `User-agent: *\nAllow: /\n\nSitemap: ${sitio}/sitemap.xml\n`
  : 'User-agent: *\nAllow: /\n'

await writeFile(`${CARPETA}/robots.txt`, robots)
console.log(`${CARPETA}/robots.txt`)

if (!sitio) {
  console.log('sin dominio conocido: define SITIO=https://tu-dominio para generar el sitemap')
  process.exit(0)
}

const rutas = ['/', ...proyectos.map((proyecto) => `/proyectos/${proyecto.slug}`)]

const cuerpo = rutas
  .map(
    (ruta) =>
      `  <url>\n    <loc>${sitio}${ruta}</loc>\n    <lastmod>${hoy}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${ruta === '/' ? '1.0' : '0.7'}</priority>\n  </url>`
  )
  .join('\n')

await writeFile(
  `${CARPETA}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${cuerpo}\n</urlset>\n`
)

console.log(`${CARPETA}/sitemap.xml  ${rutas.length} rutas  ${sitio}`)
