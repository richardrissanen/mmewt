(function(){
  var search = document.getElementById('search');
  var list = document.getElementById('events');
  var items = list.querySelectorAll('li');
  var favoritesKey = 'favorites';

  function loadFavorites(){
    try{
      var raw = localStorage.getItem(favoritesKey);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }

  function saveFavorites(arr){
    try{ localStorage.setItem(favoritesKey, JSON.stringify(arr)); }catch(e){}
  }

  function updateFavoriteButtons(){
    var favs = loadFavorites();
    list.querySelectorAll('.favorite-toggle').forEach(function(btn){
      var id = btn.getAttribute('data-id');
      var pressed = (favs.indexOf(id) !== -1);
      btn.classList.toggle('empty', !pressed);
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
  }

  // Search filter (minimal JS)
  if (search) {
    search.addEventListener('input', function(){
      var q = this.value.trim().toLowerCase();
      items.forEach(function(li){
        var text = li.textContent.toLowerCase();
        li.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
      });
    });
  }

  // Favorite toggle
  list.addEventListener('click', function(e){
    var t = e.target;
    if (t.classList.contains('favorite-toggle')){
      e.preventDefault();
      var id = t.getAttribute('data-id');
      var favs = loadFavorites();
      var idx = favs.indexOf(id);
      if (idx === -1) { favs.push(id); t.classList.remove('empty'); t.setAttribute('aria-pressed','true'); } else { favs.splice(idx,1); t.classList.add('empty'); t.setAttribute('aria-pressed','false'); }
      saveFavorites(favs);
    }
  });

  // View links: All / Favorites / Up Next
  function showView(view){
    var favs = loadFavorites();
    items.forEach(function(li){
      li.style.display = '';
      if (view === 'favorites'){
        var id = li.querySelector('.favorite-toggle').getAttribute('data-id');
        if (favs.indexOf(id) === -1) li.style.display = 'none';
      }
    });
  }

  // Hook up tool links
  var toolLinks = document.querySelectorAll('.tool-link');
  function clearActive(){ document.querySelectorAll('.tool-link').forEach(function(a){a.classList.remove('active')}); }

  var allLink = document.getElementById('all');
  var favLink = document.getElementById('favorite');
  var upNextLink = document.getElementById('up-next');

  if (allLink) allLink.addEventListener('click', function(e){ e.preventDefault(); showView('all'); clearActive(); this.classList.add('active'); });
  if (favLink) favLink.addEventListener('click', function(e){ e.preventDefault(); showView('favorites'); clearActive(); this.classList.add('active'); });

  // compute and show up-next (next future event)
  if (upNextLink) upNextLink.addEventListener('click', function(e){
    e.preventDefault();
    var now = new Date();
    var next = null;
    items.forEach(function(li){
      var start = new Date(li.getAttribute('data-start'));
      if (start >= now && (next === null || start < new Date(next.getAttribute('data-start')))) next = li;
    });
    items.forEach(function(li){ li.style.display = (next && li === next) ? '' : 'none'; });
    clearActive();
    this.classList.add('active');
  });

  // initialize
  updateFavoriteButtons();
})();
