(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.checkList = function () {
    if ( typeof($scope.list) == "undefined" || $scope.list == "" ) {
      $scope.message = "Please enter data first";
    } else {
      var elements = getElements($scope.list);
      checkElements(elements);
    }
  };

  function checkElements(array) {
    // Checks elements array lenght

    if ( array.length <= 3 ) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }
  }

  function getElements(string) {
    // Splits string into array and:
    // 1. Removes triming spaces
    // 2. Discards empty getElements

    var array = string.split(",");

    var filtered = array.filter(function (el) {
      return el.trim() != "";
    });

    return filtered;
  }

}

})();
