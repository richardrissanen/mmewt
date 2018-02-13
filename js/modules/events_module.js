define(['../../data/data_module', './search_module', './scroll_module', './date_format_module'], function(dataModule, searchModule, scrollModule, dateFormatModule) {
  var data,
      createEvents,
      scroll;

  data = new dataModule();
  searchModule = new searchModule();
  scroll = new scrollModule();
  dateFormat = new dateFormatModule();

  function checkIfInPast(start) {
    var classToAdd = "current";

    if (start < new Date())
      classToAdd = 'past-event';

    return classToAdd;
  }

  // event template
  function createEventHtml(title, start, id, description) {

    var classToAdd = checkIfInPast(start);
    var transformedDate = dateFormat.transform(start);

    return  `<li class="list-group-item ${classToAdd}">
              <h6>
                ${title} <small class="text-muted">${transformedDate}</small>
                <a href="#" class="favorite-toggle star empty" data-id="${id}"></a></h6>
              <p>${description}</p>
            </li>`;
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
              // id is NOT a favorite
              if (favoritesArray.indexOf(toggle.getAttribute("data-id")) == -1) {
                var listItem = toggle.parentNode.parentNode;
                var search = document.getElementById('search');
                var searchValue =search.value;
                var favorite = document.getElementById('favorite');

                if (favorite.classList.contains('empty')) {
                  scroll.ToMostCurrentEvent();
                  if (search.value.length > 0) { // id is NOT a favorite, favorite is off with search criteria
                    var query = document.getElementById('search').value.toLowerCase();
                    searchModule.search(query)
                  } else { // id is NOT a favorite, favorite off without search criteria
                      listItem.classList.remove('hide');
                  }
                } else {
                  scroll.toTop();
                  if (searchValue != "" && searchValue.length > 0) {// id is NOT a favorite, favorite on with search criteria
                    if (!listItem.classList.contains('hide'))
                      listItem.classList.add('hide');
                  } else { // id is NOT a favorite, favorite on without search criteria
                    listItem.classList.add('hide');
                  }
                }
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
          var eventHtml = createEventHtml(event.title, event.startTime, event.id, event.description);
          eventsUnorderedList.innerHTML += eventHtml;
        });

        initializeFavoriteTool();
        initializeFavoriteEventsToggles();
        populateFavorites();
        scroll.ToMostCurrentEvent();

      };
  };

  return eventsModule;
});