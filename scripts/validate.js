const object = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitSelector: '.form__input-btn',
  disabledButtonClass: 'form__input-btn_disabled',
  errorClass: 'form__span-error',
  inputErrorClass: 'form__input-error',
};

function disabledSubmit(evt) {
  evt.preventDefault();
}

//Добавляет обработчики сразу всем полям формы
const setEventListeners = (object, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector)
  );
  // Находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(object.submitSelector);
  //Вызываем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(object, inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(object, formElement, inputElement);
      //Вызываем toggleButtonState и передача ей массива полей и кнопки
      toggleButtonState(object, inputList, buttonElement);
    });
  });
};

// Добавляем класс с ошибкой.
const showInputError = (object, formElement, inputElement, errorMessage) => {
  // находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
  errorElement.classList.add(object.errorClass); // Замена содержимого span с ошибкой на переданный параметр
};

// Удаляем класс с ошибкой
const hideInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.add(object.errorClass);
  errorElement.textContent = '';
};

// Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Делаем кнопку отправки неактивной
const disabledSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.add(object.disabledButtonClass);
  buttonElement.disabled = true;
};
// Активной
const activeSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.remove(object.disabledButtonClass);
  buttonElement.disabled = false;
};

// Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { //если хотя бы один невалидный инпут, кнопка неактивна
    disabledSubmitBtm(object, buttonElement);
  } else {
    activeSubmitBtm(object, buttonElement);
  }
};

// formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
// Функция, которая проверяет валидность поля
const isValid = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
// Если поле не проходит валидацию, покажем ошибку
    showInputError(object, formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(object, formElement, inputElement);
  }
};


// Переберем все формы на странице и добавим всем формам обработчик
const enableValidation = (object) => {
  // Найдём все формы
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', disabledSubmit);
    // Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы
    setEventListeners(object, formElement);
  });
};

// Вызовем функцию
enableValidation(object);
