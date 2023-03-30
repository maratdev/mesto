export default class Card {
  constructor(name, link, templateSelector, initImageModalOpen) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._initImageModalOpen = initImageModalOpen;
  }

  _getTemplate() {
    const newElement = document.querySelector(this._templateSelector).content.querySelector('.elements__items').cloneNode(true);
    return newElement;
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

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    // Открыть картинку elements -> card
    this._cardImage.addEventListener("click", () => this._handleImageClick());
   // Удалить карточку elements -> card
    this._element.querySelector(".card__trash").addEventListener("click", () => this._deleteCard());
    // Лайк карточки elements -> card
    this._element.querySelector(".card__like").addEventListener("click", (evt) => this._toggleLike(evt));

  };

  _toggleLike(evt){
      evt.target.classList.toggle('card__like_active')
  }

  _deleteCard(){
    this._element.remove();
  }

  _handleImageClick(){
    this._initImageModalOpen(this._name, this._link);

  }

}
