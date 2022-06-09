import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector) // #popupViewCard
    this._image = this._popup.querySelector('.popup__image')
    this._name = this._popup.querySelector('.popup__alt')
  }

  open ({name, link}) {
    super.open()
    this._image.src = link
    this._image.alt = name
    this._name.textContent = name
  }
}