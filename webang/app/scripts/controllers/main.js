'use strict';

var schedules = [
  {
    id: 0,
    active: true,
    program: 5,
    date: new Date(2013, 10, 24, 0, 0, 0),
    start: new Date(2013, 10, 1, 15, 30, 0, 0),
    stop: new Date(2013, 10, 1, 17, 30, 0, 0),
    weekly: [
      { name: 'Mon', active: false },
      { name: 'Tue', active: false },
      { name: 'Wed', active: false },
      { name: 'Thu', active: false },
      { name: 'Fri', active: false },
      { name: 'Sat', active: false },
      { name: 'Sun', active: false }
    ]
  },
  {
    id: 1,
    active: false,
    program: 8,
    date: new Date(2013, 11, 5, 0, 0, 0),
    start: new Date(2013, 10, 1, 18, 30, 0, 0),
    stop: new Date(2013, 10, 1, 19, 30, 0, 0),
    weekly: [
      { name: 'Mon', active: false },
      { name: 'Tue', active: true },
      { name: 'Wed', active: false },
      { name: 'Thu', active: false },
      { name: 'Fri', active: true },
      { name: 'Sat', active: false },
      { name: 'Sun', active: false }
    ]
  }
];

var config = {
  dst: false,
  tz: 1,
  // readonly
  ip: "x.x.x.x",
  curTime: new Date()
};

angular.module('webangApp')
  .controller('ScheduleListCtrl', ['$scope', function ($scope) {
    $scope.schedules = schedules;
  }])
  .controller('ScheduleDetailCtrl',
    ['$scope', '$routeParams', '$timeout', function ($scope, $routeParams, $timeout) {
    $scope.schedule = schedules[$routeParams.scheduleId];
    $scope.dateOpened = false;
    $scope.clickDate = function () {
      var f = !$scope.dateOpened;
      $timeout(function () {
        $scope.dateOpened = f;
      });
    };
  }])
  .controller('ConfigCtrl', ['$scope', function ($scope) {
    $scope.config = config;
  }])
  .controller('StatusCtrl', ['$scope', function ($scope) {
  }]);