export class FormValidator {
  constructor(config, formElement) {

    this._config = config;
    this._formElement = formElement;
    this._fieldsetSelector = config.fieldsetSelector;
    this._submitSelector = config.submitButtonSelector;
    this._submitButton = this._formElement.querySelector(this._submitSelector);
    this._submitDisabled = config.inactiveButtonClass;
    this._inputError = config.inputError;
    this._selectorError = config.selectorError;
    //this._spanError = config.spanSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); // Массив чтобы пройти методом Some
  }



  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _showInputError = (input, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._selectorError);
    errorElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
  }

  _hideInputError = (input) => {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._selectorError);
    errorElement.classList.remove(this._inputError);
    errorElement.textContent = '';
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._submitDisabled);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._submitDisabled);
    }
  }


  _setEventListeners = (input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._toggleButtonState();
    });
  }

  // При вызове формы очищаю форму, ошибки и блокирую submit

  setInitialSatate = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
    this._formElement.reset();
  };


  enableValidation() {
    for (this._fieldsetSelector of this._inputList) {
      if (this._fieldsetSelector.tagName === "INPUT") {
        this._setEventListeners(this._fieldsetSelector);
      }
    }
  }
}
