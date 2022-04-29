const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  formsetSelector: '.popup__fieldset',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputError: 'popup__input-error_active',
  selectorError: 'popup__input_type_error',
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(config.formsetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, config);
    })
  })
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.selectorError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputError);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.selectorError);
  errorElement.classList.remove(config.inputError);
  errorElement.textContent = '';
};

enableValidation(config);


// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit',
//   formsetSelector: '.popup__fieldset',
//   inactiveButtonClass: 'popup__submit_type_disabled',
//   inputError: 'popup__input-error_active',
//   inputErrorSelector: 'popup__input-error',
//   selectorError: 'popup__input_type_error',
// }

// function toggleButtonState(inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);
//     })
//   })
// }

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     })
//     const fieldsetList = Array.from(formElement.querySelectorAll(config.formsetSelector));
//     fieldsetList.forEach((fieldSet) => {
//       setEventListeners(fieldSet, config);
//     })
//   })
// }

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// }

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(config.inputErrorSelector);
//   inputElement.classList.add(config.selectorError);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.inputError);
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(config.inputErrorSelector);
//   inputElement.classList.remove(config.selectorError);
//   errorElement.classList.remove(config.inputError);
//   errorElement.textContent = '';
// };

// enableValidation(config);


