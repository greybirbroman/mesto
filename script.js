let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');

function openPopup(event) {
  popup.classList.add('popup_open');
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_open');
})

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

function formSubmitHandler (evt) {
  evt.preventDefault();

  document.querySelector(nameInput.value);
  document.querySelector(jobInput.value);

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__activity').textContent = jobInput.value;

  console.log(nameInput.value);
  console.log(jobInput.value);

  popup.classList.remove('popup_open');
}
formElement.addEventListener('submit', formSubmitHandler);

