'use strict';

angular.module('webangApp', [
  //'ngResource',
  //'ngSanitize',
  'ui.bootstrap'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/schedules', {
        templateUrl: 'views/schedule-list.html',
        controller: 'ScheduleListCtrl'
      })
      .when('/schedules/:scheduleId', {
        templateUrl: 'views/schedule-detail.html',
        controller: 'ScheduleDetailCtrl'
      })
      .when('/config', {
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl'
      })
      .when('/status', {
        templateUrl: 'views/status.html',
        controller: 'StatusCtrl'
      })
      .when('/rc', {
        templateUrl: 'views/rc.html'
      })
      .otherwise({
        redirectTo: '/status'
      });
  }]);
 