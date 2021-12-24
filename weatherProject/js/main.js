import { selectTabNav, selectTabContent } from "./tabs.js";
import { UI_ELEMENTS } from "./view.js";

let inputValue = undefined;
let currentTemp = null;
let imgSrc = undefined;

UI_ELEMENTS.tabNav.forEach(item => {
  item.addEventListener('click', selectTabNav)
});

UI_ELEMENTS.formElement.addEventListener('submit', sendRequest);

function sendRequest() {
  inputValue = UI_ELEMENTS.inputElement.value;
  inputValue.trim();
  console.log(inputValue);

  if (inputValue === '') {
    return
  } else {
    let promis = new Promise(function (resolve, reject) {
      resolve(
        getWeatherData()
        .then((data) => {
          imgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
          currentTemp = data.main.temp;
          setValue();
        })
      )
    })
  }
}

function getWeatherData() {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = inputValue;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const unitsOfMeasure = 'metric'
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=${unitsOfMeasure}`;

  return fetch(url).then((response) => {
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

  resetInput();
}

function resetInput() {
  UI_ELEMENTS.inputElement.value = '';
}