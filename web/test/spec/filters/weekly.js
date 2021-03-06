'use strict';

describe('Filter: weekly', function () {

  // load the filter's module
  beforeEach(module('webangApp'));

  // initialize a new instance of the filter before each test
  var weekly;
  beforeEach(inject(function ($filter) {
    weekly = $filter('weekly');
  }));

  it('should return empty string with null input"', function () {
    expect(weekly(null)).toBe('');
  });

   it('should return the empty string with array of false"', function () {
    var input = [
      { name: 'Mon', active: false },
      { name: 'Tue', active: false },
      { name: 'Wed', active: false },
      { name: 'Thu', active: false },
      { name: 'Fri', active: false },
      { name: 'Sat', active: false },
      { name: 'Sun', active: false }
    ];
    expect(weekly(input)).toBe('');
  });

   it('should return "Mon" string when only first elem of array is true"', function () {
    var input = [
      { name: 'Mon', active: true },
      { name: 'Tue', active: false },
      { name: 'Wed', active: false },
      { name: 'Thu', active: false },
      { name: 'Fri', active: false },
      { name: 'Sat', active: false },
      { name: 'Sun', active: false }
    ];
    expect(weekly(input)).toBe('Mon');
  });

   it('should return all days string with array of true"', function () {
    var input = [
      { name: 'Mon', active: true },
      { name: 'Tue', active: true },
      { name: 'Wed', active: true },
      { name: 'Thu', active: true },
      { name: 'Fri', active: true },
      { name: 'Sat', active: true },
      { name: 'Sun', active: true }
    ];
    expect(weekly(input)).toBe('Mon,Tue,Wed,Thu,Fri,Sat,Sun');
  });

});
