import { popupViewCard, popupImage, popupAlt, openPopup } from "./utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._link = data.link;
    this._element = this._getTemplate(templateSelector);
    this._generateCard();
  }

  _getTemplate(templateSelector) {
    const templateElement = document
      .querySelector(templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return templateElement;
  }

  _handleOpenPopup(popupViewCard) {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupAlt.textContent = this._name;
    openPopup(popupViewCard);
  }

  _toggleLike(cardElementSelector) {
    cardElementSelector.likeButton.classList.toggle('element__like-button_type_active');
  }

  _setEventListeners = (cardElementSelector) => {
    cardElementSelector.image.addEventListener('click', () => {
      this._handleOpenPopup(popupViewCard);
    });
    cardElementSelector.deliteButton.addEventListener('click', () => {
      this._element.remove();
    });
    cardElementSelector.likeButton.addEventListener('click', () => {
      this._toggleLike(cardElementSelector);
    });
  };

  _generateCard() {

    const cardElementSelector = {
      image: this._element.querySelector('.element__image'),
      name: this._element.querySelector('.element__name'),
      likeButton: this._element.querySelector('.element__like-button'),
      deliteButton: this._element.querySelector('.element__delite-button'),
    }

    cardElementSelector.image.src = this._link;
    cardElementSelector.image.alt = this._name;
    cardElementSelector.name.textContent = this._name;

    this._setEventListeners(cardElementSelector);
  }

  getElement() {
    return this._element;
  }
}