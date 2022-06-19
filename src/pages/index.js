import './index.css';
import {
  formEditProfile,
  formAddContent,
  formChangeAvatar,
  avatar,
  avatarChangeBtn,
  profileEditBtn,
  cardAddBtn,
  config,
} from '../utils/constants.js'
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import { data } from 'autoprefixer';

// ON VALIDATION

const formEditProfileValidator = new FormValidator(config, formEditProfile);
const formAddContentValidator = new FormValidator(config, formAddContent);
const formChangeAvatarValidator = new FormValidator(config, formChangeAvatar);
formEditProfileValidator.enableValidation();
formAddContentValidator.enableValidation();
formChangeAvatarValidator.enableValidation();

const userInfo = new UserInfo({
  user: '.profile__name',
  job: '.profile__activity',
  avatar: '.profile__avatar',
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    'authorization': '8a02976e-9928-4d99-8404-799991dc3d13',
    'Content-Type': 'application/json',
  }
})

// Получим данные с сервера

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    if(userData) {
      console.log('USER_DATA_OK')
      userInfo.setUserInfo(userData)
    } else {
      console.log('USER_DATA_ERR')
    }
    if(cardsData) {
      console.log('CARD_DATA_OK')
      cardsList.renderItems(cardsData)
    } else {
      console.log('CARD_DATA_ERR')
    }
  })
  .catch((err) => {
    const message = `${err}`
    console.log(message)
  })


const popupViewCard = new PopupWithImage('.popup_type_open-card');
popupViewCard.setEventListeners();

const popupConfirm = new PopupWithConfirm('.popup_type_confirm');
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    popupAvatar.loading(true)
    formChangeAvatarValidator.setInitialSatate()
    api.patchNewAvatar(data)
      .then((data) => {
        avatar.src = data.avatar
        popupAvatar.close()
      })
      .catch((err) => {
        const message = `${err}`
        console.log(message)
      })
      .finally(() => {
        popupAvatar.loading(false)
      })
  }
})
popupAvatar.setEventListeners();

avatarChangeBtn.addEventListener('click', () => {
  formChangeAvatarValidator.setInitialSatate()
  const currentAvatarData = userInfo.getUserInfo()
  popupAvatar.open(currentAvatarData)
})

const popupAddContent = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    popupAddContent.loading(true)
    formAddContentValidator.setInitialSatate();
    api.postNewCard(data)
      .then((data) => {
        cardsList.addItemTop(createContent(data))
        popupAddContent.close()
      })
      .catch((err) => {
        const message = `${err}`
        console.log(message)
      })
      .finally(() => {
        popupAddContent.loading(false)
      })
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
    popupEditProfile.loading(true)
    api.patchUserProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data)
        popupEditProfile.close()
      })
      .catch((err) => {
        const message = `${err}`
        console.log(message)
      })
      .finally(() => {
        popupEditProfile.loading(false)
      })
  }
})
popupEditProfile.setEventListeners()

profileEditBtn.addEventListener('click', () => {
  formEditProfileValidator.setInitialSatate()
  const currentUserInfo = userInfo.getUserInfo()
  popupEditProfile.open(currentUserInfo)
});

const cardsList = new Section({
  renderer: ((item) => {
    cardsList.addItem(createContent(item))
  }),
}, '.elements__list')


const createContent = (data) => {
  const card = new Card({
    data: data,
    userId: userInfo.getUserID(),
    // Просмотр карточки
    handleCardPreview: () => {
      popupViewCard.open(data)
    },
    // Поставить лайк
    handleAddLike: () => {
      api.likeCard(card.getCardId())
        .then((data) => {
          card.toggleLikeEvent(data)
        })
        .catch((err) => {
          const message = `${err}`
          console.log(message)
        })
    },
    // Удалить карточку
    handleDeliteCard: () => {
      popupConfirm.open()
      popupConfirm.setSubmitEvent(() => {
        popupConfirm.loading(true)
        api.deliteCard(card.getCardId())
          .then(() => {
            card.handleRemove()
            popupConfirm.close()
          })
          .catch((err) => {
            const message = `${err}`
            console.log(message)
          })
          .finally(() => {
            popupConfirm.loading(false) 
          })
      })
    },
    // Убрать лайк
    handleRemoveLike: () => {
      api.unlikeCard(card.getCardId())
        .then((data) => {
          card.toggleLikeEvent(data)
        })
        .catch((err) => {
          const message = `${err}`
          console.log(message)
        })
    }
  }, '.template-element')
  return card.generateCard()
}
