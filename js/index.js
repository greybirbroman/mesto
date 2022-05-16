import { items } from './items.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  nameInput,
  jobInput,
  profileName,
  profileActivity,
  openPopup,
  closePopup,
} from './utils.js';

// POPUP
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// POPUP FORMS
const formEditProfile = popupEdit.querySelector('.popup__form_type_edit');
const formAddContent = popupAdd.querySelector('.popup__form_type_submit');

// CONST
const cardsList = document.querySelector('.elements__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const inputTitleValue = popupAdd.querySelector('.popup__input_place_title');
const inputLinkValue = popupAdd.querySelector('.popup__input_place_link');

// VALIDATION Config
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  fieldsetSelector: '.popup__fieldset',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputError: 'popup__input-error_active',
  selectorError: 'popup__input_type_error',
};

const formEditProfileValidator = new FormValidator(config, formEditProfile);
const formAddContentValidator = new FormValidator(config, formAddContent);

function render() {
  for (const data of items) {
    const card = createContent(data);
    cardsList.append(card.getElement());
  }
}

function createContent(data) {
  return new Card(data, '.template-element');
}

function openAddContentPopup() {
  openPopup(popupAdd);
  formAddContentValidator.enableValidation();
}

function openEditPopup() {
  openPopup(popupEdit);
  formEditProfileValidator.enableValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

// POPUP EDIT-PROFILE SUBMIT FUNCTION

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(popupEdit);
}

// POPUP ADD CARD SUBMIT FUNCTION 

// При множественном нажатии на Submit при закрытии Popup добавляется много карточек. Не получилось устранить проблему.

function handleAddContentFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: inputTitleValue.value,
    link: inputLinkValue.value
  }
  const card = createContent(data);
  cardsList.prepend(card.getElement());
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