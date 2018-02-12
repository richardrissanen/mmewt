requirejs(
  ['./modules/search_module', './modules/events_module'],
  function(searchModule, eventsModule) {

    var search,
        events;

    search = new searchModule();
    events = new eventsModule();

    search.initialize();
    events.initialize();

});