var filterEvents;
var favoriteToggles;

filterEvents = function() {
  var i, j, len, len1, event, events, query, results, results1;

  query = document.getElementById('search').value.toLowerCase();
  events = document.getElementsByClassName('list-group-item');

  if (query.length > 0) {

    results = [];

    for (i = 0, len = events.length; i < len; i++) {
      event = events[i];
      results.push((function(event) {
        if (event.children[0].children[0].innerHTML.toLowerCase().indexOf(query) > -1) {
          return event.style.display = 'block';
        } else {
          return event.style.display = 'none';
        }
      })(event));
    }

    return results;

  } else {

    results2 = [];

    for (j = 0, len1 = events.length; j < len1; j++) {
      event = events[j];
      results2.push((function(event) {
        return event.style.display = 'block';
      })(event));
    }

    return results2;
  }
}

////
// Local Storage
////
favoriteToggles = document.getElementsByClassName("favorite-toggle");

Array.prototype.forEach.call(favoriteToggles, function(toggle, i){

  toggle.addEventListener("click", function(event){
    event.preventDefault();

    var favoritesArrayString;

    this.classList.toggle('empty');

    var eventId = this.getAttribute('data-id');
    var favoritesArray = new Array;

    if (typeof (Storage) !== "undefined") {
      var favorites = localStorage.getItem('favorites');

      if (favorites !== null && typeof favorites !== 'undefined') {
        favoritesArray = JSON.parse(favorites);

        if (favoritesArray.indexOf(eventId) === -1) {
          favoritesArray.push(eventId);
        }
        else {
          favoritesArray = favoritesArray.filter(function (favoriteId) { return favoriteId !== eventId; });
        }

      }
      else {
        favoritesArray = [];
        favoritesArray.push(eventId);
      }

      favoritesArrayString = JSON.stringify(favoritesArray);
      localStorage.setItem('favorites', favoritesArrayString);
    }
    else {
      alert('Sorry, your web browser does not support local storage.');
    }

    console.log("favoritesArrayString ==" + favoritesArrayString);

    return true;

  });

});

document.getElementById("favorite").addEventListener("click", function(event){
  event.preventDefault();

  this.classList.toggle('empty');

});

fetchFavorites = function()
{
  var favorites = localStorage.getItem('favorites');
  var favoritesArray;

  if (favorites !== null && typeof favorites !== 'undefined') {
      favoritesArray = JSON.parse(favorites);
  }
  else {
      favoritesArray = [];
  }
  return favoritesArray;
}


// Toggle Favorites
var favorite = document.getElementById('favorite');

favorite.addEventListener("click", function(event){
  if (typeof (Storage) !== "undefined") {
    var favorites = localStorage.getItem('favorites');

      if (favorites !== null && typeof favorites !== 'undefined') {
        var favoritesArray = JSON.parse(favorites);
        Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
          if (favoritesArray.indexOf(toggle.getAttribute("data-id")) == -1) { 
            toggle.parentNode.classList.toggle('hide');
          }
        });
      }
  }
});

// populate favorite stars
if (typeof (Storage) !== "undefined") {
  var favorites = localStorage.getItem('favorites');

    if (favorites !== null && typeof favorites !== 'undefined') {
      var favoritesArray = JSON.parse(favorites);
      Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
        if (favoritesArray.indexOf(toggle.getAttribute("data-id")) != -1) { 
          toggle.classList.remove('empty')
        }
      });
    }
}
