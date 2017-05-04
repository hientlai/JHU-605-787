(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http','ApiBasePath']
function MenuDataService($http,ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
     return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }).then(function (result) {
        return result;
      });
  };

  service.getItemsForCategory = function (categoryShortName) {
     return $http({
        method: "GET",
        params: {category: categoryShortName},
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        return result;
      });
  };

}

})();
