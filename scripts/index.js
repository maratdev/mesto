// --------------------------------------------IMPORTANT
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
// -------------------------------------
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

const popupsAll = document.querySelectorAll('.popup');
const sectionProfile = document.querySelector('.profile')

// Функция открытия модальных окон
const openModal = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
// Функция закрывания модальных окон при клике X
const closeModal = (popupName) =>  {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
// Функция закрывания модальных окон при клике ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closeModal(openedPopup);
  }
}
// Функция закрывания модальных окон при клике вне его
popupsAll.forEach((overlayPopup) => {
  overlayPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(overlayPopup);
    }
  });
});

// -------------------------------------------------------------------------------------------- POPUP редактирования профиля
const profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
  profileName = sectionProfile.querySelector('.profile__name'),
  profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),
  // форма в popup_edit-user
  popupProfileEdit = document.querySelector('.popup_edit-user'),
  popupProfileCloseButton = popupProfileEdit.querySelector('.popup__close'),
  nameInput = popupProfileEdit.querySelector('.form__input_string_name'),
  jobInput = popupProfileEdit.querySelector('.form__input_string_job'),
  formEdit = popupProfileEdit.querySelector('.form_edit-user'),
  formEditBtn = popupProfileEdit.querySelector('.form__input-btn');


function openProfileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  openModal(popupProfileEdit);
}

//Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeModal(popupProfileEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);
profileEdit.addEventListener('click', () => openProfileEdit(popupProfileEdit))
// обработчики крестиков
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});


// -------------------------------------------------------------------------------------------- POPUP СОЗДАНИЯ НОВОЙ КАРТОЧКИ
const formCardEdit = sectionProfile.querySelector('.profile__add-btn'),
  // форма в popup_add-card
  popupCardAdd = document.querySelector('.popup_add-card'),
  popupCardClose = popupCardAdd.querySelector('.popup__close'),
  popupCardForm = popupCardAdd.querySelector('.form_add-card'),
  popupCardInputPlace = popupCardAdd.querySelector('.form__input_string_place'),
  popupCardInputSrc = popupCardAdd.querySelector('.form__input_string_src'),
  popupCardInputBtn = popupCardAdd.querySelector('.form__input-btn');


//функция-обработчик
function handleEditCard(evt) {
  // сбрасываем стандартное поведение формы
  evt.preventDefault();
  const card = createCard({name: popupCardInputPlace.value, link: popupCardInputSrc.value})
  // Добавляем в DOM
  renderCard (card)
  closeModal(popupCardAdd)
  // чистим форму
  evt.target.reset();
  validPopupCardForm.resetValidation();
}
// для отладки https://source.unsplash.com/collection/220381/

// слушаем события
popupCardForm.addEventListener('submit',  handleEditCard);
formCardEdit.addEventListener('click', () => openModal(popupCardAdd));
popupCardClose.addEventListener('click', () => closeModal(popupCardAdd));

// --------------------------------------------------------------------------------------------ГЕНЕРАЦИЯ ELEMENTS из TEMPLATE
function showInitialCards() {
  // Перебор массива с данными
  initialCards.forEach((dataCard) => {
    const cardElement = createCard(dataCard);
    // Добавляем в DOM
    renderCard (cardElement)
  });
}
showInitialCards();

function createCard(data) {
  const cards = new Card(data.name, data.link, '#elements__items', initImageModalOpen);
  // Создаём карточку и возвращаем
  return cards.generateCard();
}

// функция отрисовки карточки методом prepend()
function renderCard (node) {
  const cardUlList = document.querySelector(".elements__grids");
  cardUlList.prepend(node);
}

// --------------------------------------------------------------------------------------------POPUP CARD IMG

//-------------------------------------функция для открытия модального окна по клику на картинку
const popupImg = document.querySelector('.popup_img-card'),
      popupCloseImg = popupImg.querySelector('.popup__close')

const popupZoomImg = popupImg.querySelector('.popup__zoom-image'),
      popupZoomTitle = popupImg.querySelector('.popup__zoom-title')

popupCloseImg.addEventListener('click', (evt) =>{
  closeModal(popupImg)
})

//popup открытия изображения
function initImageModalOpen(name, link){
  openModal(popupImg);
  popupZoomImg.src = link;
  popupZoomImg.alt = name;
  popupZoomTitle.textContent = name;
}

// -------------------------------------------------------------------------------------------- Валидация

const object = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitSelector: '.form__input-btn',
  disabledButtonClass: 'form__input-btn_disabled',
  errorClass: 'form__span-error',
  inputErrorClass: 'form__input-error',
};

const validPopupEditForm = new FormValidator(object, popupProfileEdit);
validPopupEditForm.enableValidation();
validPopupEditForm.submitFalse();


const validPopupCardForm = new FormValidator(object, popupCardAdd);
validPopupCardForm.enableValidation();



