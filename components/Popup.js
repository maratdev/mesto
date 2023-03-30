export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  open(){
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  // Функция закрывания модальных окон при клике X
  close () {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  // Функция закрывания модальных окон при клике ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.open();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  };

}
