// CONTENT CARDS

const initialCards = [
  {
    name: 'Дуайт',
    link: 'https://kinoblog.tv/images/films/365.jpg'
  },
  {
    name: 'Хеллоуин',
    link: 'https://purewows3.imgix.net/images/articles/2019_08/the_office_halloween_episodes_gabe_and_ryan.jpg?auto=format,compress&cs=strip'
  },
  {
    name: 'Джим и Пэм',
    link: 'https://xage.ru/media/posts/2021/5/29/semka-odnoj-stseny-v-seriale-ofis-oboshlas-v-250-tysjach-dollarov.jpg'
  },
  {
    name: 'Стенли доволен?',
    link: 'https://www.indiewire.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-06-at-10.39.06-AM.png'
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

// POPUP
const popups = document.querySelectorAll('.popup'); // Popups
const popupEdit = document.querySelector('.popup_type_edit'); // Popup EditProfile
const popupAdd = document.querySelector('.popup_type_add'); // Popup AddСontent
const popupOpenCard = document.querySelector('.popup_type_open-card'); // Popup OpenCard

// POPUP FORMS
const formElement = popupEdit.querySelector('.popup__form'); // Форма EditProfile
const formAddContent = popupAdd.querySelector('.popup__form_type_submit'); // Форма AddContent

const nameInput = formElement.querySelector('.popup__input_place_name'); // Инпут Name
const jobInput = formElement.querySelector('.popup__input_place_job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля на странице
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля на странице
const editBtn = document.querySelector('.profile__edit-button'); // Кнопка Edit-Profile
const createContentBtn = popupAdd.querySelector('.popup__submit_type_add'); // Кнопка "Создать" Add-Content
const addCardBtn = document.querySelector('.profile__add-button'); // Кнопка "Добавить" Add-Content
const popupImage = popupOpenCard.querySelector('.popup__image'); // Изображение внутри попапа OpenCard
const popupAlt = popupOpenCard.querySelector('.popup__alt'); // Подпись изображения попапа OpenCard

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
  cardImage.alt = item.name;

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
    popupImage.alt = item.name;
    popupAlt.textContent = item.name;
  });
  return cardElement;
}
render();

// POPUP OPEN FUNCTION
function openPopup(popup) {
  popup.classList.add('popup_open');
}

editBtn.addEventListener('click', () => {
  openPopup(popupEdit);
});
addCardBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});

// POPUPS CLOSE FUNCTION
function closePopup(popup) {
  popup.classList.remove('popup_open');
}
// Большое спасибо за интересный код! Так правда опрятнее!
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// POPUP EDIT-PROFILE SUBMIT FUNCTION

nameInput.value = profileName.textContent;
jobInput.value = profileActivity.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(popupEdit);
  evt.target.reset();
}

// NEW CARD FUNTION

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const inputTitleValue = popupAdd.querySelector('.popup__input_place_title').value;
  const inputLinkValue = popupAdd.querySelector('.popup__input_place_link').value;
  const cardNew = getElement({ name: inputTitleValue, link: inputLinkValue });
  cardsList.prepend(cardNew);
  closePopup(popupAdd);
  evt.target.reset();
}

formElement.addEventListener('submit', handleProfileFormSubmit); // Прослушиватель *Сохранить* профиль
formAddContent.addEventListener('submit', handleAddContentFormSubmit);  // Прослушиватель *Создать* контент