export default class Popup {
  constructor(selector) {
    this.selector = selector;
  }

  _getTemplate() {
    const newElement = document.querySelector(this._templateSelector).content.querySelector('.elements__items').cloneNode(true);
    return newElement;
  }
}
