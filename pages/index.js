//@TODO: Удалить ссылку с index.html

// --------------------------------------------IMPORTANT
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
// -------------------------------------
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

const popupsAll = document.querySelectorAll('.popup');
const sectionProfile = document.querySelector('.profile')

// Функция открытия модальных окон
const openModal = (popupName) => {
  const openModal = new Popup(popupName);
  openModal.open()
}
// Функция закрывания модальных окон при клике X
const closeModal = (popupName) =>  {
  const closeModal = new Popup(popupName);
  closeModal.close()
}

// Функция закрывания модальных окон при клике вне его
popupsAll.forEach((overlayPopup) => {
  const popup = new Popup(overlayPopup);
  popup.setEventListeners();
});

// -------------------------------------------------------------------------------------------- POPUP редактирования профиля
const profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
  profileName = sectionProfile.querySelector('.profile__name'),
  profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),
  // форма в popup_edit-user
  popupProfileEdit = document.querySelector('.popup_edit-user'),
  nameInput = popupProfileEdit.querySelector('.form__input_string_name'),
  jobInput = popupProfileEdit.querySelector('.form__input_string_job'),
  formEdit = popupProfileEdit.querySelector('.form_edit-user');


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
  popupCardInputSrc = popupCardAdd.querySelector('.form__input_string_src');

function createCard(card){
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

//функция-обработчик
function handleEditCard(evt) {
  // сбрасываем стандартное поведение формы
  evt.preventDefault();

  const card = new Card( popupCardInputPlace.value, popupCardInputSrc.value, '#elements__items', initImageModalOpen)
  // Добавляем в DOM
  createCard(card)
  // закрытие popup
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
const cardUlList = document.querySelector(".elements__grids");
// Section

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cards = new Card(item.name, item.link, '#elements__items', initImageModalOpen);
    const cardElement = cards.generateCard();
    cardsList.addItem(cardElement);
  }
  }, cardUlList);

  cardsList.renderItems();

// --------------------------------------------------------------------------------------------POPUP CARD IMG

//-------------------------------------функция для открытия модального окна по клику на картинку
const popupImg = document.querySelector('.popup_img-card'),
      popupOpenImage = new PopupWithImage(popupImg);


//popup открытия изображения
function initImageModalOpen(name, link){
  popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();
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



