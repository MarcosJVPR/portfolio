export default function SketchFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="trazoIrregular" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="7" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="lavadoAcuarela" x="-18%" y="-18%" width="136%" height="136%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="19" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="14" xChannelSelector="R" yChannelSelector="G" result="desplazado" />
          <feGaussianBlur in="desplazado" stdDeviation="1.1" result="suave" />
          <feComponentTransfer in="suave">
            <feFuncA type="gamma" amplitude="1" exponent="0.82" offset="0" />
          </feComponentTransfer>
        </filter>

        <filter id="tintaSuave" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
