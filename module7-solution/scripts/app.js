(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);;

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.bought = function (index) {
      console.log(index);
      ShoppingListCheckOffService.bought(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.itemsBought = ShoppingListCheckOffService.getItemsBought();


  }
function ShoppingListCheckOffService() {
  var service = this;
  //array of to buy items
  var itemsToBuy = [{
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }];

  //array of bought items
  var itemsBought = [];

  //get items to buy
  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  //get items bought
  service.getItemsBought = function () {
    return itemsBought;
  };

  //remove item from tobuy array and push to bought array
  service.bought = function (index) {
    itemsBought.push(itemsToBuy[index])
    itemsToBuy.splice(index, 1);
  }
};
})();

//Javascript minification
/* Remove this and comment above code

!function(){"use strict";function t(t){var e=this;e.itemsToBuy=t.getItemsToBuy(),e.bought=function(e){console.log(e),t.bought(e)}}function e(t){var e=this;e.itemsBought=t.getItemsBought()}function o(){var t=this,e=[{name:"Milk",quantity:"2"},{name:"Donuts",quantity:"200"},{name:"Cookies",quantity:"300"},{name:"Chocolate",quantity:"5"}],o=[];t.getItemsToBuy=function(){return e},t.getItemsBought=function(){return o},t.bought=function(t){o.push(e[t]),e.splice(t,1)}}angular.module("ShoppingListCheckOff",[]).controller("ToBuyController",t).controller("AlreadyBoughtController",e).service("ShoppingListCheckOffService",o),t.$inject=["ShoppingListCheckOffService"],e.$inject=["ShoppingListCheckOffService"]}();

*/
