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

//Javascript Minification - Remove below commented code for minification
/*

!function(){"use strict";function e(e,t){e.message="",e.listDishes="",e.messageclass="",e.checkLunch=function(){if(""==e.listDishes)e.message="Please enter data first",e.messageclass="text-danger";else{var t=s(e.listDishes,",");3>=t?(e.message="Enjoy!",e.messageclass="text-success"):(e.message="Too much!",e.messageclass="text-danger")}}}function s(e,s){for(var t=e.split(s),c=0,a=0;a<t.length;a++)""!=t[a].trim()&&(c+=1);return c}angular.module("LunchCheck",[]).controller("LunchCheckController",e),e.$inject=["$scope","$filter"]}();

*/
