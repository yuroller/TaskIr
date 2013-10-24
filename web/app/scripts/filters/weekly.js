'use strict';

angular.module('webangApp')
  .filter('weekly', function () {
    return function (input) {
     var s = [], item, n;
      if (!input) {
        return '';
      }
      for (n = 0; n < input.length; n += 1) {
        item = input[n];
        if (item.active) {
          s.push(item.name);
        }
      }
      return s.join();
    };
  });
