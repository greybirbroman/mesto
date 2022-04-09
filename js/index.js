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

// ПЕРЕМЕННЫЕ

const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupEdit = document.querySelector('.popup'); // Попап EDIT
const popupCloseBtn = document.querySelector('.popup__close'); // Кнопка закрытия попапа EDIT
const popupAddCloseBtn = document.querySelector('.popup__close_type_add'); // Кнопка закрытия попапа ADD
const formElement = document.querySelector('.popup__form'); // Форма попапа
const nameInput = formElement.querySelector('#name'); // Инпут Name
const jobInput = formElement.querySelector('#job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля
const createContentBtn = document.querySelector('.popup__submit_type_add'); // Кнопка "Создать"
const addCardBtn = document.querySelector('.profile__add-button'); // Кнопка "Добавить"
const popupAdd = document.querySelector('.popup_type_add'); // Попап ADD

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
// Создать новую карточку + закрыть после "Создать"
function handleAddContent(evt) {
  evt.preventDefault();
  const inputTitleValue = document.querySelector('.popup__input_place_title').value;
  const inputLinkValue = document.querySelector('.popup__input_place_link').value;
  const cardNew = getElement({ name: inputTitleValue, link: inputLinkValue });
  cardsList.prepend(cardNew);
  closePopupAdd();
}


render();


// POPUP OPEN FUNCTION
// POPUP EDIT
function openPopupEdit() {
  popupEdit.classList.add('popup_open');
  // Сохраним данные внесенные в форму
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}
// POPUP ADD
addCardBtn.addEventListener('click', function () {
  popupAdd.classList.add('popup_open');
});

// POPUP CLOSE FUNCTION
// POPUP EDIT
function closePopupEdit() {
  popupEdit.classList.remove('popup_open');
}
// POPUP ADD
function closePopupAdd() {
  popupAdd.classList.remove('popup_open');
}


// POPUP EDIT SUBMIT FUNCTION

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopupEdit();
}


editButton.addEventListener('click', openPopupEdit); // Прослушиватель на *edit-button*
popupCloseBtn.addEventListener('click', closePopupEdit); // Прослушиватель *на close-button EDIT*
formElement.addEventListener('submit', formSubmitHandler); // Прослушиватель *на submit-button*
popupAddCloseBtn.addEventListener('click', closePopupAdd); // Прослушиватель *на close-button ADD*
createContentBtn.addEventListener('click', handleAddContent);  // Прослушиватель *Создать* контент


