import { items } from './items.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';





// POPUP
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// POPUP FORMS
const formEditProfile = popupEdit.querySelector('.popup__form_type_edit');
const formAddContent = popupAdd.querySelector('.popup__form_type_submit');

// CONST
const nameInput = document.querySelector('.popup__input_place_name'); // Инпут Name
const jobInput = document.querySelector('.popup__input_place_job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля на странице
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля на странице

const cardsList = document.querySelector('.elements__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const inputTitleValue = popupAdd.querySelector('.popup__input_place_title');
const inputLinkValue = popupAdd.querySelector('.popup__input_place_link');

const popups = document.querySelectorAll('.popup'); // Popups

const popupViewCard = document.querySelector('.popup_type_open-card');
const popupImage = popupViewCard.querySelector('.popup__image');
const popupAlt = popupViewCard.querySelector('.popup__alt');

// VALIDATION Config
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  fieldsetSelector: '.popup__fieldset',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputError: 'popup__input-error_active',
  selectorError: 'popup__input_type_error',
  spanSelector: 'popup__input-error',
};


const formEditProfileValidator = new FormValidator(config, formEditProfile);
const formAddContentValidator = new FormValidator(config, formAddContent);

// ON VALIDATION
formEditProfileValidator.enableValidation();
formAddContentValidator.enableValidation();

function render() {
  for (const data of items) {
    const card = createContent(data);
    cardsList.append(card);
  }
}

function createContent(data) {
  return new Card(data, '.template-element', handleCardPreview).getElement();
}

// OPEN POPUP
function openPopup(popups) {
  popups.classList.add('popup_open');
  document.addEventListener('keydown', handleEsc);
  popups.addEventListener('mousedown', closeByOverlay);
}

function openAddContentPopup() {
  openPopup(popupAdd);
}

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function handleCardPreview(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupAlt.textContent = name;
  openPopup(popupViewCard);
}

// POPUPS CLOSE
function closePopup(popups) {
  popups.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEsc);
  popups.removeEventListener('mousedown', closeByOverlay);
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
  if (evt.target.classList.contains('popup_open')) {
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
  const data = {
    name: inputTitleValue.value,
    link: inputLinkValue.value
  }
  const card = createContent(data);
  cardsList.prepend(card);
  closePopup(popupAdd);
  formAddContentValidator.setInitialSatate();
}

render();


profileEditBtn.addEventListener('click', () => {
  openEditPopup();
});

cardAddBtn.addEventListener('click', () => {
  openAddContentPopup();
  formAddContentValidator.setInitialSatate();
});

formEditProfile.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
});

formAddContent.addEventListener('submit', (evt) => {
  handleAddContentFormSubmit(evt);
  formAddContentValidator.setInitialSatate();
});