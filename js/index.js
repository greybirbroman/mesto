// Переменные
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

// POPUP OPEN FUNCTION

function openPopup(evt) {
  popup.classList.add('popup_open');
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
}

// POPUP CLOSE FUNCTION

function closePopup() {
  popup.classList.remove('popup_open');
}

// POPUP SUBMIT FUNCTION

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup();
}


editButton.addEventListener('click', openPopup); // Прослушиватель на *edit-button*
popupCloseButton.addEventListener('click', closePopup); // Прослушиватель *на close-button*
formElement.addEventListener('submit', formSubmitHandler); // Прослушиватель *на submit-button*


// Bootcamp =)

// let likeButton = document.querySelector('.element__like-button');
// let likeButtonActive = document.querySelector('.element__like-button_active');


// function like(event) {
//   likeButton.classList.add('element__like-button_active');
// }
// likeButton.addEventListener('click', like);
// likeButton.addEventListener('click' , function(event) {
// likeButton.classList.remove('element__like-button');
// })

// const likeButton = document.querySelector('button')

// likeButton.addEventListener('click', function (event) {
//   likeButton.classList.remove('element__like-button');
//   console.log('Произошло событие', event.type)
// })
