define(['../../data/data_module', ], function(dataModule) {
  var data,
      createEvents;

  data = new dataModule();

  // event template
  function createEventHtml(title, start, id) {

    return  '<li class="list-group-item">' +
              '<a href="#" >' +
                '<h6>' + title + '</h6>' +
                '<p><small class="text-muted">' + start + '</small></p>' +
              '</a>' +
              '<a href="#" class="favorite-toggle star empty" data-id="' + id + '"></a>' +
            '</li>'
  }

  function initializeFavoriteTool () {

    favorite.addEventListener("click", function(event){
      event.preventDefault();

      this.classList.toggle('empty');

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
  }

  function initializeFavoriteEventsToggles() {
    favoriteToggles = document.getElementsByClassName("favorite-toggle");

    Array.prototype.forEach.call(favoriteToggles, function(toggle, i){

      toggle.addEventListener("click", function(event){
        event.preventDefault();

        var eventsId,
            favoritesArray,
            favoritesArrayString;

        this.classList.toggle('empty');

        eventId = this.getAttribute('data-id');
        favoritesArray = new Array;

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

        return true;

      });

    });
  }

  function populateFavorites() {
    if (typeof (Storage) !== "undefined") {
      var favorites = localStorage.getItem('favorites');

        if (favorites !== null && typeof favorites !== 'undefined') {
          var favoritesArray = JSON.parse(favorites);
          Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
            if (favoritesArray.indexOf(toggle.getAttribute("data-id")) != -1) { 
              toggle.classList.remove('empty');
            }
          });
        }
    }
  }

  ////
  // Module definition
  ////
  var eventsModule = function() {
      this.initialize = function() {
        var events,
            eventsList;

        events = data.events();
        eventsUnorderedList = document.getElementById('events');

        eventsUnorderedList.innerHTML = "";

        Array.prototype.forEach.call(events, function(event) {
          var eventHtml = createEventHtml(event.title, event.startTime, event.id);
          eventsUnorderedList.innerHTML += eventHtml;
        });

        initializeFavoriteTool();
        initializeFavoriteEventsToggles();
        populateFavorites();

      };
  };

  return eventsModule;
});