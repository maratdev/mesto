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
  document.addEventListener('keydown', closeByEscape);
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
  formEditBtn.classList.remove('form__input-btn_disabled');
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
popupProfileCloseButton.addEventListener('click', () => closeModal(popupProfileEdit))


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
  renderCard({name: popupCardInputPlace.value, link: popupCardInputSrc.value})
  closeModal(popupCardAdd)
  // чистим форму
  evt.target.reset();
  evt.submitter.classList.add('form__input-btn_disabled')
  evt.submitter.disabled = true;
}

// для отладки https://source.unsplash.com/collection/220381/

// слушаем события
popupCardForm.addEventListener('submit',  handleEditCard);
formCardEdit.addEventListener('click', () => openModal(popupCardAdd));
popupCardClose.addEventListener('click', () => closeModal(popupCardAdd));

// --------------------------------------------------------------------------------------------ГЕНЕРАЦИЯ ELEMENTS из TEMPLATE
// клонируем содержимое тега template
const template = document.querySelector('#elements__items').content;
const cardUlList = document.querySelector('.elements__grids');

// Перебор массива с данными
initialCards.forEach((dataCard) => {
  renderCard(dataCard)
})

// выводим данные из массива
function createCard (dataCard) {
  const newElement = template.querySelector('.elements__items').cloneNode(true);
  newElement.querySelector('.card__item').src = dataCard.link;
  newElement.querySelector('.card__item').alt = dataCard.name;
  newElement.querySelector('.card__title').textContent = dataCard.name;
  // Инициализируем popup открытия изображения
  initImageModalOpen(newElement);
  // Инициализируем селектор для отслеживания клика на удаление
  initDeleteCard(newElement);
  // Инициализируем отслеживания клика на лайк
  initLikeCard(newElement);
  // вставляем новый элемент в начало узла
  return newElement;
}

// функция отрисовки карточки методом prepend()
function renderCard (dataCard) {
  cardUlList.prepend(createCard(dataCard));
}

// --------------------------------------------------------------------------------------------Карточка CARD в ELEMENTS (удалить, поставить лайк)

// ----------------Отлавливаем вновь добавленный элемент
function clickLikeCard (evt){
  evt.target.classList.toggle('card__like_active')
}

function initLikeCard(element) {
  const likeCard = element.querySelector('.card__like');
  likeCard.addEventListener('click', clickLikeCard);
}
// --------------Удалить карточку elements -> card
function clickDeleteCard (evt) {
  evt.target.closest('.elements__items').remove()
}

function initDeleteCard (node) {
  const cardDeleteBtn = node.querySelector('.card__trash')
  cardDeleteBtn.addEventListener('click', clickDeleteCard)
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


function openImageModal(evt)  {
  const imgSrc = evt.target.getAttribute('src'),
    imgAlt = evt.target.getAttribute('alt')

  popupZoomImg.setAttribute('src', imgSrc)
  popupZoomImg.setAttribute('alt', imgAlt)
  popupZoomTitle.textContent = imgAlt
  openModal(popupImg)
}
// popup открытия изображения
function initImageModalOpen(node){
  const cardUlListImg = node.querySelector('.card__item');
  cardUlListImg.addEventListener('click', openImageModal)
}

