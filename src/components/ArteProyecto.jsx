const PALETA = {
  papel: '#fbf6e7',
  tinta: '#16342b',
  musgo: '#2f6b4f',
  hoja: '#7fb069',
  sol: '#f2c14e',
  cielo: '#6fc3c9',
  cobre: '#c2703d',
  hondo: '#1f4a38'
}

function Cielo({ arriba, abajo, id }) {
  return (
    <>
      <defs>
        <linearGradient id={`cielo-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={arriba} />
          <stop offset="100%" stopColor={abajo} />
        </linearGradient>
      </defs>
      <rect width="800" height="550" fill={`url(#cielo-${id})`} />
    </>
  )
}

function Nube({ x, y, escala = 1, opacidad = 0.75 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`} opacity={opacidad}>
      <path
        d="M0 20 C0 8, 14 2, 24 8 C30 -4, 50 -4, 56 8 C70 2, 84 10, 82 22 C82 30, 72 34, 62 33 L10 33 C2 32, 0 27, 0 20 Z"
        fill={PALETA.papel}
      />
    </g>
  )
}

function Follaje({ x, y, escala = 1, color }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <path d="M0 60 C4 34, 18 14, 42 4 C40 30, 26 52, 0 60 Z" fill={color} />
      <path d="M0 60 C-6 38, -18 22, -42 14 C-38 38, -24 56, 0 60 Z" fill={color} opacity="0.86" />
      <path d="M0 62 L0 96" stroke={PALETA.hondo} strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Lente() {
  return (
    <g className="trazo">
      <Cielo id="lente" arriba="#f6e3c0" abajo="#e8c9a0" />
      <circle cx="628" cy="118" r="58" fill={PALETA.sol} opacity="0.9" />
      <Nube x="80" y="70" escala="1.1" />
      <Nube x="470" y="48" escala="0.8" opacidad="0.6" />

      <path d="M110 400 L110 250 L400 150 L690 250 L690 400 Z" fill={PALETA.papel} opacity="0.95" />
      <path d="M400 150 L690 250 L110 250 Z" fill={PALETA.cobre} opacity="0.85" />
      {[170, 240, 310, 380, 450, 520, 590].map((x) => (
        <rect key={x} x={x} y="268" width="26" height="128" rx="12" fill={PALETA.cobre} opacity="0.55" />
      ))}
      <rect x="110" y="392" width="580" height="20" rx="8" fill={PALETA.hondo} />

      <circle cx="400" cy="268" r="112" fill={PALETA.cielo} opacity="0.28" />
      <circle cx="400" cy="268" r="112" fill="none" stroke={PALETA.tinta} strokeWidth="9" />
      <path d="M478 348 L568 444" stroke={PALETA.tinta} strokeWidth="22" strokeLinecap="round" />
      <path d="M340 212 C356 190, 386 182, 408 190" stroke={PALETA.papel} strokeWidth="10" strokeLinecap="round" fill="none" />

      <path d="M0 550 L0 430 C120 402, 260 424, 400 440 C540 456, 670 442, 800 420 L800 550 Z" fill={PALETA.musgo} />
      <path d="M0 550 L0 480 C140 460, 280 484, 420 492 C560 500, 680 486, 800 470 L800 550 Z" fill={PALETA.hondo} />
      <Follaje x={90} y={452} escala={1.25} color={PALETA.hoja} />
      <Follaje x={708} y={444} escala={1.1} color={PALETA.hoja} />
    </g>
  )
}

function Zolarium() {
  const puntos = []
  const total = 46
  for (let i = 0; i < total; i += 1) {
    const angulo = (i / total) * Math.PI * 2 * 3.4
    const radio = 40 + (i / total) * 122
    puntos.push({
      x: 400 + Math.cos(angulo) * radio,
      y: 250 + Math.sin(angulo) * radio * 0.86,
      r: 2.4 + (i % 5)
    })
  }

  return (
    <g className="trazo">
      <Cielo id="zolarium" arriba="#2f6b4f" abajo="#6fc3c9" />
      <circle cx="400" cy="250" r="176" fill={PALETA.papel} opacity="0.12" />
      <ellipse cx="400" cy="250" rx="176" ry="150" fill="none" stroke={PALETA.papel} strokeWidth="3" opacity="0.5" />
      <ellipse cx="400" cy="250" rx="150" ry="176" fill="none" stroke={PALETA.papel} strokeWidth="3" opacity="0.35" />
      <ellipse
        cx="400"
        cy="250"
        rx="186"
        ry="96"
        fill="none"
        stroke={PALETA.sol}
        strokeWidth="5"
        opacity="0.75"
        transform="rotate(-18 400 250)"
      />
      {puntos.map((punto, indice) => (
        <circle
          key={`${punto.x}-${indice}`}
          cx={punto.x}
          cy={punto.y}
          r={punto.r}
          fill={indice % 3 === 0 ? PALETA.sol : PALETA.papel}
          opacity={0.55 + (indice % 4) * 0.12}
        />
      ))}
      <circle cx="400" cy="250" r="30" fill={PALETA.sol} />
      <circle cx="400" cy="250" r="30" fill="none" stroke={PALETA.papel} strokeWidth="4" opacity="0.7" />

      <path d="M0 550 L0 446 C120 410, 250 450, 400 452 C550 454, 680 418, 800 446 L800 550 Z" fill={PALETA.hondo} />
      <path d="M0 550 L0 498 C150 476, 300 506, 440 510 C580 514, 690 494, 800 500 L800 550 Z" fill={PALETA.musgo} />
      <Follaje x={128} y={468} escala={1.05} color={PALETA.hoja} />
      <Follaje x={664} y={480} escala={0.95} color={PALETA.hoja} />
    </g>
  )
}

function Copilot() {
  return (
    <g className="trazo">
      <Cielo id="copilot" arriba="#e8f2df" abajo="#c6ddc4" />
      <circle cx="150" cy="112" r="50" fill={PALETA.sol} opacity="0.75" />
      <Nube x="520" y="64" escala="1.05" opacidad="0.7" />

      {[0, 1, 2, 3].map((indice) => (
        <g key={indice} transform={`translate(${248 + indice * 18} ${330 - indice * 44}) rotate(${-6 + indice * 3})`}>
          <rect width="250" height="150" rx="12" fill={PALETA.papel} stroke={PALETA.tinta} strokeWidth="4" />
          {[28, 56, 84, 112].map((y) => (
            <rect key={y} x="24" y={y} width={190 - (y % 60)} height="9" rx="4" fill={PALETA.musgo} opacity="0.32" />
          ))}
        </g>
      ))}

      <path d="M540 200 C560 156, 604 134, 652 140 C646 190, 606 218, 540 200 Z" fill={PALETA.hoja} />
      <path d="M540 200 C534 162, 508 132, 462 120 C464 168, 490 196, 540 200 Z" fill={PALETA.musgo} />
      <path d="M540 202 L540 300" stroke={PALETA.hondo} strokeWidth="8" strokeLinecap="round" />

      <circle cx="228" cy="236" r="62" fill={PALETA.cielo} opacity="0.3" />
      <circle cx="228" cy="236" r="62" fill="none" stroke={PALETA.tinta} strokeWidth="8" />
      <path d="M272 280 L322 332" stroke={PALETA.tinta} strokeWidth="16" strokeLinecap="round" />

      <path d="M0 550 L0 428 C130 400, 270 430, 410 440 C550 450, 680 428, 800 408 L800 550 Z" fill={PALETA.musgo} />
      <path d="M0 550 L0 486 C140 466, 300 492, 440 498 C570 504, 690 488, 800 476 L800 550 Z" fill={PALETA.hondo} />
    </g>
  )
}

function Travel() {
  return (
    <g className="trazo">
      <Cielo id="travel" arriba="#bfe6ea" abajo="#f6e9c4" />
      <circle cx="400" cy="176" r="86" fill={PALETA.sol} />
      {Array.from({ length: 12 }).map((_, indice) => {
        const angulo = (indice / 12) * Math.PI * 2
        return (
          <path
            key={indice}
            d={`M${400 + Math.cos(angulo) * 102} ${176 + Math.sin(angulo) * 102} L${400 + Math.cos(angulo) * 130} ${
              176 + Math.sin(angulo) * 130
            }`}
            stroke={PALETA.sol}
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.65"
          />
        )
      })}
      <Nube x="100" y="96" escala="1.2" />
      <Nube x="600" y="116" escala="0.95" opacidad="0.65" />

      <path d="M0 550 L0 392 C110 336, 236 348, 340 386 C430 418, 520 412, 620 378 C690 354, 746 358, 800 380 L800 550 Z" fill={PALETA.hoja} />
      <path d="M0 550 L0 452 C120 416, 250 438, 372 462 C494 486, 620 470, 800 436 L800 550 Z" fill={PALETA.musgo} />
      <path d="M0 550 L0 512 C160 490, 320 520, 470 522 C620 524, 720 508, 800 500 L800 550 Z" fill={PALETA.hondo} />

      <path
        d="M368 550 C374 500, 356 468, 388 436 C420 404, 396 382, 414 356"
        stroke={PALETA.papel}
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M368 550 C374 500, 356 468, 388 436 C420 404, 396 382, 414 356"
        stroke={PALETA.cobre}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="14 18"
        fill="none"
      />

      <Follaje x={132} y={444} escala={1.2} color={PALETA.musgo} />
      <Follaje x={666} y={430} escala={1.05} color={PALETA.musgo} />
      <path d="M560 214 C572 202, 588 202, 600 212" stroke={PALETA.tinta} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M606 236 C618 224, 634 224, 646 234" stroke={PALETA.tinta} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  )
}

const escenas = {
  lente: Lente,
  zolarium: Zolarium,
  copilot: Copilot,
  travel: Travel
}

export default function ArteProyecto({ id, className = '' }) {
  const Escena = escenas[id] || Lente

  return (
    <svg
      viewBox="0 0 800 550"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <Escena />
    </svg>
  )
}
