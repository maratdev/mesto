export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, { handleCardDelete, handleAddLike, handleDeleteLike }) {
   // console.log('Card:'+ userId)
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;

    this.cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
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
    // поставить/удалить лайк
    this._likeButton = this._element.querySelector(".card__like");

    //my _id b1bb5fb60a768aef92a1820e
    if (this._userId === this._ownerId) {
      this._element.querySelector(".card__trash").classList.add('card_trash_visible');
    }
    this.toggleLikeState();
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
    this._likeButton.addEventListener("click", () => {
      if(this.isLiked()) {
        this._handleDeleteLike();
      } else {
        this._handleAddLike();
      }
    });

  };

  deleteCard(){
    this._element.remove();
    this._element = null;
  }

  setLikes() {
    this._likeButton.classList.add('card__like_active');
  }

  deleteLikes() {
    this._likeButton.classList.remove('card__like_active');
  }

  isLiked() {
    return this._likes.some(element => element._id === this._userId);
  }

  switchLikes(likes) {
    this._likes = likes;
    this.toggleLikeState();
  }

  toggleLikeState() {
    this._countLikes.textContent = this._likes.length;
    if(this.isLiked()) {
      this.setLikes();
    } else {
      this.deleteLikes();
    }
  }


}
