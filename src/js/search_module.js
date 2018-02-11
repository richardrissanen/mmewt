define([], function() {

  var searchModule = function() {
      this.initialize = function() {

        document.getElementById('search').addEventListener("keyup", function(event){
          var i, j, len, len1, event, events, query, results, results1;

          query = document.getElementById('search').value.toLowerCase();
          events = document.getElementsByClassName('list-group-item');

          if (query.length > 0) {

            results = [];

            for (i = 0, len = events.length; i < len; i++) {
              event = events[i];
              results.push((function(event) {
                if (event.children[0].children[0].innerHTML.toLowerCase().indexOf(query) > -1) {
                  return event.style.display = 'block';
                } else {
                  return event.style.display = 'none';
                }
              })(event));
            }

            return results;

          } else {

            results2 = [];

            for (j = 0, len1 = events.length; j < len1; j++) {
              event = events[j];
              results2.push((function(event) {
                return event.style.display = 'block';
              })(event));
            }

            return results2;
          }
        });

      }
  }

  return searchModule;
});