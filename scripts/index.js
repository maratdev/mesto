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





