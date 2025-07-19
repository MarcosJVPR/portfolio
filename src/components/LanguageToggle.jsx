import { useGameStore } from '../store/useGameStore'

export default function LanguageToggle() {
  const { language, setLanguage } = useGameStore()

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        padding: '0.5rem 1rem',
        background: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      {language === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
    </button>
  )
}
