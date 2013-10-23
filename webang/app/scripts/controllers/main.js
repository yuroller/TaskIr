'use strict';

var schedules = [
  {
    id: 0,
    active: true,
    program: 5,
    start: new Date(2013, 10, 30, 15, 30, 0, 0),
    stop: new Date(2013, 10, 30, 17, 30, 0, 0),
    weekly: [false, false, false, false, false, false, false],
  },
  {
    id: 1,
    active: false,
    program: 8,
    start: new Date(2013, 11, 5, 18, 30, 0, 0),
    stop: new Date(2013, 11, 5, 19, 30, 0, 0),
    weekly: [false, false, true, false, false, false, false],
  }
];

var config = {
  dst: false,
  tz: 1
};

angular.module('webangApp')
  .controller('ScheduleListCtrl', ['$scope', function ($scope) {
    $scope.schedules = schedules;
  }])
  .controller('ScheduleDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.schedule = schedules[$routeParams.scheduleId];
  }])
  .controller('ConfigCtrl', ['$scope', function ($scope) {
    $scope.config = config;
  }])
  .controller('AboutCtrl', ['$scope', function ($scope) {
  }]);
