// Лайки в секции elements
let itemCollection = document.querySelectorAll('.elements__items .elements__like');
  itemCollection.forEach(item => item.addEventListener('click', function(){
    item.classList.toggle('elements__like_active');
    })
);


// --------------------------------------------------------------------------------------------POPUP
let popupProfileEdit = document.querySelector('.popup'),
    profileEdit = document.querySelector('.profile__edit-btn'),
    popupProfileEditClose = popupProfileEdit.querySelector('.popup__close'),
    profileName = document.querySelector('.profile__name'),
    profileSubtitle = document.querySelector('.profile__subtitle'),
    nameInput = popupProfileEdit.querySelector('input[name="user_name"]'),
    jobInput = popupProfileEdit.querySelector('input[name="user_job"]');


// Открытие POPUP при клике popup_opened
profileEdit.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupProfileEdit.classList.add('popup_opened');
  document.body.style.overflow = "hidden";
});

// Закрывания POPUP при клике X
document.addEventListener('click', function (e) {
  // Закрывания POPUP при клике снаружи его
  if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close')){
    popupProfileEdit.classList.remove('popup_opened');
    document.body.style.overflow = "auto";
  }
});

// Закрывания POPUP при нажатии ESC
document.addEventListener('keydown', function(e) {
  if (e.code == "Escape"){
    popupProfileEdit.classList.remove('popup_opened');
  }
});

// --------------------------------------------------------------------------------------------POPUP -> form

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupProfileEdit.classList.remove('popup_opened');
}

popupProfileEdit.addEventListener('submit', handleFormSubmit);





