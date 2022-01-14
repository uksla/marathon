import {
  buildFavourite,
  pushFav,
  sendRequest
} from "./main.js";

const storage = {
  saveFavoriteCities: (value) => {
    let listToJson = JSON.stringify(value);
    localStorage.setItem('cities', listToJson);
  },

  deleteFavouriteCitie: () => {
    localStorage.removeItem('cities');
    storage.saveFavoriteCities();

  },

  getFavoriteCities: () => {
    const GET_STORAGE = localStorage.getItem('cities');

    const parsedStorage = JSON.parse(GET_STORAGE);
    console.log(parsedStorage);

    parsedStorage.forEach((item, i, parsedStorage) => {
      const favCitiesNames = parsedStorage[i].name;
      buildFavourite(favCitiesNames);
      pushFav(favCitiesNames);
    });

    storage.getCurrentCity();
  },

  setCurrentCity: (name) => {
    localStorage.setItem('currentCity', name);
  },

  getCurrentCity: () => {
    sendRequest(localStorage.getItem('currentCity'))
  },

  
}

export {
  storage
}