function enableValidation(formSelector) {
const form = document.querySelector(formSelector);

form.addEventListener('submit', (evt) => handleFormSubmit(evt, form));
form.addEventListener('input', (evt) => handleFormInput(evt, form));
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function handleFormInput(evt) {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
  }
}

enableValidation('.popup__form_type_submit');
