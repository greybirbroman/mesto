// CONTENT CARDS

const initialCards = [
  {
    name: 'Дуайт',
    link: 'https://kinoblog.tv/images/films/365.jpg'
  },
  {
    name: 'Кевин',
    link: 'https://s3.wi-fi.ru/cp3o/5463adydqnud6w5s4w21kgr5pf69?response-content-type=image%2Fjpeg'
  },
  {
    name: 'Джим и Пэм',
    link: 'https://xage.ru/media/posts/2021/5/29/semka-odnoj-stseny-v-seriale-ofis-oboshlas-v-250-tysjach-dollarov.jpg'
  },
  {
    name: 'Райан',
    link: 'https://dic.academic.ru/pictures/wiki/files/82/Ryanoffice.jpg'
  },
  {
    name: 'Холли',
    link: 'https://gol.ru/images/original/materials/sections/82278/82278.jfif'
  },
  {
    name: 'Dunder Mifflin',
    link: 'https://avatars.mds.yandex.net/get-kinopoisk-post-img/1528730/bea07e06cd2826fbf4784a3069b4e975/960'
  }
];

// ПЕРЕМЕННЫЕ

const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popup = document.querySelector('.popup'); // Попап EDIT
const popupEdit = document.querySelector('.popup_type_edit');
const popupCloseBtn = document.querySelector('.popup__close'); // Кнопка закрытия попапа EDIT
const popupAddCloseBtn = document.querySelector('.popup__close_type_add'); // Кнопка закрытия попапа ADD
const popupNewCardCloseBtn = document.querySelector('.popup__close_type_open-card');
const formElement = document.querySelector('.popup__form'); // Форма попапа
const nameInput = formElement.querySelector('#name'); // Инпут Name
const jobInput = formElement.querySelector('#job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля
const createContentBtn = document.querySelector('.popup__submit_type_add'); // Кнопка "Создать"
const addCardBtn = document.querySelector('.profile__add-button'); // Кнопка "Добавить"
const popupAdd = document.querySelector('.popup_type_add'); // Попап ADD
const popupOpenCard = document.querySelector('.popup_type_open-card'); // Попап OpenCard
const popupImageContainer = document.querySelector('.popup__card-container');
const popupImage = document.querySelector('.popup__image');
const popupAlt = document.querySelector('.popup__alt');

// GET CARD FROM JS

const template = document.querySelector('.template-element');
const cardsList = document.querySelector('.elements__list');

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

  // ADD LIKE
  cardLikeBtn.addEventListener('click', () => {
    cardLikeBtn.classList.toggle('element__like-button_type_active');
  });

  // DELITE CARD 
  cardDeliteBtn.addEventListener('click', () => {
    cardDeliteBtn.closest('.element').remove();
  });
  // OPEN VIEW CARD
  cardImage.addEventListener('click', () => {
    openPopup(popupOpenCard);
    popupImage.src = item.link;
    popupAlt.textContent = item.name;
  });
  // CLOSE VIEW CARD
  popupNewCardCloseBtn.addEventListener('click', () => {
    closePopup(popupOpenCard);
  });
  return cardElement;
}

// NEW CARD 
function handleAddContent(evt) {
  evt.preventDefault();
  const inputTitleValue = document.querySelector('.popup__input_place_title').value;
  const inputLinkValue = document.querySelector('.popup__input_place_link').value;
  const cardNew = getElement({ name: inputTitleValue, link: inputLinkValue });
  cardsList.prepend(cardNew);
  closePopup(popupAdd);
}
render();

// POPUP OPEN FUNCTION
function openPopup(popup) {
  popup.classList.add('popup_open');
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
});
addCardBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});


// POPUP CLOSE FUNCTION
function closePopup(popup) {
  popup.classList.remove('popup_open');
}
popupCloseBtn.addEventListener('click', () => {
  closePopup(popupEdit);
});
popupAddCloseBtn.addEventListener('click', () => {
  closePopup(popupAdd);
});


// POPUP EDIT-PROFILE SUBMIT FUNCTION
nameInput.value = profileName.textContent;
jobInput.value = profileActivity.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(popupEdit);
}

formElement.addEventListener('submit', formSubmitHandler); // Прослушиватель *на submit-button*
createContentBtn.addEventListener('click', handleAddContent);  // Прослушиватель *Создать* контент
