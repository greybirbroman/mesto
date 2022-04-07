// ПЕРЕМЕННЫЕ

let editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
let popup = document.querySelector('.popup'); // Попап
let popupCloseButton = document.querySelector('.popup__close'); // Кнопка закрытия попапа
let formElement = document.querySelector('.popup__form'); // Форма попапа
let nameInput = formElement.querySelector('#name'); // Инпут Name
let jobInput = formElement.querySelector('#job'); // Инпут Job
let profileName = document.querySelector('.profile__name'); // Имя Профиля
let profileActivity = document.querySelector('.profile__activity'); // Должность Профиля

// POPUP OPEN FUNCTION

function openPopup(evt) {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
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
