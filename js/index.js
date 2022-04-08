// CONTENT CARDS

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Получить карточку из JS
const cardsList = document.querySelector('.elements__list');
const template = document.querySelector('.template-element');


function render() {
  const html = initialCards.map(getElement);
  cardsList.append(...html);
}

function getElement(item) {

  const cardElement = template.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardName = cardElement.querySelector('.element__name');
  const cardLikeBtn = cardElement.querySelector('.element__like-button');
  const cardDeliteBtn = cardElement.querySelector('.element__delite-button');
  cardName.textContent = item.name;
  cardImage.src = item.link;

  // Добавить Like

  cardLikeBtn.addEventListener('click', () => {
    cardLikeBtn.classList.toggle('element__like-button_type_active');
  });

  // Удалить Карточку

  cardDeliteBtn.addEventListener('click', () => {
    cardDeliteBtn.closest('.element').remove();
  });
  return cardElement;
}
render();


// ПЕРЕМЕННЫЕ

const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popup = document.querySelector('.popup'); // Попап
const popupCloseButton = document.querySelector('.popup__close'); // Кнопка закрытия попапа
const formElement = document.querySelector('.popup__form'); // Форма попапа
const nameInput = formElement.querySelector('#name'); // Инпут Name
const jobInput = formElement.querySelector('#job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля


// EDIT_PROFILE POPUP OPEN FUNCTION

function openPopup(evt) {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

// EDIT_PROFILE POPUP CLOSE FUNCTION

function closePopup() {
  popup.classList.remove('popup_open');
}

// EDIT_PROFILE POPUP SUBMIT FUNCTION

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup();
}


editButton.addEventListener('click', openPopup); // Прослушиватель на *edit-button*
popupCloseButton.addEventListener('click', closePopup); // Прослушиватель *на close-button*
formElement.addEventListener('submit', formSubmitHandler); // Прослушиватель *на submit-button*

