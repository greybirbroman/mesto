export class Card {
  constructor(data, templateSelector, handleCardPreview) {
    this._name = data.name
    this._link = data.link;
    this._element = this._getTemplate(templateSelector);
    this._handleCardPreview = handleCardPreview;
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

  _toggleLike = (cardElementSelector) => {
    cardElementSelector.likeButton.classList.toggle('element__like-button_type_active');
  }

  _handleRemove = () => {
    this._element.remove();
  }

  _setEventListeners = (cardElementSelector) => {
    cardElementSelector.image.addEventListener('click', () => {
      this._handleCardPreview(this._name, this._link);
    });
    cardElementSelector.deliteButton.addEventListener('click', () => {
      this._handleRemove();
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