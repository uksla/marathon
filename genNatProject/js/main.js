const UI_ELEMENTS = {
  inputElement: document.querySelector('.gen-project__form-input'),
  formElement: document.querySelector('.gen-project__form')
}

let gender = undefined;
let nationality = undefined;
let nameValue = undefined;

UI_ELEMENTS.formElement.addEventListener('submit', sendRequest)

function sendRequest() {
  nameValue = UI_ELEMENTS.inputElement.value;
  nameValue.trim();
  console.log(nameValue);

  if (nameValue === '') {
    return
  } else {
      let promisGen = new Promise(function (resolve, reject) {
        resolve(
          getGender()
          .then(data => gender = data.gender)
          .catch(err => console.log(err))
        )
      })

      let promisNat = new Promise(function(resolve, reject) {
        resolve(
          getNationality()
          .then((data) => nationality = data.country[0].country_id)
        )
      })

      Promise.all([promisGen, promisNat])
        .then(
          () => addData()
        )
        .then(
          () => resetInput()
        )
    }
}

function getGender() {
  const firstName = nameValue;
  const serverUrl = 'https://api.genderize.io';
  const requestURL = `${serverUrl}?name=${firstName}`;

  return fetch(requestURL).then(response => {
    return response.json()
  })
}

function getNationality() {
  const firstName = nameValue;
  const serverUrl = 'https://api.nationalize.io';
  const requestURL = `${serverUrl}?name=${firstName}`;

  return fetch(requestURL).then(response => {
    return response.json()
  })
}

function addData() {
  addPUIElements();
  const isNotValid = (gender === null) || (nationality === null);

  if (isNotValid) {
    UI_ELEMENTS.genderElement.textContent = 'Can\'t determine the gender';
    UI_ELEMENTS.nationalityElement.textContent = 'Can\'t determine the nationality';
  } else {
      UI_ELEMENTS.nameElement.textContent = nameValue;
      UI_ELEMENTS.genderElement.textContent = gender;
      UI_ELEMENTS.nationalityElement.textContent = nationality;
  }
}

function resetInput() {
  UI_ELEMENTS.inputElement.value = '';
}

function addPUIElements() {
  UI_ELEMENTS.nameElement = document.querySelector('.gen-project__table-info p:nth-child(1)');
  UI_ELEMENTS.genderElement = document.querySelector('.gen-project__table-info p:nth-child(2)');
  UI_ELEMENTS.nationalityElement = document.querySelector('.gen-project__table-info p:nth-child(3)');
}
