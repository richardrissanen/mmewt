var filterPosts;

filterEvents = function() {
  var i, j, len, len1, post, posts, query, results, results1;

  query = document.getElementById('search').value.toLowerCase();
  posts = document.getElementsByClassName('list-group-item');

  if (query.length > 0) {

    results = [];

    for (i = 0, len = posts.length; i < len; i++) {
      post = posts[i];
      results.push((function(post) {
        if (post.children[0].children[0].innerHTML.toLowerCase().indexOf(query) > -1) {
          return post.style.display = 'block';
        } else {
          return post.style.display = 'none';
        }
      })(post));
    }

    return results;

  } else {

    results2 = [];

    for (j = 0, len1 = posts.length; j < len1; j++) {
      post = posts[j];
      results2.push((function(post) {
        return post.style.display = 'block';
      })(post));
    }

    return results2;
  }
}

////
// Local Storage
////
var favoriteToggles = document.getElementsByClassName("favorite-toggle");

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
