(function(){
  var search = document.getElementById('search');
  var list = document.getElementById('events');
  var favoritesKey = 'favorites';
  var currentView = 'all';
  var tabInputs = document.querySelectorAll('input[name="tab"]');

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
      if (currentView !== 'all') return;
      var q = this.value.trim().toLowerCase();
      Array.prototype.forEach.call(list.querySelectorAll('li'), function(li){
        var text = li.textContent.toLowerCase();
        li.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
      });
    });
  }

  // Favorite toggle (use delegation and closest to handle clicks reliably)
  list.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('.favorite-toggle');
    if (t && list.contains(t)){
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
    currentView = view;
    if (view !== 'all' && search) search.value = '';
    var favs = loadFavorites();
    var now = new Date();
    Array.prototype.forEach.call(list.querySelectorAll('li'), function(li){
      li.style.display = '';
      if (view === 'favorites'){
        var id = li.querySelector('.favorite-toggle').getAttribute('data-id');
        if (favs.indexOf(id) === -1) li.style.display = 'none';
      } else if (view === 'up-next') {
        var start = new Date(li.getAttribute('data-start'));
        if (start < now) li.style.display = 'none';
      }
    });
  }

  function bindTabs(){
    Array.prototype.forEach.call(tabInputs, function(input){
      input.addEventListener('change', function(){
        if (this.checked) showView(this.value);
      });
    });
  }

  // Render events by fetching data/events.json, then initialize
  function createEventElement(e){
    var li = document.createElement('li');
    li.id = 'event' + e.id;
    li.className = 'list-group-item event-list';
    li.setAttribute('data-start', e.startTime);

    // mark past events for styling
    try{
      var startDate = new Date(e.startTime);
      if (startDate < new Date()) li.classList.add('past-event');
    }catch(ex){}

    var details = document.createElement('details');
    var summary = document.createElement('summary');

    var titleHtml = e.title + '<br/><small class="text-muted">' + formatDate(e.startTime) + '</small>';
    summary.innerHTML = titleHtml;

    // prefer anchor inside <summary> for better cross-browser behavior
    var btn = document.createElement('a');
    btn.href = '#';
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
    var aria = document.getElementById('aria-status');
    bindTabs();
    // Prefer global EVENTS var (works for file:// openings)
    if (window.EVENTS && Array.isArray(window.EVENTS)){
      try{
        var data = window.EVENTS.slice();
        data.sort(function(a,b){ return new Date(a.startTime) - new Date(b.startTime); });
        list.innerHTML = '';
        data.forEach(function(e){ list.appendChild(createEventElement(e)); });
        updateFavoriteButtons();
        if (aria) aria.textContent = 'Events loaded.';
        showView(currentView);
        return;
      }catch(e){
        console.error('Failed to render window.EVENTS', e);
      }
    }

    // Fallback: try fetching JSON over XHR/fetch (works when served via HTTP)
    fetch('data/events.json').then(function(res){
      if (!res.ok) throw new Error('Failed to load events');
      return res.json();
    }).then(function(data){
      data.sort(function(a,b){ return new Date(a.startTime) - new Date(b.startTime); });
      list.innerHTML = '';
      data.forEach(function(e){ list.appendChild(createEventElement(e)); });
      updateFavoriteButtons();
      if (aria) aria.textContent = 'Events loaded.';
    }).catch(function(err){
      if (aria) aria.textContent = 'Could not load events.';
      console.error(err);
    });
  }

  // run after DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadAndRender); else loadAndRender();

})();
