(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

//Directive for foundItems
  function FoundItemsDirective() {
   var ddo = {
     templateUrl: 'foundItems.html',
     scope: {
      found: '<',
      searchTerm: '@',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true,
    link: FoundItemsDirectiveLink
   };

   return ddo;
 }
 function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  scope.$watch('ctrl.isError()', function (newValue, oldValue) {

      if(newValue === true) {
        displayError(element);
      }
      else {
        removeError(element);
      }
  });

}
 //NarrowItDownDirective Controller
 function NarrowItDownDirectiveController(){
  var ctrl = this;
  ctrl.isError = function () {
    if(ctrl.found == undefined || (ctrl.searchTerm !== undefined && ctrl.found != undefined && ctrl.searchTerm.length> 0 && ctrl.found.length > 0)){
      return false;
    }else{
      return true;
    }
  };
 }
 function displayError(element) {
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }


  function removeError(element) {
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }
 // controller for NarrorItDownController
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    var searchTerm  = "";
    var found = [];
    ctrl.getMatchedMenuItems = function(){
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

      promise.then(function (foundItems) {
        ctrl.found = foundItems;
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    ctrl.removeItem = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };

  };


  //MenuSearchService
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems= function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];
        var menuItems = result.data.menu_items;
        if(searchTerm != "" && searchTerm !== undefined && menuItems && menuItems !== undefined){
          for(var i = 0; i < menuItems.length; i++){
            if(menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())){
              foundItems.push(menuItems[i])
            }
          }
        }
        // return processed items
        return foundItems;
      });

    };




  }

})();

//Javascript minification
/* Remove this and comment above code


*/
