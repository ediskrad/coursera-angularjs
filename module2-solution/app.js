(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // Items lists
  var boughtItems = [];
  var toBuyItems = [
    {
      item_name: "Milk",
      item_quantity: "2"
    },
    {
      item_name: "Donuts",
      item_quantity: "200"
    },
    {
      item_name: "Cookies",
      item_quantity: "300"
    },
    {
      item_name: "Cream",
      item_quantity: "30"
    },
    {
      item_name: "Chocolate",
      item_quantity: "5"
    }
  ];

  service.getToBuyItems = function () {
    return toBuyItems;
  }

  service.getAlreadyBoughtItems = function () {
    return boughtItems;
  }

  service.boughtItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  }
}

})();
