import { create } from 'zustand'

export const useGameStore = create((set) => ({
  language: 'es',
  toggleLanguage: () =>
    set((state) => ({ language: state.language === 'es' ? 'en' : 'es' })),

  section: null,
  setSection: (section) => set({ section }),

  joystickVelocity: { x: 0, z: 0 },
  setJoystickVelocity: (velocity) => set({ joystickVelocity: velocity }),

  penguin: null,
  setPenguin: (penguinRef) => set({ penguin: penguinRef })
}))
