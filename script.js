let editButton = document.querySelector('.edit-button');
let popap = document.querySelector('.popap');
let popapCloseButton = document.querySelector('.popap__close');

function openPopap(event) {
  popap.classList.add('popap_is-active');
}

editButton.addEventListener('click', openPopap);
popapCloseButton.addEventListener('click', function() {
  popap.classList.remove('popap_is-active');
})

