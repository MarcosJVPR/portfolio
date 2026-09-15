const COLORES = {
  b: '#8c5210',
  o: '#e8a417',
  c: '#f7cf4e',
  t: '#16342b'
}

const MONEDA = [
  '..bbb..',
  '.bcccb.',
  'bcobocb',
  'bcobocb',
  'bcobocb',
  'bcobocb',
  'bcobocb',
  '.bcccb.',
  '..bbb..'
]

const EQUIS = ['...', 't.t', '.t.', 't.t', '...']

const DIGITOS = {
  0: ['ttt', 't.t', 't.t', 't.t', 'ttt'],
  1: ['.t.', 'tt.', '.t.', '.t.', 'ttt'],
  2: ['ttt', '..t', 'ttt', 't..', 'ttt'],
  3: ['ttt', '..t', 'ttt', '..t', 'ttt'],
  4: ['t.t', 't.t', 'ttt', '..t', '..t'],
  5: ['ttt', 't..', 'ttt', '..t', 'ttt'],
  6: ['ttt', 't..', 'ttt', 't.t', 'ttt'],
  7: ['ttt', '..t', '..t', '..t', '..t'],
  8: ['ttt', 't.t', 'ttt', 't.t', 'ttt'],
  9: ['ttt', 't.t', 'ttt', '..t', 'ttt']
}

function Sprite({ filas, pixel }) {
  const ancho = filas[0].length
  const alto = filas.length
  const celdas = []

  filas.forEach((fila, y) => {
    fila.split('').forEach((clave, x) => {
      const color = COLORES[clave]
      if (!color) return
      celdas.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />)
    })
  })

  return (
    <svg
      viewBox={`0 0 ${ancho} ${alto}`}
      width={ancho * pixel}
      height={alto * pixel}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {celdas}
    </svg>
  )
}

export default function ContadorMonedas({ total, pixel = 3 }) {
  const digitos = String(Math.min(total, 99)).padStart(2, '0').split('')

  return (
    <div className="contador-monedas" aria-hidden="true">
      <Sprite filas={MONEDA} pixel={pixel} />
      <span key={total} className="contador-cifra">
        <Sprite filas={EQUIS} pixel={pixel} />
        {digitos.map((digito, indice) => (
          <Sprite key={`${indice}-${digito}`} filas={DIGITOS[digito]} pixel={pixel} />
        ))}
      </span>
    </div>
  )
}