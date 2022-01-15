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
let formatedTime = null;

const BASE_INFO = {
  city: undefined,
  currentTemp: null,
  feelsLikeTemp: null,
  weather: undefined,
  sunriseTime: null,
  sunsetTime: null,
}
const favList = [];
const isInputEmpty = inputValue === '';

UI_ELEMENTS.tabNav.forEach(item => {
  item.addEventListener('click', selectTabNav)
});

UI_ELEMENTS.formElement.addEventListener('submit', sendRequest);

UI_ELEMENTS.selectFavouriteElement.addEventListener('click', favHandler);

function sendRequest(value) {
  const isNotValid = (UI_ELEMENTS.inputElement.value === '') & !value & (typeof UI_ELEMENTS.inputElement.value !== 'string') & (typeof value !== 'string') & (typeof value !== 'object');
  if (isNotValid) {
    console.log(UI_ELEMENTS.inputElement.value);
    alert(1);
    return;
  } else {
    inputValue = UI_ELEMENTS.inputElement.value || value;
    console.log(typeof UI_ELEMENTS.inputElement.value);
    console.log(typeof value);
    inputValue.trim();
    console.log(inputValue);
    // BASE_INFO.city = inputValue;
    // storage.setCurrentCity(BASE_INFO.city);

    let promis = new Promise(function (resolve, reject) {
      resolve(
        getWeatherData()
        .then((data) => {
          imgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
          BASE_INFO.currentTemp = data.main.temp;
          BASE_INFO.feelsLikeTemp = data.main.feels_like;
          console.log(BASE_INFO.feelsLikeTemp);
          BASE_INFO.weather = data.weather[0].main;
          console.log(BASE_INFO.weather);
          console.log(data.sys.sunrise);
          BASE_INFO.sunriseTime = formatTime(data.sys.sunrise);
          BASE_INFO.sunsetTime = formatTime(data.sys.sunset);
          console.log(BASE_INFO.sunriseTime);
        })
        .then(BASE_INFO.city = inputValue)
        .then(storage.setCurrentCity(BASE_INFO.city))
        .then(setValue)
        .catch(alert)
      )
    })
  }
}

function getWeatherData() {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  // const cityName = inputValue;
  const apiKey = 'e03aeb1432d5c11530444113b79204b8';
  const unitsOfMeasure = 'metric'
  const url = `${serverUrl}?q=${inputValue}&appid=${apiKey}&units=${unitsOfMeasure}`;

  return fetch(url).then((response) => {
    if (response.status === 404) {
      throw new Error("Cant find the city.")
    }

    if ((!response.ok) & (response.status !== 404) & (!inputValue === '')) {
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
  UI_ELEMENTS.tempValueFeelsLikeElement = document.querySelector('.feelsLikeValue');
  UI_ELEMENTS.typeOfWeatherElement = document.querySelector('.typeOfWeatherValue');
  UI_ELEMENTS.sunriseInfoElement = document.querySelector('.sunriseInfo');
  UI_ELEMENTS.sunsetInfoElement = document.querySelector('.sunsetInfo')

  UI_ELEMENTS.cityValueNowElement.forEach(item => {
    item.textContent = BASE_INFO.city;
  });

  UI_ELEMENTS.tempValueNowElement.forEach(item => {
    item.textContent = BASE_INFO.currentTemp;
  });

  UI_ELEMENTS.tempValueFeelsLikeElement.textContent = BASE_INFO.feelsLikeTemp;
  UI_ELEMENTS.typeOfWeatherElement.textContent = BASE_INFO.weather;
  UI_ELEMENTS.sunriseInfoElement.textContent = BASE_INFO.sunriseTime;
  UI_ELEMENTS.sunsetInfoElement.textContent = BASE_INFO.sunsetTime;

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

function favHandler() {
  if (this.classList.contains('weather-app__info-image--active')) {
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].name === BASE_INFO.city) {
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
      const isEqualElement = UI_ELEMENTS.favouriteElementsList.childNodes[j].textContent === BASE_INFO.city; 
      if (isEqualElement) {
        UI_ELEMENTS.favouriteElementsList.childNodes[j].remove();
        console.log(j);
      }
    }
  } else if (!isInputEmpty & (typeof BASE_INFO.city !== 'undefined')) {
    buildFavourite();
    console.log(typeof BASE_INFO.city);

    pushFav(BASE_INFO.city);

    storage.saveFavoriteCities(favList);

    this.classList.toggle('weather-app__info-image--active');
  }
}

function buildFavourite(value) {
  const fav = document.createElement('li');
  const favDel = document.createElement('span')
  fav.classList.add('weather-app__locations-item');
  favDel.classList.add('weather-app__locations-delete');

  fav.textContent = BASE_INFO.city;
  fav.append(favDel);

  let a = document.querySelector('.weather-app__locations-list')

  a.append(fav);
  console.log(favDel.parentNode);
  console.log(favDel);

  favDel.addEventListener('click', delFavourite);

  fav.addEventListener('click', selectedCity);

  if (value) {
    fav.append(value);
    a.append(fav);
  }

  return fav;
}

function selectedCity() {
  sendRequest(this.textContent);
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
      if (favList[i].name === BASE_INFO.city) {
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

function formatTime(value) {
  const unix_timestamp = value;
  const time = new Date(unix_timestamp * 1000);

  const timeHours = time.getHours();
  const timeMinutes = "0" + time.getMinutes();
  
  return timeHours + ':' + timeMinutes.substr(-2);
}

window.onload = function () {
  storage.getFavoriteCities();
  console.log(formatTime(1642216316));
}

