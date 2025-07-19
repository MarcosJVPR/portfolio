export default class Overlay {
  constructor() {
    this.container = document.getElementById('overlay')
    this.container.innerHTML = '<h1>Penguin Portfolio</h1>'
  }

  showMessage(msg) {
    this.container.innerHTML = `<p>${msg}</p>`
  }
}
