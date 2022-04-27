
// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
  
//   formList.forEach((form) => {
//     form.addEventListener('submit', (evt) => handleFormSubmit(evt, form, config));
//     form.addEventListener('input', (evt) => handleFormInput(evt, form, config));
//     toggleSubmitButton(form, config);
//   })
// }



// function toggleSubmitButton(form, config) {
//   const buttons = Array.from(form.querySelectorAll(config.buttonSelector));
//   buttons.forEach((button) => {
//     if (!form.checkValidity()) {
//       button.setAttribute('disabled', true);
//       button.classList.add('popup__submit_type_disabled');
//     } else {
//       button.classList.remove('popup__submit_type_disabled');
//       button.removeAttribute('disabled');
//     }
//   })
// }

// function handleFormSubmit(evt, form, config) {
//   evt.preventDefault();
//   toggleSubmitButton(form, config);
// }

// function handleFormInput(evt, form, config) {
//   const input = evt.target;
//   const errorNode = document.querySelector(`#${input.id}-error`);

//   if (input.validity.valid) {
//     errorNode.textContent = '';
//     errorNode.classList.remove('popup__input-error_active');
//     input.classList.remove('popup__input_type_error');

//   } else {
//     errorNode.textContent = input.validationMessage;
//     errorNode.classList.add('popup__input-error_active');
//     input.classList.add('popup__input_type_error');
//   }
//   toggleSubmitButton(form, config);
// }
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: 'popup__input',
//   buttonSelector: '.popup__submit',
//   inactiveButtonClass: '.popup__submit_type_disabled',
//   inputError: '.popup__input-error',
// });

// 222222222

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  
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

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add('popup__input-error_active');
};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  formsetSelector: '.form__set',
  inactiveButtonClass: '.popup__submit_type_disabled',
  inputError: '.popup__input-error',
});


