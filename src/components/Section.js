export default class Section {
  
  constructor({items, renderer}, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }


  addItemTop(element) {
    this._container.prepend(element) // В начало списка
  }

  addItem(element) {
    this._container.append(element) // В конец списка
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item)
    })
  }
}