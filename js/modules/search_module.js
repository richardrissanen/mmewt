define(['./scroll_module'], function(scrollModule) {

  var scroll;

  scroll = new scrollModule();

  function isHidden(element) {
    return (element.offsetParent === null)
  }

  function filterEvents(query) {
    var i, j, len, len1, event, events, results, results1;

    events = document.getElementsByClassName('list-group-item');

    if (query.length > 0) {
      results = [];

      for (i = 0, len = events.length; i < len; i++) {
        event = events[i];
        results.push((function(event) {
          if (event.children[0].innerHTML.toLowerCase().indexOf(query) > -1) {
            event.classList.remove('hide');
          } else {
            event.classList.add('hide');
          }
        })(event));
      }

      return results;

    } else {
      scroll.toTop();

      results2 = [];

      for (j = 0, len1 = events.length; j < len1; j++) {
        event = events[j];
        results2.push((function(event) {
          event.classList.remove('hide');
        })(event));
      }

      return results2;
    }
  }

  var searchModule = function() {
      this.initialize = function() {

        document.getElementById('search').addEventListener("keyup", function(event){
          var query = document.getElementById('search').value.toLowerCase();

          // reset favoriteTool
          document.getElementById('favorite').classList.add('empty');

          filterEvents(query);

        });
      }

      this.search = function(query) {
        filterEvents(query);
      }
  }

  return searchModule;
});
