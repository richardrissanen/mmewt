define([], function() {

  function checkForUnderTen(dateFragment) {
    if (dateFragment < 10) 
      dateFragment = "0" + dateFragment;

    return dateFragment;
  }

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

    hours = checkForUnderTen(hours)
    minutes = checkForUnderTen(minutes);

    return hours + ":" + minutes + suffix;
  }

  var dateFormatModule = function() {
    this.transform = function(date) {
      var month = date.getMonth() + 1;
      return date.getFullYear() + '/' + checkForUnderTen(month) + '/' + checkForUnderTen(date.getDate()) + " at " + transfromTime(date.getHours(), date.getMinutes());
    };
  }

  return dateFormatModule;

});
