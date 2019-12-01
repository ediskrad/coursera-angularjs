(function () {
  'use strict';
  angular.module('NameCalculator', [])

  .controller('NameCalculatorController', function ($scope) {
    $scope.name = "";
    $scope.totalValue = 0;

    $scope.displayNumeric = function () {
      $scope.totalValue = calculateNumericForString($scope.name);
    };
  });

  function calculateNumericForString(string) {
    var totalStringValue = 0;
    for (var i = 0; i < string.length; i++) {
      totalStringValue += string.charCodeAt(i);
    }

    return totalStringValue;
  }

  var x1 = function () {
    return "Blah!";
  };

  var x2 = x1();

  function x3(arg) {
    return arg; // Ha-ha! That's all I do!
  }

  var x4 = x3(x1);

  var x5 = x3(x2);

  var x6 = x3(x1());
  console.log(x1);
  console.log("---");
  console.log(x2);
  console.log("---");
  console.log(x3);
  console.log("---");
  console.log(x4);
  console.log("---");
  console.log(x5);
  console.log("---");
  console.log(x6);


})();
