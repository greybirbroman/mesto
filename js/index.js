

// POPUP
const popups = document.querySelectorAll('.popup'); // Popups
const popupEdit = document.querySelector('.popup_type_edit'); // Popup EditProfile
const popupAdd = document.querySelector('.popup_type_add'); // Popup AddСontent
const popupViewCard = document.querySelector('.popup_type_open-card'); // Popup OpenCard

// POPUP FORMS
const formEditProfile = popupEdit.querySelector('.popup__form_type_edit'); // Форма EditProfile
const formEditProfileElements = document.querySelector('[name="popupEditForm"]');
const formAddContent = popupAdd.querySelector('.popup__form_type_submit'); // Форма AddContent
const formAddContentElements = document.querySelector('[name="popupAddContent"]');
// CONST
const nameInput = formEditProfile.querySelector('.popup__input_place_name'); // Инпут Name
const jobInput = formEditProfile.querySelector('.popup__input_place_job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля на странице
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля на странице
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка Edit-Profile
const contentCreateBtn = popupAdd.querySelector('.popup__submit_type_add'); // Кнопка "Создать" Add-Content
const cardAddBtn = document.querySelector('.profile__add-button'); // Кнопка "Добавить" Add-Content
const popupImage = popupViewCard.querySelector('.popup__image'); // Изображение внутри попапа OpenCard
const popupAlt = popupViewCard.querySelector('.popup__alt'); // Подпись изображения попапа OpenCard
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

  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  // OPEN VIEW CARD
  cardImage.addEventListener('click', () => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupAlt.textContent = item.name;
    openPopup(popupViewCard);
  });

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

function openEditPopup() {
  // toggleSubmit (param1, param2, param3)
  toggleButtonState(Array.from(popupEdit.querySelectorAll(config.inputSelector)), popupEdit.querySelector(config.submitButtonSelector), config);
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function openAddContentPopup() {
  // toggleSubmit (param1, param2, param3)
  toggleButtonState(Array.from(popupAdd.querySelectorAll(config.inputSelector)), popupAdd.querySelector(config.submitButtonSelector), config);
  openPopup(popupAdd);
  formAddContentElements.reset();
}

// POPUPS CLOSE FUNCTIONS
function closePopup(popups) {
  popups.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEsc);
  document.removeEventListener('mousedown', closeByOverlay);
}
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

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

// POPUP EDIT-PROFILE SUBMIT FUNCTION

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(popupEdit);
}

// POPUP ADD CARD SUBMIT FUNCTION 

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const cardNew = getElement({
    name: inputTitleValue.value,
    link: inputLinkValue.value
  });
  cardsContainer.prepend(cardNew);
  closePopup(popupAdd);
  evt.target.reset();
}

profileEditBtn.addEventListener("click", () => openEditPopup());
cardAddBtn.addEventListener("click", () => openAddContentPopup());
formEditProfile.addEventListener('submit', handleProfileFormSubmit); // Прослушиватель *Сохранить* профиль
formAddContent.addEventListener('submit', handleAddContentFormSubmit);  // Прослушиватель *Создать* контент