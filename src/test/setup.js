import '@testing-library/jest-dom/vitest'

const consultaFalsa = (consulta) => ({
  matches: false,
  media: consulta,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: consultaFalsa
})
