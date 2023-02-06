let itemCollection = document.querySelectorAll('.elements__items .elements__like');
  itemCollection.forEach(item => item.addEventListener('click', function(){
    item.classList.toggle('elements__like_active');
    })
);


