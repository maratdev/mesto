export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(){
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Функция закрывания модальных окон при клике X
  close () {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Функция закрывания модальных окон при клике ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close") ){
        this.close();
      }
    });
  };

}
