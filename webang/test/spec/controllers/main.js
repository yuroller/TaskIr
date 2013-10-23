'use strict';

describe('Controller: ScheduleListCtrl', function () {

  // load the controller's module
  beforeEach(module('webangApp'));

  var ScheduleListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleListCtrl = $controller('ScheduleListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of schedules to the scope', function () {
    expect(scope.schedules.length).toBe(2);
  });
});
