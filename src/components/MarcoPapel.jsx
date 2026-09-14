export default function MarcoPapel() {
  return (
    <div className="marco-papel" aria-hidden="true">
      <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="h-full w-full">
        <rect
          x="1.2"
          y="1.2"
          width="97.6"
          height="97.6"
          rx="0.6"
          fill="none"
          stroke="var(--color-tinta)"
          strokeWidth="0.18"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
          filter="url(#trazoIrregular)"
        />
      </svg>
    </div>
  )
}
