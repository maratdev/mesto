export default class FormValidator {
  constructor(object, formElement) {
    this._formElement = formElement;
    this._inputSelector = object.inputSelector;
    this._submitSelector = object.submitSelector;
    this._disabledButtonClass = object.disabledButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitSelector);
  }

  // Добавляем класс с ошибкой.
  _showInputError(inputElement, errorMessage) {
    // находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
    errorElement.classList.add(this._errorClass); // Замена содержимого span с ошибкой на переданный параметр
  }

  // Удаляем класс с ошибкой
  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = '';
  }

// formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
// Функция, которая проверяет валидность поля
  _isValid(inputElement){
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);

    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  // Делаем кнопку отправки неактивной
  disabledSubmitBtn(){
    this._buttonElement.classList.add(this._disabledButtonClass);
    this._buttonElement.disabled = true;
  };
  // Активной
  activeSubmitBtn(){
    this._buttonElement.classList.remove(this._disabledButtonClass);
    this._buttonElement.disabled = false;
  };

  // Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
 _toggleButtonState(){
    if (this._hasInvalidInput()) { //если хотя бы один невалидный инпут, кнопка неактивна
      this.disabledSubmitBtn()
    } else {
      this.activeSubmitBtn()
    }
  };

  // Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
_hasInvalidInput(){
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

//Добавляет обработчики сразу всем полям формы
_setEventListeners(){
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });

};
  enableValidation = () => {
    this._toggleButtonState();
    this._setEventListeners();
  };

  submitFalse = () => {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._disabledButtonClass);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

}
