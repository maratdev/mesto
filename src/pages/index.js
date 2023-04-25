import './index.css';
// --------------------------------------------IMPORTANT
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import {object} from '../utils/constants.js';

// -------------------------------------------------------------------------------------------- POPUP редактирования профиля
const sectionProfile = document.querySelector('.profile')
const profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
  profileName = sectionProfile.querySelector('.profile__name'),
  profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),
  // форма в popup_edit-user
  popupProfileEdit = document.querySelector('.popup_edit-user');

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileSubtitle
});


const popupOpenEdit = new PopupWithForm(popupProfileEdit, (data) => {
  return api.saveDataInfo(data)
    .then((result) => {
      userInfo.setUserInfo({ name: result.name, job: result.about });
      popupOpenEdit.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupOpenEdit.close();
    });

});
popupOpenEdit.setEventListeners();

profileEdit.addEventListener("click", () => {
  popupOpenEdit.open();
  const userInfoGet = userInfo.getUserInfo();
  popupOpenEdit.setInputValues(userInfoGet);
  validPopupEditForm.resetValidation()
});

// -------------------------------------------------------------------------------------------- POPUP УДАЛЕНИЯ КАРТОЧКИ
const popupDelCard = document.querySelector('.popup_del-card'),
  popupConfirm = new PopupWithConfirm(popupDelCard);
popupConfirm.setEventListeners();

// -------------------------------------------------------------------------------------------- POPUP СОЗДАНИЯ НОВОЙ КАРТОЧКИ
const formCardEdit = sectionProfile.querySelector('.profile__add-btn');
  // форма в popup_add-card

function createCard(data) {
  const cards = new Card(data, '#elements__items', handleCardClick, userId,{
    handleCardDelete: () => {
      const sendCard = () => {
       return api.deleteCard(cards.cardId)
          .then(() => {
            cards.deleteCard();
            popupConfirm.close();
          })
          .catch((err) => console.log(err));
      }
      popupConfirm.open();
      popupConfirm.setCallbackConfirm(sendCard);
    },
      handleAddLike: () => {
        api.addLike(cards.cardId)
          .then((result) => cards.switchLikes(result.likes))
          .catch((err) => console.log(err));
      },
      handleDeleteLike: () => {
        api.deleteLike(cards.cardId)
          .then((result) => cards.switchLikes(result.likes))
          .catch((err) => console.log(err)
          );
      },
    }),

  cardElement = cards.generateCard();
  return cardsList.addItem(cardElement);
}

const popupCardAdd = document.querySelector('.popup_add-card');
//функция-обработчик
const handleEditCard = new PopupWithForm(popupCardAdd, (data) => {
  return api.saveCardInfo(data)
    .then((result) => {
      createCard(result)
      handleEditCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      handleEditCard.close();
    });

});
handleEditCard.setEventListeners();
// для отладки https://source.unsplash.com/collection/220381/

// слушаем события
formCardEdit.addEventListener("click", () => {
  handleEditCard.open()
  validPopupCardForm.resetValidation()
});

// --------------------------------------------------------------------------------------------ГЕНЕРАЦИЯ ELEMENTS из TEMPLATE
const cardUlList = document.querySelector(".elements__grids");
//Section
const cardsList = new Section({renderer: (data) => createCard(data)}, cardUlList);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '145c396a-49e7-4abb-9010-fec05cae083b',
    'Content-Type': 'application/json;  character=UTF-8',
  }
})
let userId;
Promise.all([api.getDataUser(), api.getInitialCards()])
  .then((result) => {
    const [userData, initialCards, ] = result;
    userId = userData._id
    //console.log('index.js -> userId: ' + userId);
    cardsList.renderItems(initialCards);
    userInfo.setUserInfo({ name: userData.name, job: userData.about, userId: userData._id});
    userInfo.setUserAvatar(userData.avatar);
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

// --------------------------------------------------------------------------------------------POPUP UPDATE AVATAR
const profileAvaBtn = document.querySelector('.profile__avatar-btn');
      profileAvaBtn.addEventListener("click", () => popupUpdateAvatar.open());

const popupUpdAvatar = document.querySelector('.popup_upd-avatar'),
      popupUpdateAvatar = new PopupWithForm(popupUpdAvatar, (data) => {
       return api.saveDataProfile(data)
          .then((result) => {
            userInfo.setUserAvatar(result.avatar);
            popupUpdateAvatar.close();
          })
          .catch((err) => console.log(err))
      });
    popupUpdateAvatar.setEventListeners();


// -------------------------------------------------------------------------------------------- Валидация

const validPopupEditForm = new FormValidator(object, popupProfileEdit);
validPopupEditForm.enableValidation();


const validPopupCardForm = new FormValidator(object, popupCardAdd);
validPopupCardForm.enableValidation();

const validPopupAvatarForm = new FormValidator(object, popupUpdAvatar);
validPopupAvatarForm.enableValidation();


