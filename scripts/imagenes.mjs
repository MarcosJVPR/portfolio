import sharp from 'sharp'
import { mkdir, readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const EXTENSIONES = ['.webp', '.jpg', '.jpeg', '.jfif', '.png', '.avif']
const CALIDAD = 80
const ESFUERZO = 6

const TAREAS = [
  { fuente: 'medios/arte', destino: 'public/arte', modo: 'responsivo', anchos: [1280, 1920, 2560] },
  { fuente: 'medios/projects', destino: 'public/projects', modo: 'unico', ancho: 1280 },
  { fuente: 'medios/retrato', destino: 'public/retrato', modo: 'responsivo', anchos: [320, 600] },
  { fuente: 'medios/textura', destino: 'public/textura', modo: 'sinPerdida' }
]

async function listar(carpeta) {
  try {
    const archivos = await readdir(carpeta)
    return archivos.filter((nombre) => EXTENSIONES.includes(path.extname(nombre).toLowerCase())).sort()
  } catch {
    return null
  }
}

function informar(destino, salida) {
  console.log(`  ${(salida.size / 1024).toFixed(0).padStart(6)} kB  ${salida.width}x${salida.height}  ${destino}`)
}

async function convertir(origen, destino, ancho, sinPerdida) {
  const opciones = sinPerdida ? { lossless: true, effort: ESFUERZO } : { quality: CALIDAD, effort: ESFUERZO }
  const tuberia = sharp(origen)
  if (ancho) tuberia.resize({ width: ancho, withoutEnlargement: true })
  const salida = await tuberia.webp(opciones).toFile(destino)
  informar(destino, salida)
  return salida.size
}

async function procesar(tarea, archivo) {
  const origen = path.join(tarea.fuente, archivo)
  const base = path.basename(archivo, path.extname(archivo))

  if (tarea.modo === 'sinPerdida') {
    return convertir(origen, path.join(tarea.destino, `${base}.webp`), null, true)
  }

  if (tarea.modo === 'unico') {
    return convertir(origen, path.join(tarea.destino, `${base}.webp`), tarea.ancho, false)
  }

  const meta = await sharp(origen).metadata()
  const anchos = tarea.anchos.filter((ancho) => ancho <= meta.width)
  if (anchos.length === 0) anchos.push(meta.width)

  let total = 0
  for (const ancho of anchos) {
    total += await convertir(origen, path.join(tarea.destino, `${base}-${ancho}.webp`), ancho, false)
  }
  return total
}

async function principal() {
  let generado = 0
  let original = 0

  const vaciados = new Set()

  for (const tarea of TAREAS) {
    const archivos = await listar(tarea.fuente)

    if (archivos === null) {
      console.log(`${tarea.fuente} no existe, se omite`)
      continue
    }

    if (archivos.length === 0) {
      console.log(`${tarea.fuente} no tiene imágenes`)
      continue
    }

    console.log(`\n${tarea.fuente} -> ${tarea.destino}`)

    if (!vaciados.has(tarea.destino)) {
      await rm(tarea.destino, { recursive: true, force: true })
      vaciados.add(tarea.destino)
    }
    await mkdir(tarea.destino, { recursive: true })

    for (const archivo of archivos) {
      const info = await stat(path.join(tarea.fuente, archivo))
      original += info.size
      generado += await procesar(tarea, archivo)
    }
  }

  if (generado === 0) {
    console.log('\nNo se generó nada')
    return
  }

  console.log(`\noriginales ${(original / 1024).toFixed(0)} kB`)
  console.log(`generado   ${(generado / 1024).toFixed(0)} kB`)
  console.log(`diferencia ${(100 * (1 - generado / original)).toFixed(0)} %`)
}

principal()
