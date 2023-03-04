const sectionProfile = document.querySelector('.profile')

// Функция открытия модальных окон
const handleClickModalOpen = (popupName) => {
  popupName.classList.add('popup_opened');
}

// Функция закрывания модальных окон при клике X
const handleClickModalClose = (popupName) =>  {
  popupName.classList.remove('popup_opened');
}


// -------------------------------------------------------------------------------------------- POPUP редактировать профиль
let profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
    profileName = sectionProfile.querySelector('.profile__name'),
    profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),
    // форма в popup_edit-user
    popupProfileEdit = document.querySelector('.popup_edit-user'),
    closeInput = popupProfileEdit.querySelector('.popup__close'),
    nameInput = popupProfileEdit.querySelector('.popup__input_string_name'),
    jobInput = popupProfileEdit.querySelector('.popup__input_string_job'),
    formEdit = popupProfileEdit.querySelector('.popup__form_edit');


  function openProfileEdit(popup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
    handleClickModalOpen(popup);
  }

  //Обработчик «отправки» формы
  function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    handleClickModalClose(popupProfileEdit);
  }

  formEdit.addEventListener('submit', handleProfileFormSubmit);
  profileEdit.addEventListener('click', () => openProfileEdit(popupProfileEdit))
  closeInput.addEventListener('click', () => handleClickModalClose(popupProfileEdit))

// -------------------------------------------------------------------------------------------- POPUP добавление новой карточки

let formCardEdit = sectionProfile.querySelector('.profile__add-btn'),
    // форма в popup_add-card
    popupCardEdit = document.querySelector('.popup_add-card'),
    popupCardClose = popupCardEdit.querySelector('.popup__close'),
    popupCardForm = popupCardEdit.querySelector('.popup__form_add');
    popupCardInputPlace = popupCardEdit.querySelector('.popup__input_string_place'),
    popupCardInputSrc = popupCardEdit.querySelector('.popup__input_string_src');


//Обработчик «отправки» формы
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  // клонируем содержимое тега template
  let userElement = template.querySelector('.elements__items').cloneNode(true);
  // добавляем из формы
  userElement.querySelector('.card__title').textContent = popupCardInputPlace.value;
  userElement.querySelector('.card__item').src = popupCardInputSrc.value;
  // Инициализируем отслеживания клика на лайк
  clickLikeCard(userElement)
  // Инициализируем селектор для отслеживания клика на удаление
  handleClickDeleteCard (userElement);
  // Инициализируем селектор для открытия popup
  handleClickModalClose(popupCardEdit);
  // вставляем новый элемент в начало узла
  cardUlList.prepend(userElement);
  // чистим форму
  evt.target.reset();
}
// для отладки https://source.unsplash.com/collection/220381/

  popupCardForm.addEventListener('submit', handleCardFormSubmit);
  formCardEdit.addEventListener('click', () => handleClickModalOpen(popupCardEdit));
  popupCardClose.addEventListener('click', () => handleClickModalClose(popupCardEdit));


// --------------------------------------------------------------------------------------------ELEMENTS TEMPLATE
// клонируем содержимое тега template
let template = document.querySelector('#elements__items').content;
let cardUlList = document.querySelector('.elements__grids');

// проходим по массиву для генерации карточки
function printCards (data) {
  data.forEach((item) => {
    template.querySelector('.card__item').src = item.link;
    template.querySelector('.card__item').alt = item.name;
    template.querySelector('.card__title').textContent = item.name;
    let clone = template.cloneNode(true);

    handleClickDeleteCard (clone);
    clickLikeCard(clone)
    // вставляем новый элемент в начало узла
    cardUlList.prepend(clone)

  })
}
printCards(initialCards);

// --------------------------------------------------------------------------------------------Карточка CARD в ELEMENTS

// ----------------Отлавливаем вновь добавленный элемент
function handleClickLikeCard (evt){
  evt.target.classList.toggle('card__like_active')
}

function clickLikeCard(element) {
  let likeCard = element.querySelector('.card__like');
  likeCard.addEventListener('click', handleClickLikeCard);
}
// --------------Удалить карточку elements -> card
function clickDeleteCard (evt) {
  evt.target.closest('.elements__items').remove()
}

function handleClickDeleteCard (node) {
  let cardDeleteBtn = node.querySelector('.card__trash')
  cardDeleteBtn.addEventListener('click', clickDeleteCard)
}












