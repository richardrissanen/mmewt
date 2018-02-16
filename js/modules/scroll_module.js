define([], function() {

  var scrollModule = function() {

    this.toTop = function() {
      if (window.scrollY !== 0)
        window.scroll(0,0);
    };

  };

  return scrollModule;

});
