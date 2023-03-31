import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomImg = this._selector.querySelector(".popup__zoom-image");
    this._popupZoomTitle = this._selector.querySelector(".popup__zoom-title");
  }

  open(name, link) {
    this._popupZoomImg.src = link;
    this._popupZoomImg.alt = name;
    this._popupZoomTitle.textContent = name;
    super.open();
  }

}
