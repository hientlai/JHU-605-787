(function () {
'use strict';

var publicapp = angular.module('public');
publicapp.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService']
function SignUpController(SignUpService) {
  var signup = this;

  signup.submit = function () {

    SignUpService.validateFavoriesDish(signup.user.dish).then(function(response){
      if(response == true){
        signup.badItem = false;
        signup.completed = true;
        SignUpService.setUser(signup.user);
      }
      else{
        signup.badItem = true;
      }
    });
  };

  // check if registered
  signup.isRegistered = function() {
    return SignUpService.isRegistered();
  };

 //get user information
  signup.getUser = function() {
    return SignUpService.getUser();
  };

 //get favorite dish
  signup.getFavoriteDish = function() {
    return SignUpService.getFavoriteDish();
  };
};

publicapp.directive('favoritedishcheck', ['$q','$timeout','$http',function($q,$timeout,$http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.favoritedishcheck = function(modelValue, viewValue) {

      var def = $q.defer();
      $timeout(function() {
        $http({
            method: "GET",
            url: ('https://hientlai-course5.herokuapp.com/menu_items/' + modelValue + '.json')
          }).then(
                  function (response) {
                    def.resolve();
                  },
                  function(response){
                     def.reject();
                  }
            );
      }, 1000);

      return def.promise;
      };
    }
  }
}]);
})();
