import Popup from './Popup'
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector) // #popupViewCard
    this._image = this._popup.querySelector('.popup__image')
    this._title = this._popup.querySelector('.popup__alt')
  }

  open ({title, link}) {
    this._image.src = link
    this._image.alt = title
    this._title.textContent = title
    super.open()
  }
}