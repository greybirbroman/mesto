import { Popup } from "./Popup"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleAddContentFormSubmit) {
    super(popupSelector)
    this._formSelector = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._formSelector.querySelectorAll('.popup__input'))
    this._handleAddContentFormSubmit = handleAddContentFormSubmit
  }

  _clearInputs() {
    this._inputList.forEach((input) => {
      input.value = ''
    })
  }

  _getInputValues () {
    const inputValues = {}
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  setEventListeners () {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleAddContentFormSubmit(this._getInputValues())
    })
  }

  open(values = {}) {
    this._inputList.forEach((input) => {
      input.value = values[input.name] || '';
    })
    super.open()
  }

  close () {
    super.close()
    this._clearInputs()
  }
}