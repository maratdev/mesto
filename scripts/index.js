const sectionProfile = document.querySelector('.profile')
// Функция открытия модальных окон
const modalOpen = (popupName) => {
  popupName.classList.add('popup_opened');
}
// Функция закрывания модальных окон при клике X
const modalClose = (popupName) =>  {
  popupName.classList.remove('popup_opened');
}
// клонируем содержимое тега template
let template = document.querySelector('#elements__items').content;
let cardUlList = document.querySelector('.elements__grids');

// -------------------------------------------------------------------------------------------- POPUP редактирования профиля
const profileEdit = sectionProfile.querySelector('.profile__edit-btn'),
    profileName = sectionProfile.querySelector('.profile__name'),
    profileSubtitle = sectionProfile.querySelector('.profile__subtitle'),
    // форма в popup_edit-user
    popupProfileEdit = document.querySelector('.popup_edit-user'),
    popupProfileCloseButton = popupProfileEdit.querySelector('.popup__close'),
    nameInput = popupProfileEdit.querySelector('.popup__input_string_name'),
    jobInput = popupProfileEdit.querySelector('.popup__input_string_job'),
    formEdit = popupProfileEdit.querySelector('.popup__form_edit');


  function openProfileEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
    modalOpen(popupProfileEdit);
  }

  //Обработчик «отправки» формы
  function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    modalClose(popupProfileEdit);
  }


  formEdit.addEventListener('submit', handleProfileFormSubmit);
  profileEdit.addEventListener('click', () => openProfileEdit(popupProfileEdit))
  popupProfileCloseButton.addEventListener('click', () => modalClose(popupProfileEdit))

// -------------------------------------------------------------------------------------------- POPUP СОЗДАНИЯ НОВОЙ КАРТОЧКИ
let formCardEdit = sectionProfile.querySelector('.profile__add-btn'),
    // форма в popup_add-card
    popupCardAdd = document.querySelector('.popup_add-card'),
    popupCardClose = popupCardAdd.querySelector('.popup__close'),
    popupCardForm = popupCardAdd.querySelector('.popup__form_add'),
    popupCardInputPlace = popupCardAdd.querySelector('.popup__input_string_place'),
    popupCardInputSrc = popupCardAdd.querySelector('.popup__input_string_src');


//функция-обработчик 'submit' для addCard
  function cardFormSubmit(evt) {
    // сбрасываем стандартное поведение формы
    evt.preventDefault();
    renderCard({name: popupCardInputPlace.value, link: popupCardInputSrc.value})
    modalClose(popupCardAdd)
    // чистим форму
    evt.target.reset();
  }


// для отладки https://source.unsplash.com/collection/220381/

// слушаем события
  popupCardForm.addEventListener('submit',  cardFormSubmit);
  formCardEdit.addEventListener('click', () => modalOpen(popupCardAdd));
  popupCardClose.addEventListener('click', () => modalClose(popupCardAdd));


// --------------------------------------------------------------------------------------------ГЕНЕРАЦИЯ ELEMENTS из TEMPLATE

// Перебор массива с данными
initialCards.forEach((dataCard) => {
  renderCard(dataCard)
})

// выводим данные из массива
function printCards (dataCard) {
    const newElement = template.querySelector('.elements__items').cloneNode(true);
    newElement.querySelector('.card__item').src = dataCard.link;
    newElement.querySelector('.card__item').alt = dataCard.name;
    newElement.querySelector('.card__title').textContent = dataCard.name;
    // Инициализируем popup открытия изображения
    cardUlListImg(newElement);
    // Инициализируем селектор для отслеживания клика на удаление
    handleClickDeleteCard(newElement);
    // Инициализируем отслеживания клика на лайк
    initLikeCard(newElement);
    // вставляем новый элемент в начало узла
    return newElement;
}

// функция отрисовки карточки методом prepend()
function renderCard (dataCard) {
  cardUlList.prepend(printCards(dataCard));
}

// --------------------------------------------------------------------------------------------Карточка CARD в ELEMENTS (удалить, поставить лайк)

// ----------------Отлавливаем вновь добавленный элемент
function handleClickLikeCard (evt){
  evt.target.classList.toggle('card__like_active')
}

function initLikeCard(element) {
  let likeCard = element.querySelector('.card__like');
  likeCard.addEventListener('click', handleClickLikeCard);
}
// --------------Удалить карточку elements -> card
function initDeleteCard (evt) {
  evt.target.closest('.elements__items').remove()
}

function handleClickDeleteCard (node) {
  let cardDeleteBtn = node.querySelector('.card__trash')
  cardDeleteBtn.addEventListener('click', initDeleteCard)
}

// --------------------------------------------------------------------------------------------POPUP CARD IMG

//-------------------------------------функция для открытия модального окна по клику на картинку
let popupImg = document.querySelector('.popup_img-card'),
    popupCloseImg = popupImg.querySelector('.popup__close')

let popupZoomImg = popupImg.querySelector('.popup__zoom-image'),
    popupZoomTitle = popupImg.querySelector('.popup__zoom-title')

popupCloseImg.addEventListener('click', (evt) =>{
  popupImg.classList.remove('popup_opened')
})


function handleClickImageModal(evt)  {
  let imgSrc = evt.target.getAttribute('src'),
      imgAlt = evt.target.getAttribute('alt')

  popupZoomImg.setAttribute('src', imgSrc)
  popupZoomImg.setAttribute('alt', imgAlt)
  popupZoomTitle.textContent = imgAlt

  modalOpen(popupImg)
}
// popup открытия изображения
function cardUlListImg(node){
  let cardUlListImg = node.querySelector('.card__item');
  cardUlListImg.addEventListener('click', handleClickImageModal)
}












