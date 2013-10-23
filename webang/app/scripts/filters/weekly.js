'use strict';

var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

angular.module('webangApp')
  .filter('weekly', function () {
    return function (input) {
     var s = [], n;
      if (!input) {
        return '';
      }
      for (n = 0; n < input.length; n += 1) {
        if (input[n]) {
          s.push(DAYS[n]);
        }
      }
      return s.join();
    };
  });
