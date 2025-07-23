import { useGameStore } from '../store/useGameStore'
import { useEffect, useState } from 'react'

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
  const [openImg, setOpenImg] = useState(null)

  useEffect(() => {
    if (!section && openImg) setOpenImg(null)
  }, [section, openImg])

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
          {['Diseño1.jpg', 'Diseño2.png', 'Diseño3.png', 'Diseño4.jpg'].map((img, i) => (
            <img
              key={i}
              src={`/assets/gallery/${img}`}
              alt={`design-${i}`}
              style={{ maxHeight: '200px', cursor: 'pointer' }}
              onClick={() => setOpenImg(`/assets/gallery/${img}`)}
            />
          ))}
          {openImg && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.7)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setOpenImg(null)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: '2rem', color: '#fff', cursor: 'pointer', zIndex: 1001 }}>&times;</button>
                <img src={openImg} alt="zoom" style={{ maxHeight: '80vh', maxWidth: '90vw', borderRadius: '10px' }} />
              </div>
            </div>
          )}
        </div>
      )}

      {section === 'experiencia' && (
        <div style={{ marginTop: '1rem', textAlign: 'center', position: 'relative' }}>
          <button onClick={() => setOpenImg(null)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: '2rem', color: '#333', cursor: 'pointer', zIndex: 1001 }}>&times;</button>
          <p>{language === 'es' ? 'Aquí está mi currículum:' : 'Here is my resume:'}</p>
          <img
            src='/assets/images/CV.jpg'
            alt='curriculum'
            style={{ width: '100%', maxWidth: '400px', cursor: 'zoom-in' }}
            onClick={() => setOpenImg('/assets/images/CV.jpg')}
          />
          {openImg && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.7)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setOpenImg(null)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: '2rem', color: '#fff', cursor: 'pointer', zIndex: 1001 }}>&times;</button>
                <img src={openImg} alt="zoom" style={{ maxHeight: '80vh', maxWidth: '90vw', borderRadius: '10px' }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
