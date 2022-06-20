export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closeButton = this._popup.querySelector('.popup__close')
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') this.close()
  }

  _handleOverlayClose (evt) {
    if(evt.target === evt.currentTarget) this.close()
  }

  open () {
    this._popup.classList.add('popup_open')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close () {
      this._popup.classList.remove('popup_open')
      document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners () {
    this._popup.addEventListener('mousedown', (evt) => {this._handleOverlayClose(evt)})
    this._closeButton.addEventListener('mousedown', () => {this.close()})
  }
}