define([], function() {

  var scrollModule = function() {
    this.ToMostCurrentEvent = function() {
      document.getElementsByClassName('current')[0].scrollIntoView();

      // accounts for nav and toolbar
      var scrolledY = window.scrollY;

      if(scrolledY)
        window.scroll(0, scrolledY - 112);
    };

    this.toTop = function() {
      if (window.scrollY !== 0)
        window.scroll(0,0);
    };

  };

  return scrollModule;

});
