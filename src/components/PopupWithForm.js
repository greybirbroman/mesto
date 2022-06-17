import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this._formSelector = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._formSelector.querySelectorAll('.popup__input'))
    this._submitBtn = this._formSelector.querySelector('.popup__submit')
    this._handleFormSubmit = handleFormSubmit
  }

  _clearInputs() {
    this._inputList.forEach((input) => {
      input.value = ''
    })
  }

  _getInputValues = () => {
    const inputValues = {}
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  open (values = {}) {
    super.open()
    this._inputList.forEach((input) => {
      input.value = values[input.name] || '';
    })
  }

  // open() {
  //   super.open()
  // }

  close() {
    super.close()
    this._clearInputs()
  }

  loading(status) {
    if(status) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = 'Сохранить'
    }
  }
}