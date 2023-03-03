// --------------------------------------------------------------------------------------------POPUP
let profileEdit = document.querySelector('.profile__edit-btn'),
    profileName = document.querySelector('.profile__name'),
    profileSubtitle = document.querySelector('.profile__subtitle'),

    popupProfileEdit = document.querySelector('.popup'),
    closeInput = popupProfileEdit.querySelector('.popup__close'),
    nameInput = popupProfileEdit.querySelector('.popup__input_string_name'),
    jobInput = popupProfileEdit.querySelector('.popup__input_string_job'),
    form = popupProfileEdit.querySelector('.popup__form');


// Открытие POPUP при клике popup_opened
function openToClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupProfileEdit.classList.add('popup_opened');
}

// Закрывание POPUP при клике X
function closeToClick() {
  popupProfileEdit.classList.remove('popup_opened');
}

// --------------------------------------------------------------------------------------------POPUP -> form

//Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeToClick();
}

form.addEventListener('submit', handleFormSubmit);
profileEdit.addEventListener('click', openToClick)
closeInput.addEventListener('click', closeToClick)

// --------------------------------------------------------------------------------------------ELEMENTS TEMPLATE


// //получить содержимое
// let elementsTemplate = document.querySelector('#elements__items').content.querySelector('.elements__items');
// // клонируем содержимое тега template
// let cardsContainer = document.querySelector('.elements__grids');

// //функция генерации карточки
// let generateCard = (dataCard) => {
//   let newCard = elementsTemplate.cloneNode(true),
//       imgLink = newCard.querySelector('.card__item'),
//       imgName = newCard.querySelector('.card__title')
//
//   imgLink.src = dataCard.link
//   imgName.textContent = dataCard.name
//
//   return newCard
// }
//
// //функция отрисовки карточки методом
// let renderCard = (dataCard) => {
//   cardsContainer.append(generateCard(dataCard))
// }
//
// initialCards.forEach((dataCard) => {
//   renderCard(dataCard)
// })


let ulList = document.querySelector('.elements__grids')
let template = document.querySelector('#elements__items').content


initialCards.forEach((item) => {
  template.querySelector('.card__item').src = item.link;
  template.querySelector('.card__title').textContent = item.name;
  let clone = template.cloneNode(true)
  ulList.append(clone);
})
















