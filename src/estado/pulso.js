export const pulso = {
  objetivo: 0,
  tinte: 0
}

export function encenderPulso(indice) {
  pulso.objetivo = 1
  pulso.tinte = indice
}

export function apagarPulso() {
  pulso.objetivo = 0
}
