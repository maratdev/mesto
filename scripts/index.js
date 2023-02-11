// Лайки в секции elements
let itemCollection = document.querySelectorAll('.items .elements__like');
  itemCollection.forEach(item => item.addEventListener('click', function(){
    item.classList.toggle('elements__like_active');
    })
);


// --------------------------------------------------------------------------------------------POPUP
let profileEdit = document.querySelector('.profile__edit-btn'),
    profileName = document.querySelector('.profile__name'),
    profileSubtitle = document.querySelector('.profile__subtitle'),
    popupProfileEdit = document.querySelector('.popup'),
    nameInput = popupProfileEdit.querySelector('input[name="user_name"]'),
    jobInput = popupProfileEdit.querySelector('input[name="user_job"]');


// Открытие POPUP при клике popup_opened
profileEdit.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupProfileEdit.classList.add('popup_opened');
  document.body.style.overflow = "hidden";
});

// Закрывание POPUP при клике X
document.addEventListener('click', function (e) {
  // Закрывание POPUP при клике снаружи его
  if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close')){
    popupProfileEdit.classList.remove('popup_opened');
    document.body.removeAttribute("style");
  }
});

// Закрывание POPUP при нажатии ESC
document.addEventListener('keydown', function(e) {
  if (e.code == "Escape"){
    popupProfileEdit.classList.remove('popup_opened');
  }
});

// --------------------------------------------------------------------------------------------POPUP -> form

//Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupProfileEdit.classList.remove('popup_opened');
  document.body.removeAttribute("style");
}

popupProfileEdit.addEventListener('submit', handleFormSubmit);





