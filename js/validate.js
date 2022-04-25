
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => handleFormSubmit(evt, form, config));
    form.addEventListener('input', (evt) => handleFormInput(evt, form, config));
    toggleSubmitButton(form, config);
  })
}

function toggleSubmitButton(form, config) {
  const buttons = Array.from(form.querySelectorAll(config.buttonSelector));
  buttons.forEach((button) => {
    if (!form.checkValidity()) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__submit_type_disabled');
    } else {
      button.classList.remove('popup__submit_type_disabled');
      button.removeAttribute('disabled');
    }
  })
}

function handleFormSubmit(evt, form, config) {
  evt.preventDefault();
  toggleSubmitButton(form, config);
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    errorNode.textContent = '';
    errorNode.classList.remove('popup__input-error_active');
    input.classList.remove('popup__input_type_error');

  } else {
    errorNode.textContent = input.validationMessage;
    errorNode.classList.add('popup__input-error_active');
    input.classList.add('popup__input_type_error');
  }
  toggleSubmitButton(form, config);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: 'popup__input',
  buttonSelector: '.popup__submit',
  inactiveButtonClass: '.popup__submit_type_disabled',
  inputError: '.popup__input-error',
});
