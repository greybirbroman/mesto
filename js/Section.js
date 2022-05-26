export class Section {
  
  constructor({items, renderer}, containerSelector) {
    this._items = items
    this.renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem (element) {
    this._container.prepend(element)
  }

  renderItems () {
    this._items.forEach((item) => {
      this._renderer(item)
    })
  }
}