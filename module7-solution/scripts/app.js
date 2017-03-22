(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .filter('tripledollarsign', TripleDollarSignFilter)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);;

// controller for to buy
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.bought = function (index) {
      ShoppingListCheckOffService.bought(index);
    }

    toBuy.validateQuantity = function (quantity) {
      try {
        toBuy.errorMessage = "";
        ShoppingListCheckOffService.validateQuantity(quantity);
      } catch (error) {
        toBuy.errorMessage = error.message;
      }
    }
  }

//controller for already bought
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.itemsBought = ShoppingListCheckOffService.getItemsBought();
    bought.totalPrice = function totalPrice(index) {
      try {
        return ShoppingListCheckOffService.totalPrice(index);
      } catch (error) {
        bought.errorMessage = error.message;
      }

    }

  }
function ShoppingListCheckOffService() {
  var service = this;
  //array of to buy items
  var itemsToBuy = [{
    name: "Milk",
    quantity: 2,
    pricePerItem: 1.2
  },
  {
    name: "Donuts",
    quantity: 200,
    pricePerItem: 0.99
  },
  {
    name: "Cookies",
    quantity: 300,
    pricePerItem: 0.5
  },
  {
    name: "Chocolate Chip Donuts",
    quantity: 350,
    pricePerItem: 0.98
  },
  {
    name: "Soda",
    quantity: 10,
    pricePerItem: 1.25
  },
  {
    name: "Chocolate",
    quantity: 5,
    pricePerItem: 0.99
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
    var item = itemsToBuy[index];
    //can buy only if the quantity is a numeric and not empty
    if (item !== undefined && item !== null && typeof item.quantity === 'number' && typeof item.pricePerItem === 'number') {
      itemsBought.push(item);
      itemsToBuy.splice(index, 1);
    }
  };

 //validate the quantity
  service.validateQuantity = function (quantity) {
    if (quantity === undefined || quantity === null || typeof quantity !== 'number')
      throw new Error("The quantity must be a numeric and not empty.");
  }
  //calculate total price
  service.totalPrice = function (index) {
    var item = itemsBought[index];
    if (item !== undefined && item !== null && typeof item.quantity === 'number' && typeof item.pricePerItem === 'number') {
      return item.quantity * item.pricePerItem;
    }else {
      throw new Error("The quantity or price per item of " + item.name + " is not number.");
    }
  };
};

//calculate total price
function totalPrice(quantity,pricePerItem){
  return quantity * pricePerItem;
};

//triple dollar sign filter. Add the triple dollar sign in front of numeric
function TripleDollarSignFilter() {
  return function (input) {
    input = input || "";
    input = "$$$" + input;
    return input;
  };
};
})();

//Javascript minification
/* Remove this and comment above code

!function(){"use strict";function t(t){var e=this;e.itemsToBuy=t.getItemsToBuy(),e.bought=function(e){t.bought(e)},e.validateQuantity=function(r){try{e.errorMessage="",t.validateQuantity(r)}catch(n){e.errorMessage=n.message}}}function e(t){var e=this;e.itemsBought=t.getItemsBought(),e.totalPrice=function(r){try{return t.totalPrice(r)}catch(n){e.errorMessage=n.message}}}function r(){var t=this,e=[{name:"Milk",quantity:2,pricePerItem:1.2},{name:"Donuts",quantity:200,pricePerItem:.99},{name:"Cookies",quantity:300,pricePerItem:.5},{name:"Chocolate Chip Donuts",quantity:350,pricePerItem:.98},{name:"Soda",quantity:10,pricePerItem:.3},{name:"Chocolate",quantity:5,pricePerItem:.99}],r=[];t.getItemsToBuy=function(){return e},t.getItemsBought=function(){return r},t.bought=function(t){var n=e[t];void 0!==n&&null!==n&&"number"==typeof n.quantity&&"number"==typeof n.pricePerItem&&(r.push(n),e.splice(t,1))},t.validateQuantity=function(t){if(void 0===t||null===t||"number"!=typeof t)throw new Error("The quantity must be a numeric and not empty.")},t.totalPrice=function(t){var e=r[t];if(void 0!==e&&null!==e&&"number"==typeof e.quantity&&"number"==typeof e.pricePerItem)return e.quantity*e.pricePerItem;throw new Error("The quantity or price per item of "+e.name+" is not number.")}}function n(){return function(t){return t=t||"",t="$$$"+t}}angular.module("ShoppingListCheckOff",[]).controller("ToBuyController",t).controller("AlreadyBoughtController",e).filter("tripledollarsign",n).service("ShoppingListCheckOffService",r),t.$inject=["ShoppingListCheckOffService"],e.$inject=["ShoppingListCheckOffService"]}();

*/
