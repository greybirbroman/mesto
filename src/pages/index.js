import './index.css';
import { items } from '../utils/items.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';


// POPUP
//const popupEdit = document.querySelector('.popup_type_edit');
//const popupAdd = document.querySelector('.popup_type_add');

// POPUP FORMS
const formEditProfile = document.querySelector('.popup__form_type_edit');
const formAddContent = document.querySelector('.popup__form_type_submit');

// CONST
const nameInput = document.querySelector('[name="user"]'); // Инпут Name
const jobInput = document.querySelector('[name="job"]'); // Инпут Job
//const inputTitle = document.querySelector('[name="title"]') // Инпут Title
//const inputLink = document.querySelector('[name="link"]'); // Инпут Link
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка Edit
const cardAddBtn = document.querySelector('.profile__add-button'); // Кнопка Add Content



const popupViewCard = new PopupWithImage('.popup_type_open-card');
popupViewCard.setEventListeners();

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

// ON VALIDATION

const formEditProfileValidator = new FormValidator(config, formEditProfile);
const formAddContentValidator = new FormValidator(config, formAddContent);
formEditProfileValidator.enableValidation();
formAddContentValidator.enableValidation();

const createContent = (data) => {
  const card = new Card({
    data: data,
    handleCardPreview: (name, link) => {
      popupViewCard.open({name, link})
    }
  }, '.template-element')
  const cardElement = card.getElement()
  return cardElement
}

const cardList = new Section({
  items: items,
  renderer: (item) => {
    cardList.addItem(createContent(item))
  }
}, '.elements__list')

cardList.renderItems()

const popupAddContent = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    const cardData = {
      name: data.title,
      link: data.link,
    }
    cardList.addItemTop(createContent(cardData))
    popupAddContent.close()
    formAddContentValidator.setInitialSatate()
  }
})
popupAddContent.setEventListeners()

cardAddBtn.addEventListener('click', () => {
  formAddContentValidator.setInitialSatate();
  popupAddContent.open()
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      user: data.user,
      job: data.job,
    })
    popupEditProfile.close()
    formEditProfileValidator.setInitialSatate()
  }
})
popupEditProfile.setEventListeners()

profileEditBtn.addEventListener('click', () => {
  formEditProfileValidator.setInitialSatate()
  const info = userInfo.getUserInfo()
  addUserInfo({
    user: info.user,
    job: info.job,
  })
  popupEditProfile.open(info)
});

function addUserInfo({user, job}) {
  nameInput.value = user
  jobInput.value = job
}

const userInfo = new UserInfo({
  user: '.profile__name',
  job: '.profile__activity',
})
