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

let formElement = document.querySelector('#save').addEventListener('click', formSubmitHandler);
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameInput = document.querySelector('#name').value;
  jobInput = document.querySelector('#job').value;
  formElement = document.querySelector('#save');

  console.log(nameInput);
  console.log(jobInput);

  document.querySelector('.profile__name').textContent = nameInput;
  document.querySelector('.profile__activity').textContent = jobInput;
  popap.classList.remove('popap_is-active');
}

formElement.addEventListener('submit', formSubmitHandler);
