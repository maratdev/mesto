const sectionProfile = document.querySelector('.profile')

// Функция открытия модальных окон
const handleClickModalOpen = (popupName) => {
  popupName.classList.add('popup_opened');
}

// Функция закрывания POPUP при клике X
const handleClickModalClose = (popupName) =>  {
  popupName.classList.remove('popup_opened');
}


// -------------------------------------------------------------------------------------------- POPUP редактировать профиль
  let profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
      profileName = sectionProfile.querySelector('.profile__name'),
      profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),

      popupProfileEdit = document.querySelector('.popup_edit-user'),
      closeInput = popupProfileEdit.querySelector('.popup__close'),
      nameInput = popupProfileEdit.querySelector('.popup__input_string_name'),
      jobInput = popupProfileEdit.querySelector('.popup__input_string_job'),
      formEdit = popupProfileEdit.querySelector('.popup__form_edit');

// Закрывание POPUP при клике X
function openProfileEdit(popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  handleClickModalOpen(popup);
}

//Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  handleClickModalClose(popupProfileEdit);
}

formEdit.addEventListener('submit', handleFormSubmit);
profileEdit.addEventListener('click', () => openProfileEdit(popupProfileEdit))
closeInput.addEventListener('click', () => handleClickModalClose(popupProfileEdit))

// -------------------------------------------------------------------------------------------- Popup добавление новой карточки
cardEdit = sectionProfile.querySelector('.profile__add-btn')


// --------------------------------------------------------------------------------------------ELEMENTS TEMPLATE

let ulList = document.querySelector('.elements__grids')
let template = document.querySelector('#elements__items').content



function printCards (data) {
  data.forEach((item) => {
    template.querySelector('.card__item').src = item.link;
    template.querySelector('.card__item').alt = item.name;
    template.querySelector('.card__title').textContent = item.name;
    let clone = template.cloneNode(true)
    ulList.append(clone);
  })
}

printCards(initialCards);
















