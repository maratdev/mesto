import './index.css';
// --------------------------------------------IMPORTANT
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards, object} from '../utils/constants.js';

// -------------------------------------------------------------------------------------------- POPUP редактирования профиля
const sectionProfile = document.querySelector('.profile')
const profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
  profileName = sectionProfile.querySelector('.profile__name'),
  profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),
  // форма в popup_edit-user
  popupProfileEdit = document.querySelector('.popup_edit-user'),
  nameInput = popupProfileEdit.querySelector('.form__input_string_name'),
  jobInput = popupProfileEdit.querySelector('.form__input_string_job');

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileSubtitle
});

profileEdit.addEventListener("click", () => {
  popupOpenEdit.open();
  const userInfoGet = userInfo.getUserInfo();
  nameInput.value = userInfoGet.name;
  jobInput.value = userInfoGet.job;
});

const popupOpenEdit = new PopupWithForm(popupProfileEdit, (data) => {
  userInfo.setUserInfo(data);
  popupOpenEdit.close();
});
popupOpenEdit.setEventListeners();


// -------------------------------------------------------------------------------------------- POPUP СОЗДАНИЯ НОВОЙ КАРТОЧКИ
const formCardEdit = sectionProfile.querySelector('.profile__add-btn'),
  // форма в popup_add-card
  popupCardAdd = document.querySelector('.popup_add-card');

function createCard(data) {
  const cards = new Card(data, '#elements__items', handleCardClick),
        cardElement = cards.generateCard();
  return cardsList.addItem(cardElement);
}

//функция-обработчик
const handleEditCard = new PopupWithForm(popupCardAdd, (data) => {
  createCard({name: data.card_name, link: data.card_src});
  handleEditCard.close();
  validPopupCardForm.resetValidation();
});
handleEditCard.setEventListeners();
// для отладки https://source.unsplash.com/collection/220381/

// слушаем события
formCardEdit.addEventListener("click", () => {
  handleEditCard.open();
});

// --------------------------------------------------------------------------------------------ГЕНЕРАЦИЯ ELEMENTS из TEMPLATE
const cardUlList = document.querySelector(".elements__grids");
//Section
const cardsList = new Section({renderer: (data) => createCard(data)}, cardUlList);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/cards',
  headers: {
    authorization: '145c396a-49e7-4abb-9010-fec05cae083b',
    'Content-Type': 'application/json;  character=UTF-8',
  }
})

Promise.all([api.getDataUser(), api.getInitialCards()])
  .then((result) => {
    const [userData, initialCards] = result;
    console.log(result);
    cardsList.renderItems(initialCards);
  })
  .catch(error => console.error(error.message))




// --------------------------------------------------------------------------------------------POPUP CARD IMG

//функция для открытия модального окна по клику на картинку
const popupImg = document.querySelector('.popup_img-card'),
      popupOpenImage = new PopupWithImage(popupImg);

//popup открытия изображения
function handleCardClick(name, link){
  popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();
// -------------------------------------------------------------------------------------------- Валидация

const validPopupEditForm = new FormValidator(object, popupProfileEdit);
validPopupEditForm.enableValidation();
validPopupEditForm.submitFalse();

const validPopupCardForm = new FormValidator(object, popupCardAdd);
validPopupCardForm.enableValidation();


