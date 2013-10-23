'use strict';

angular.module('webangApp', [
  //'ngResource',
  //'ngSanitize'
  '$strap.directives'
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/schedules'
      });
  }]);
 