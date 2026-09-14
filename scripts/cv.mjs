import { PDFDocument } from 'pdf-lib'
import { readFile, writeFile } from 'node:fs/promises'

const RUTA = 'public/cv/Marcos_Perez_CV.pdf'
const TITULO = 'Marcos Pérez — Fullstack Developer · CV'
const AUTOR = 'Marcos Pérez'
const ASUNTO = 'Curriculum vitae'
const PALABRAS = ['fullstack', 'react', 'typescript', 'node', 'python', 'madrid']

const original = await readFile(RUTA)
const documento = await PDFDocument.load(original, { updateMetadata: false })

documento.setTitle(TITULO)
documento.setAuthor(AUTOR)
documento.setSubject(ASUNTO)
documento.setKeywords(PALABRAS)
documento.setProducer('')
documento.setCreator(AUTOR)

const bytes = await documento.save()
await writeFile(RUTA, bytes)

console.log(`${RUTA}`)
console.log(`  titulo   ${TITULO}`)
console.log(`  antes    ${(original.length / 1024).toFixed(0)} kB`)
console.log(`  despues  ${(bytes.length / 1024).toFixed(0)} kB`)
