export default class Card {
  constructor(data, templateSelector, handleCardClick, { handleCardDelete }) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
   // this._handleAddLike = handleAddLike;
   // this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.elements__items').cloneNode(true);
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавим данные
    this._cardImage = this._element.querySelector(".card__item");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    // Количество лайков
    this._countLikes = this._element.querySelector(".card__like-count");
    this._countLikes.textContent = this._likes.length;
  // Количество лайков

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    // Открыть картинку elements -> card
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
   // Удалить карточку elements -> card
    this._element.querySelector(".card__trash").addEventListener("click", () => this._handleCardDelete());
    // Лайк карточки elements -> card
    this._element.querySelector(".card__like").addEventListener("click", (evt) => this._toggleLike(evt));

  };

  _toggleLike(evt){
      evt.target.classList.toggle('card__like_active')
  }

  deleteCard(){
    this._element.remove();
    this._element = null;
  }

}
