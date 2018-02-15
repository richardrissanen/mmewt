define(
  ['../../data/data_module', './search_module', './scroll_module', './template'], 
  function(dataModule, searchModule, scrollModule, templateModule) {
  var data, createEvents, scroll, upNext, all, favoriteToggles;

  data = new dataModule();
  searchModule = new searchModule();
  scroll = new scrollModule();
  template = new templateModule();

  upNext = document.getElementById("up-next");
  favorite = document.getElementById('favorite');
  all = document.getElementById("all");

  function hideSearch(bool) {
    if (bool)
      document.getElementById("search").parentNode.classList.add("hide");
    else
      document.getElementById("search").parentNode.classList.remove("hide");
  }

  function changeActiveLink(activeLink) {
    switch(activeLink) {
      case "all":
        all.classList.add('active');
        favorite.classList.remove('active');
        upNext.classList.remove('active');
        break;
      case "favorite":
        all.classList.remove('active');
        favorite.classList.add('active');
        upNext.classList.remove('active');
        break;
      case "up-next":
        all.classList.remove('active');
        favorite.classList.remove('active');
        upNext.classList.add('active');
        break;
    }
  }

  function isThisBlank(toBeChecked) {
    return (toBeChecked === null || typeof toBeChecked === 'undefined');
  }

  function isIdInArray(eventId, favoritesArray) {
    return (favoritesArray.indexOf(eventId) === -1);
  } 

  function updateFavoriteToggleClass(favoritesArray, toggle) {
    var listItem = toggle.parentNode.parentNode;
    var eventId = toggle.getAttribute("data-id");

    if (isIdInArray(eventId, favoritesArray)) {
      listItem.classList.add('hide');
    } else {
      listItem.classList.remove('hide');
    }
  }

  function setFavoriteLinkListener () {

    favorite.addEventListener("click", function(event){
      event.preventDefault();

      changeActiveLink(all.id);

      hideSearch(true);

      var favorites = localStorage.getItem('favorites');

      if (!isThisBlank(favorites)) {
        var favoritesArray = JSON.parse(favorites);
        var emptyStateHtml = document.getElementById("empty-state-container");
        var favoriteToggles = document.getElementsByClassName("favorite-toggle");

        if (favoritesArray.length < 1) { emptyStateHtml.parentNode.classList.remove('hide'); }

        Array.prototype.forEach.call(favoriteToggles, function(toggle, i) {
          updateFavoriteToggleClass(favoritesArray, toggle)
        });
      } 

    });
  }

  function displayAll() {
    var favorites = localStorage.getItem('favorites');
    var emptyStateHtml = document.getElementById("empty-state-container");
    var favoriteToggles = document.getElementsByClassName("favorite-toggle");

    emptyStateHtml.parentNode.classList.add('hide');

    var favoritesArray = JSON.parse(favorites);

    Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
      var listItem = toggle.parentNode.parentNode;

      listItem.classList.remove('hide');
    });
  }

  function setUpNextLinkListener() {

    upNext.addEventListener("click", function(event){
      event.preventDefault();

      changeActiveLink(upNext.id);

      hideSearch(true);

      displayAll();
    });
  }

  function setAllLinkListener() {
    all.addEventListener("click", function(event){
      event.preventDefault();

      setUpNextLinkListener();

      changeActiveLink(all.id);

      hideSearch(false);

      displayAll();

      scroll.toTop();
    });
  }

  function setEventsFavoriteToggles() {
    var favoriteToggles = document.getElementsByClassName("favorite-toggle");

    Array.prototype.forEach.call(favoriteToggles, function(toggle, i){  
      toggle.addEventListener("click", function(event){
        event.preventDefault();

        var eventId, favoritesArray, favorites, favoritesArrayString;

        this.classList.toggle('empty');

        eventId = this.getAttribute('data-id');
        favoritesArray = new Array;

        favorites = localStorage.getItem('favorites');

        if (!isThisBlank(favorites)) {
          favoritesArray = JSON.parse(favorites);

          (isIdInArray(eventId, favoritesArray)) ? 
            favoritesArray.push(eventId) :
              favoritesArray = favoritesArray.filter(function (favoriteId) { return favoriteId !== eventId; });
        }
        else {
          favoritesArray.push(eventId);
        }

        favoritesArrayString = JSON.stringify(favoritesArray);
        localStorage.setItem('favorites', favoritesArrayString);
      });
    });
  }

  function populateFavorites() {
    var favorites = localStorage.getItem('favorites');

    if (!isThisBlank(favorites)) {
      var favoritesArray = JSON.parse(favorites);
      var favoriteToggles = document.getElementsByClassName("favorite-toggle");
      Array.prototype.forEach.call(favoriteToggles, function(toggle, i){
        var eventId = toggle.getAttribute("data-id");
        if (!isIdInArray(eventId, favoritesArray)) { 
          toggle.classList.remove('empty');
        }
      });
    }
  }

  function initializeEvents() {
    var events, eventsUnorderedList,  emptyStateHtml;
    emptyStateHtml = document.getElementById("empty-state-container");

    events = data.events();
    eventsUnorderedList = document.getElementById('events');

    eventsUnorderedList.innerHTML = "";

    emptyStateHtml = template.createEmptyState();
    eventsUnorderedList.innerHTML += emptyStateHtml;

    // creates all events and their favorite toggles
    Array.prototype.forEach.call(events, function(event) {
      var eventHtml = template.createEventHtml(event.title, event.startTime, event.id, event.description);
      eventsUnorderedList.innerHTML += eventHtml;
    });

    setFavoriteLinkListener();
    setUpNextLinkListener();
    setAllLinkListener();
    setEventsFavoriteToggles();
    populateFavorites();
  }

  function initializeNoLocalStorageState() {
    noLocalStorageState = template.createNoLocalStorageState();
    eventsUnorderedList.innerHTML += noLocalStorageState;
  }

  ////
  // Module definition
  ////
  var eventsModule = function() {
    this.initialize = function() {
      var isThereLocalStorage = (typeof (Storage) !== "undefined");

      (!isThereLocalStorage) ? initializeEvents() : initializeNoLocalStorageState();
    };
  };

  return eventsModule;
});
