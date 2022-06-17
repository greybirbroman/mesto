export default class Card {
  constructor({ data, userId, handleCardPreview, handleAddLike, handleDeliteCard, handleRemoveLike }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._handleCardPreview = handleCardPreview;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeliteCard = handleDeliteCard;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  getCardId() {
    return this._id
  }

  //Прокинем через слушатель в CARD -> LIKE
  toggleLikeEvent (data) {
    this._likeButton.classList.toggle('element__like-button_type_active');
    this._likes = data.likes
    this._likeCounter.textContent = this._likes.length
  }
  // Прокинем через слушатель в CARD -> DELETE
  handleRemove = () => {
    this._element.remove();
    this._element = null
  }

  _checkLikeState() {
    if (this._likeButton.classList.contains('element__like-button_type_active')) {
      this._handleRemoveLike(this._id)
    } else {
      this._handleAddLike(this._id)
    }
  }

  _checkDeliteState() {
    if (this._owner !== this._userId) {
      this._deliteButton.remove();
    }
  }

  _isLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id
    })) {
      this._likeButton.classList.add('element__like-button_type_active')
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardPreview();
    });
    this._deliteButton.addEventListener('click', () => {
      this._handleDeliteCard();
    });
    this._likeButton.addEventListener('click', () => {
      this._checkLikeState();
    });
  };

  generateCard() {

    this._element = this._getTemplate()

    this._image = this._element.querySelector('.element__image')
    this._image.src = this._link
    this._image.alt = this._name
    

    this._name = this._element.querySelector('.element__name').textContent = this._name

    this._likeButton = this._element.querySelector('.element__like-button')
    this._likeCounter = this._element.querySelector('.element__like-button-counter')
    this._likeCounter.textContent = this._likes.length
    this._deliteButton = this._element.querySelector('.element__delite-button')

    this._setEventListeners();
    this._checkDeliteState();
    this._isLiked();

    return this._element;
  }
}