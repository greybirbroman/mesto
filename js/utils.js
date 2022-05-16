export {
  popupViewCard,
  nameInput,
  jobInput,
  profileName,
  profileActivity,
  popupImage,
  popupAlt,
  openPopup,
  closePopup,
}

const nameInput = document.querySelector('.popup__input_place_name'); // Инпут Name
const jobInput = document.querySelector('.popup__input_place_job'); // Инпут Job
const profileName = document.querySelector('.profile__name'); // Имя Профиля на странице
const profileActivity = document.querySelector('.profile__activity'); // Должность Профиля на странице

const popups = document.querySelectorAll('.popup'); // Popups

const popupViewCard = document.querySelector('.popup_type_open-card');
const popupImage = popupViewCard.querySelector('.popup__image');
const popupAlt = popupViewCard.querySelector('.popup__alt');


// OPEN POPUP
function openPopup(popups) {
  popups.classList.add('popup_open');
  document.addEventListener('keydown', handleEsc);
  popups.addEventListener('mousedown', closeByOverlay);
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