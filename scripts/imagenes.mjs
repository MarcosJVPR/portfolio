import sharp from 'sharp'
import { readdir, unlink } from 'node:fs/promises'
import path from 'node:path'

const CARPETA = 'public/arte'
const ENTRADAS = ['.jfif', '.jpg', '.jpeg', '.png']
const ANCHO_MAXIMO = 2560
const ANCHO_MOVIL = 1280
const CALIDAD = 85

const borrarOriginal = process.argv.includes('--limpiar')

async function convertir(origen, destino, ancho) {
  const salida = await sharp(origen)
    .resize({ width: ancho, withoutEnlargement: true })
    .webp({ quality: CALIDAD, effort: 6 })
    .toFile(destino)
  console.log(`  ${destino}  ${(salida.size / 1024).toFixed(0)} kB  ${salida.width}x${salida.height}`)
}

async function principal() {
  const archivos = await readdir(CARPETA)
  const fuentes = archivos.filter((nombre) => ENTRADAS.includes(path.extname(nombre).toLowerCase()))

  if (fuentes.length === 0) {
    console.log(`No hay imágenes que convertir en ${CARPETA}`)
    return
  }

  for (const archivo of fuentes) {
    const origen = path.join(CARPETA, archivo)
    const base = path.basename(archivo, path.extname(archivo))
    const meta = await sharp(origen).metadata()

    await convertir(origen, path.join(CARPETA, `${base}.webp`), Math.min(ANCHO_MAXIMO, meta.width))

    if (meta.width > ANCHO_MOVIL) {
      await convertir(origen, path.join(CARPETA, `${base}-${ANCHO_MOVIL}.webp`), ANCHO_MOVIL)
    }

    if (borrarOriginal) {
      await unlink(origen)
      console.log(`  borrado ${origen}`)
    }
  }

  console.log('\nlisto')
}

principal()
