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
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._callbackConfirm();
    });
  }
}
