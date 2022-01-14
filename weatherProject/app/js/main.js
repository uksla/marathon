import {
  selectTabNav,
  selectTabContent
} from "./tabs.js";

import {
  storage
} from "./storage.js";

import {
  UI_ELEMENTS
} from "./view.js";

export {
  buildFavourite,
  pushFav,
  sendRequest
}

let inputValue = undefined;
let currentTemp = null;
let imgSrc = undefined;

const favList = [];
const isInputEmpty = inputValue === '';

UI_ELEMENTS.tabNav.forEach(item => {
  item.addEventListener('click', selectTabNav)
});

UI_ELEMENTS.formElement.addEventListener('submit', sendRequest);

UI_ELEMENTS.selectFavouriteElement.addEventListener('click', addFavourites);

function sendRequest(value) {
  const isNotValid = (UI_ELEMENTS.inputElement.value === '') & !value;

  if (isNotValid) {
    console.log(UI_ELEMENTS.inputElement.value);
    return;
  } else {
    inputValue = UI_ELEMENTS.inputElement.value || value;
    inputValue.trim();
    console.log(inputValue);
    storage.setCurrentCity(inputValue);

    let promis = new Promise(function (resolve, reject) {
      resolve(
        getWeatherData()
        .then((data) => {
          imgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
          currentTemp = data.main.temp;
        })
        .then(setValue)
        .catch(alert)
      )
    })
  }

}

function getWeatherData() {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = inputValue;
  const apiKey = 'e03aeb1432d5c11530444113b79204b8';
  const unitsOfMeasure = 'metric'
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=${unitsOfMeasure}`;

  return fetch(url).then((response) => {
    if (response.status === 404) {
      throw new Error("Cant find the city.")
    }

    if ((!response.ok) & (response.status !== 404) & (!cityName === '')) {
      throw new Error("Unexpected error.")
    }

    if (isInputEmpty) {
      throw new Error("Enter the city.")
    }

    return response.json();
  })
}

function setValue() {
  UI_ELEMENTS.cityValueNowElement = document.querySelectorAll('.cityValue');
  UI_ELEMENTS.tempValueNowElement = document.querySelectorAll('.temperatureValue');

  UI_ELEMENTS.cityValueNowElement.forEach(item => {
    item.textContent = inputValue;
  });

  UI_ELEMENTS.tempValueNowElement.forEach(item => {
    item.textContent = currentTemp;
  });

  UI_ELEMENTS.weatherImageElement.style.backgroundImage = "url(" + imgSrc + ")";

  isFavExists();
}


function resetDefault() {
  TOOL.resetInput();
  TOOL.removeActiveClass();
}

const TOOL = {
  resetInput: () => UI_ELEMENTS.inputElement.value = '',
  removeActiveClass: () => UI_ELEMENTS.selectFavouriteElement.classList.remove('weather-app__info-image--active'),
  addActiveClass: () => UI_ELEMENTS.selectFavouriteElement.classList.add('weather-app__info-image--active'),
}

function addFavourites() {
  if (this.classList.contains('weather-app__info-image--active')) {
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].name === inputValue) {
        favList.splice(i, 1);
        storage.deleteFavouriteCitie();
        storage.saveFavoriteCities(favList);
        console.log(UI_ELEMENTS.favouriteElementsList.lastElementChild);
        console.log(UI_ELEMENTS.favouriteElementsList.childNodes.length);
        // UI_ELEMENTS.favouriteElementsList.lastElementChild.remove();
        
        console.log(favList);
        this.classList.toggle('weather-app__info-image--active');
      }
    }

    for (let j = 0; j < UI_ELEMENTS.favouriteElementsList.childNodes.length; j++) {
      if (UI_ELEMENTS.favouriteElementsList.childNodes[j].textContent === inputValue) {
        console.log(1);
      }
    }
  } else if (!isInputEmpty & (typeof inputValue !== 'undefined')) {
    buildFavourite();
    console.log(typeof inputValue);

    pushFav(inputValue);

    storage.saveFavoriteCities(favList);

    this.classList.toggle('weather-app__info-image--active');
  }
}

function buildFavourite(value) {
  const fav = document.createElement('li');
  const favDel = document.createElement('span')
  fav.classList.add('weather-app__locations-item');
  favDel.classList.add('weather-app__locations-delete');

  fav.textContent = inputValue;
  fav.append(favDel);

  let a = document.querySelector('.weather-app__locations-list')

  a.append(fav);
  console.log(favDel.parentNode);
  console.log(favDel);

  favDel.addEventListener('click', delFavourite);

  fav.addEventListener('click', favHandler);

  if (value) {
    fav.append(value);
    a.append(fav);
  }

  return fav;
}

function favHandler() {
  let favName = this.textContent;
  sendRequest(favName);
}

function delFavourite() {
  for (let i = 0; i < favList.length; i++) {
    if (favList[i].name === this.parentNode.textContent) {
      favList.splice(i, 1);
      console.log(favList);
      storage.deleteFavouriteCitie();
      storage.saveFavoriteCities(favList);
      this.parentNode.remove();
    }
  }
}

function isFavExists() {
  if (favList.length > 0) {
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].name === inputValue) {
        TOOL.resetInput();
        TOOL.addActiveClass();
        console.log('Great');
        break
      } else {
        resetDefault();
        console.log('No');
      }
    }
  } else {
    resetDefault();
    console.log('length');
  }
}

function pushFav(name) {
  const newFav = {
    id: favList.length + 1,
    name: name,
  }

  favList.push(newFav);
  console.log(favList);
}

window.onload = function () {
  storage.getFavoriteCities();
}