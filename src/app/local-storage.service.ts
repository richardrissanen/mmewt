import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService  {

  constructor() { }

  toggleFavorite(eventId) {
    if (typeof(Storage) !== "undefined") {
      const favorites = localStorage.getItem('favorites');
      var favoritesArray = new Array;

      if (favorites !== null && typeof favorites !== 'undefined') {        
        favoritesArray = JSON.parse(favorites);
        if (favoritesArray.indexOf(eventId) === -1) { 
          favoritesArray.push(eventId);
        } else {
          favoritesArray = favoritesArray.filter(function(favoriteId) { return favoriteId !== eventId})
        }
      } else {
        favoritesArray = [];
        favoritesArray.push(eventId);        
      }

      const favoritesArrayString = JSON.stringify(favoritesArray)
      localStorage.setItem('favorites', favoritesArrayString);
      
    } else {
      alert('Sorry, your web browser does not support local storage.');
    }
  }

  fetchFavorites() { 
    const favorites = localStorage.getItem('favorites'); 
    const favoritesArray = JSON.parse(favorites);
    
    return favoritesArray;
  }

}
