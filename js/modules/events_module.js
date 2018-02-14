define(['../../data/data_module', './search_module', './scroll_module', './date_format_module'], function(dataModule, searchModule, scrollModule, dateFormatModule) {
  var data,
      createEvents,
      scroll,
      all;

  data = new dataModule();
  searchModule = new searchModule();
  scroll = new scrollModule();
  dateFormat = new dateFormatModule();

  all = document.getElementById("all");

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

    return  `<li id="event${id}"class="list-group-item event-list ${classToAdd} hide">
              <h6>
                ${title} <small class="text-muted">${transformedDate}</small>
                <a href="#" class="favorite-toggle star empty" data-id="${id}"></a>
                <a  href="#event${id}" class="permalink"></a>
              </h6>
              <p>${description}</p>
            </li>`;
  }

  function createEmptyState() {
    var emptyHtml = `<div id="empty-state-container" class="text-center ml-auto mr-auto">
                      <h6>Oh no, you have no favorites.</h6>
                      <div class="big-star mt-4 mb-4"></div>
                      <p>Go to Events and add favorites by tapping the star on the right.</p>
                    </div>`;
    return `<li>${emptyHtml}<li>`;
  }

  function initializeFavorite () {

    favorite.addEventListener("click", function(event){
      event.preventDefault();

      var emptyStateHtml = document.getElementById("empty-state-container");

      favorite.classList.add('active');
      all.classList.remove('active');

      if (typeof (Storage) !== "undefined") {
        var favorites = localStorage.getItem('favorites');

        if (favorites !== null && typeof favorites !== 'undefined') {
          var favoritesArray = JSON.parse(favorites);

          if (favoritesArray.length < 1) { emptyStateHtml.parentNode.classList.remove('hide'); }

          Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
            var listItem = toggle.parentNode.parentNode;

            // id is NOT a favorite
            if (favoritesArray.indexOf(toggle.getAttribute("data-id")) == -1) {
              listItem.classList.add('hide');
            } else {
              listItem.classList.remove('hide');
            }
          });
        } else {
          emptyStateHtml.parentNode.classList.remove('hide');
        }
      }
    });
  }

  function initializeAll() {

    all.addEventListener("click", function(event){
      event.preventDefault();

      all.classList.add('active');
      favorite.classList.remove('active');

      if (typeof (Storage) !== "undefined") {
        var favorites = localStorage.getItem('favorites');
        var emptyStateHtml = document.getElementById("empty-state-container");

        emptyStateHtml.parentNode.classList.add('hide');

        if (favorites !== null && typeof favorites !== 'undefined') {
          var favoritesArray = JSON.parse(favorites);

          Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
            // id is NOT a favorite
            if (favoritesArray.indexOf(toggle.getAttribute("data-id")) == -1) {
              var listItem = toggle.parentNode.parentNode;
              var search = document.getElementById('search');
              var searchValue =search.value;
              var favorite = document.getElementById('favorite');

              scroll.ToMostCurrentEvent();
              if (search.value.length > 0) { // id is NOT a favorite, favorite is off with search criteria
                var query = document.getElementById('search').value.toLowerCase();
                searchModule.search(query)
              } else { // id is NOT a favorite, favorite off without search criteria
                  listItem.classList.remove('hide');
              }
            }
          });
        } else {
          var eventListListItems = document.getElementsByClassName("event-list");

          Array.prototype.forEach.call(eventListListItems, function(listItem, i){
            listItem.classList.remove('hide');
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
            eventsList,
            emptyStateHtml;

        events = data.events();
        eventsUnorderedList = document.getElementById('events');

        eventsUnorderedList.innerHTML = "";

        emptyStateHtml = createEmptyState();
        eventsUnorderedList.innerHTML += emptyStateHtml;

        Array.prototype.forEach.call(events, function(event) {
          var eventHtml = createEventHtml(event.title, event.startTime, event.id, event.description);
          eventsUnorderedList.innerHTML += eventHtml;
        });

        initializeFavorite();
        initializeAll();
        initializeFavoriteEventsToggles();
        populateFavorites();
        scroll.ToMostCurrentEvent();

      };
  };

  return eventsModule;
});