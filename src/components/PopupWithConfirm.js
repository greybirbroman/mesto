import Popup from "./Popup.js"

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._submitBtn = this._popup.querySelector('.popup__submit')
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit()
    })
  }

  setSubmitEvent(action) {
    this._handleFormSubmit = action
  }

  loading(status) {
    if(status) {
      this._submitBtn.textContent = 'Удаление...'
    } else {
      this._submitBtn.textContent = 'Да'
    }
  }
}