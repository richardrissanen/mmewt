import { EVENTS } from '../data/events.mjs';

// App module: render events and wire up interactions.
const search = document.getElementById('search');
const list = document.getElementById('events');
const favoritesKey = 'favorites';

function loadFavorites(){
  try{
    const raw = localStorage.getItem(favoritesKey);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function saveFavorites(arr){
  try{ localStorage.setItem(favoritesKey, JSON.stringify(arr)); }catch(e){}
}

function updateFavoriteButtons(){
  const favs = loadFavorites();
  list.querySelectorAll('.favorite-toggle').forEach(btn => {
    const id = btn.getAttribute('data-id');
    const pressed = (favs.indexOf(id) !== -1);
    btn.classList.toggle('empty', !pressed);
    btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  });
}

function formatDate(iso){
  const d = new Date(iso);
  const month = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  let hours = d.getHours();
  let suffix = 'am';
  if (hours === 0) hours = 12; else if (hours >= 12){ if (hours > 12) hours -= 12; suffix = 'pm'; }
  const minutes = String(d.getMinutes()).padStart(2,'0');
  hours = String(hours).padStart(2,'0');
  return `${d.getFullYear()}/${month}/${day} at ${hours}:${minutes}${suffix}`;
}

function createEventElement(e){
  const li = document.createElement('li');
  li.id = 'event' + e.id;
  li.className = 'list-group-item event-list';
  li.setAttribute('data-start', e.startTime);

  const details = document.createElement('details');
  const summary = document.createElement('summary');

  summary.innerHTML = `${e.title}<br/><small class="text-muted">${formatDate(e.startTime)}</small>`;

  const btn = document.createElement('button');
  btn.className = 'favorite-toggle star empty';
  btn.setAttribute('data-id', String(e.id));
  btn.setAttribute('aria-label','Toggle favorite');
  btn.setAttribute('aria-pressed','false');
  summary.appendChild(btn);

  const p = document.createElement('p');
  p.textContent = e.description || '';

  details.appendChild(summary);
  details.appendChild(p);
  li.appendChild(details);
  return li;
}

function showView(view){
  const favs = loadFavorites();
  Array.from(list.querySelectorAll('li')).forEach(li => {
    li.style.display = '';
    if (view === 'favorites'){
      const id = li.querySelector('.favorite-toggle').getAttribute('data-id');
      if (favs.indexOf(id) === -1) li.style.display = 'none';
    }
  });
}

function init(events){
  // render
  const data = (events || []).slice().sort((a,b) => new Date(a.startTime) - new Date(b.startTime));
  list.innerHTML = '';
  data.forEach(e => list.appendChild(createEventElement(e)));

  // search
  if (search) search.addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();
    Array.from(list.querySelectorAll('li')).forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
    });
  });

  // favorites
  list.addEventListener('click', function(e){
    const t = e.target;
    if (t.classList.contains('favorite-toggle')){
      e.preventDefault();
      const id = t.getAttribute('data-id');
      const favs = loadFavorites();
      const idx = favs.indexOf(id);
      if (idx === -1) { favs.push(id); t.classList.remove('empty'); t.setAttribute('aria-pressed','true'); } else { favs.splice(idx,1); t.classList.add('empty'); t.setAttribute('aria-pressed','false'); }
      saveFavorites(favs);
    }
  });

  // view links
  const clearActive = () => Array.from(document.querySelectorAll('.tool-link')).forEach(a => a.classList.remove('active'));
  const allLink = document.getElementById('all');
  const favLink = document.getElementById('favorite');
  const upNextLink = document.getElementById('up-next');

  if (allLink) allLink.addEventListener('click', e => { e.preventDefault(); showView('all'); clearActive(); allLink.classList.add('active'); });
  if (favLink) favLink.addEventListener('click', e => { e.preventDefault(); showView('favorites'); clearActive(); favLink.classList.add('active'); });
  if (upNextLink) upNextLink.addEventListener('click', e => {
    e.preventDefault();
    const now = new Date();
    let next = null;
    Array.from(list.querySelectorAll('li')).forEach(li => {
      const start = new Date(li.getAttribute('data-start'));
      if (start >= now && (next === null || start < new Date(next.getAttribute('data-start')))) next = li;
    });
    Array.from(list.querySelectorAll('li')).forEach(li => { li.style.display = (next && li === next) ? '' : 'none'; });
    clearActive();
    upNextLink.classList.add('active');
  });

  updateFavoriteButtons();
}

// Initialize on DOM ready using imported EVENTS
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(EVENTS)); else init(EVENTS);

export default init;
