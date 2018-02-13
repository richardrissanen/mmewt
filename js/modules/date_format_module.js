define([], function() {

  function transfromTime(hours, minutes) {
    var suffix = "am";

    if (hours == 0) {
      hours = 12;
    } else {
      if (hours > 12) {
        suffix = "pm";
        hours = hours - 12;
      } else {
        hours = hours;
      }
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return hours + ":" + minutes + suffix;
  }

  var dateFormatModule = function() {
    this.transform = function(date) {
      var month = date.getMonth() + 1;
      return date.getFullYear() + '/' + month + '/' + date.getDate() + " at " + transfromTime(date.getHours(), date.getMinutes());
    };
  }

  return dateFormatModule;

});