

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
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка Edit-Profile
const contentCreateBtn = popupAdd.querySelector('.popup__submit_type_add'); // Кнопка "Создать" Add-Content
const cardAddBtn = document.querySelector('.profile__add-button'); // Кнопка "Добавить" Add-Content
const popupImage = popupOpenCard.querySelector('.popup__image'); // Изображение внутри попапа OpenCard
const popupAlt = popupOpenCard.querySelector('.popup__alt'); // Подпись изображения попапа OpenCard
const inputTitleValue = popupAdd.querySelector('.popup__input_place_title');
  const inputLinkValue = popupAdd.querySelector('.popup__input_place_link');
// GET CARD FROM JS

const template = document.querySelector('.template-element');
const cardsContainer = document.querySelector('.elements__list');

function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
}

function getElement(item) {

  const cardElement = template.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardName = cardElement.querySelector('.element__name');
  const cardLikeBtn = cardElement.querySelector('.element__like-button');
  const cardDeliteBtn = cardElement.querySelector('.element__delite-button');

  // OPEN VIEW CARD
  cardImage.addEventListener('click', () => {
    openPopup(popupOpenCard);
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupAlt.textContent = item.name;
  });

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
  return cardElement;
}
render();

// POPUP OPEN FUNCTION

function openPopup(popups) {
  popups.classList.add('popup_open');
  document.addEventListener('keydown', handleEsc);
  document.addEventListener('mousedown', closeByOverlay);
}

profileEditBtn.addEventListener('click', () => {
  openPopup(popupEdit);
});

cardAddBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});

// POPUPS CLOSE FUNCTIONS
function closePopup(popups) {
  popups.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEsc);
  document.removeEventListener('mousedown', closeByOverlay);
}

function handleEsc(evt) {
  if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_open');
      closePopup(popupOpened);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
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

// NEW CARD FUNCTION

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const cardNew = getElement({ name: inputTitleValue.value, link: inputLinkValue.value });
  cardsContainer.prepend(cardNew);
  closePopup(popupAdd);
  evt.target.reset();
}

formElement.addEventListener('submit', handleProfileFormSubmit); // Прослушиватель *Сохранить* профиль
formAddContent.addEventListener('submit', handleAddContentFormSubmit);  // Прослушиватель *Создать* контент