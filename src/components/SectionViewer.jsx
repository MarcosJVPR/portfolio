import { useGameStore } from '../store/useGameStore'

const texts = {
  es: {
    diseños: 'Mis Diseños',
    experiencia: 'Mi Experiencia',
    educacion: 'Mi Educación',
    habilidades: 'Mis Habilidades'
  },
  en: {
    diseños: 'My Designs',
    experiencia: 'My Experience',
    educacion: 'My Education',
    habilidades: 'My Skills'
  }
}

export default function SectionViewer() {
  const { language, section } = useGameStore()

  if (!section) return null
  const label = texts[language][section]

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '1.2rem 2rem',
        borderRadius: '10px',
        boxShadow: '0 0 12px rgba(0,0,0,0.2)',
        fontFamily: 'sans-serif',
        fontSize: '1.2rem',
        zIndex: 10,
        maxWidth: '90vw',
        maxHeight: '80vh',
        overflow: 'auto'
      }}
    >
      <h2>{label}</h2>

      {section === 'diseños' && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['design1.jpg', 'design2.jpg', 'design3.jpg'].map((img, i) => (
            <img
              key={i}
              src={`/assets/images/${img}`}
              alt={`design-${i}`}
              style={{ maxHeight: '200px', cursor: 'pointer' }}
              onClick={() => window.open(`/assets/images/${img}`, '_blank')}
            />
          ))}
        </div>
      )}

      {section === 'experiencia' && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>{language === 'es' ? 'Aquí está mi currículum:' : 'Here is my resume:'}</p>
          <img
            src='/assets/images/CV.jpg'
            alt='curriculum'
            style={{ width: '100%', maxWidth: '400px', cursor: 'zoom-in' }}
            onClick={() => window.open('/assets/images/CV.jpg', '_blank')}
          />
        </div>
      )}
    </div>
  )
}
