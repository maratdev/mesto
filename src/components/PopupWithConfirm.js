import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._selector.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__input-btn");
  }

  setCallbackConfirm(callbackConfirm) {
    this._callbackConfirm = callbackConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._callbackConfirm()
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    });
  }

}

