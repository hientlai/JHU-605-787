(function () {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService)
.constant('ApiBasePath', "https://hientlai-course5.herokuapp.com");

SignUpService.$inject = ['$http', 'ApiBasePath'];
function SignUpService($http, ApiBasePath) {
  var service = this;
  service.item = {};

  service.setUser = function(newUser){
    service.user = newUser;
  };

  service.getUser = function(){
    return service.user;
  };

  service.getFavoriteDish = function(){
    return service.item;
  };

  service.isRegistered = function(){
    if(service.user != undefined){
      return true;
    }
    return false;
  };

 //validate favories dish
  service.validateFavoriesDish = function(shortName){
    return $http({
        method: "GET",
        url: (ApiBasePath + '/menu_items/' + shortName + '.json')
      }).then(
              function (response) {
                service.item = response.data;
                return true;
              },
              function(response){
                return false;
              }
        );
  };
}
})();
