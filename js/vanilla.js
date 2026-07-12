(function(){
  var search = document.getElementById('search');
  var list = document.getElementById('events');
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
      Array.prototype.forEach.call(list.querySelectorAll('li'), function(li){
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
    Array.prototype.forEach.call(list.querySelectorAll('li'), function(li){
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
    Array.prototype.forEach.call(list.querySelectorAll('li'), function(li){
      var start = new Date(li.getAttribute('data-start'));
      if (start >= now && (next === null || start < new Date(next.getAttribute('data-start')))) next = li;
    });
    Array.prototype.forEach.call(list.querySelectorAll('li'), function(li){ li.style.display = (next && li === next) ? '' : 'none'; });
    clearActive();
    this.classList.add('active');
  });

  // Render events by fetching data/events.json, then initialize
  function createEventElement(e){
    var li = document.createElement('li');
    li.id = 'event' + e.id;
    li.className = 'list-group-item event-list';
    li.setAttribute('data-start', e.startTime);

    var details = document.createElement('details');
    var summary = document.createElement('summary');

    var titleHtml = e.title + '<br/><small class="text-muted">' + formatDate(e.startTime) + '</small>';
    summary.innerHTML = titleHtml;

    var btn = document.createElement('button');
    btn.className = 'favorite-toggle star empty';
    btn.setAttribute('data-id', String(e.id));
    btn.setAttribute('aria-label','Toggle favorite');
    btn.setAttribute('aria-pressed','false');
    summary.appendChild(btn);

    var p = document.createElement('p');
    p.textContent = e.description || '';

    details.appendChild(summary);
    details.appendChild(p);
    li.appendChild(details);
    return li;
  }

  function formatDate(iso){
    var d = new Date(iso);
    var month = String(d.getMonth()+1).padStart(2,'0');
    var day = String(d.getDate()).padStart(2,'0');
    var hours = d.getHours();
    var suffix = 'am';
    if (hours === 0) hours = 12; else if (hours >= 12){ if (hours > 12) hours -= 12; suffix = 'pm'; }
    var minutes = String(d.getMinutes()).padStart(2,'0');
    hours = String(hours).padStart(2,'0');
    return d.getFullYear() + '/' + month + '/' + day + ' at ' + hours + ':' + minutes + suffix;
  }

  function loadAndRender(){
    fetch('data/events.json').then(function(res){
      if (!res.ok) throw new Error('Failed to load events');
      return res.json();
    }).then(function(data){
      data.sort(function(a,b){ return new Date(a.startTime) - new Date(b.startTime); });
      list.innerHTML = '';
      data.forEach(function(e){ list.appendChild(createEventElement(e)); });
      updateFavoriteButtons();
    }).catch(function(err){
      var aria = document.getElementById('aria-status');
      if (aria) aria.textContent = 'Could not load events via fetch; attempting inline fallback.';
      // Fallback: look for inline JSON in a script tag with id "events-data"
      try {
        var inline = document.getElementById('events-data');
        if (inline) {
          var dataInline = JSON.parse(inline.textContent);
          dataInline.sort(function(a,b){ return new Date(a.startTime) - new Date(b.startTime); });
          list.innerHTML = '';
          dataInline.forEach(function(e){ list.appendChild(createEventElement(e)); });
          updateFavoriteButtons();
          if (aria) aria.textContent = 'Events loaded from embedded data.';
          return;
        }
      } catch (e2) {
        console.error('Inline parse failed', e2);
      }
      if (aria) aria.textContent = 'Could not load events.';
      console.error(err);
    });
  }

  // run after DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadAndRender); else loadAndRender();

})();
