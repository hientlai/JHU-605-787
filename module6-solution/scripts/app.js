(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];
  function LunchCheckController($scope, $filter) {
    $scope.message = "";
    $scope.listDishes = "";
    $scope.messageclass = "";

    $scope.checkLunch = function () {
      if($scope.listDishes == ""){
        $scope.message = "Please enter data first";
        $scope.messageclass = "text-danger";
      }else {
        var numberOfDishes = numberOfItems($scope.listDishes,",");
        if(numberOfDishes <= 3){
          $scope.message = "Enjoy!";
          $scope.messageclass = "text-success";
        }else {
          $scope.message = "Too much!";
          $scope.messageclass = "text-danger";
        }
      }



    };

  }
  function numberOfItems(list,seperator) {
     var arrayOfStrings = list.split(seperator);
     var size = 0;
     for (var i = 0; i < arrayOfStrings.length; i++) {
       if(arrayOfStrings[i].trim() != "")
          size +=1;
     }
     return size;
  }
})();
