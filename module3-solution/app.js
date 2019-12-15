(function () {
  'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// Use HTTPS!

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrower = this;
  narrower.searchTerm = "";
  narrower.found = MenuSearchService.getItems();
  narrower.searchMenuItems = function () {
    if (narrower.searchTerm === "") {
      MenuSearchService.clear();
    } else {
      var promise = MenuSearchService.getMatchedMenuItems(narrower.searchTerm);
      promise.then(function(response) {
        narrower.found = response;
      })
      .catch(function(error) {
        console.log("Error", error);
      });
    }
  }

  narrower.removeItem = function(itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'

    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'finder',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var finder = this;

  finder.isEmpty = function() {
    if (finder.items.length === 0) {
      return true;
    }
    return false;
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm) {
    foundItems = [];
    if (searchTerm === "" || searchTerm == null) {
      return foundItems;
    }
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result) {

      var allItems = result.data.menu_items;
      var searchTermLowerCase = searchTerm.toLowerCase();

      for (var i = 0; i < allItems.length; ++i) {
        if (allItems[i].description.toLowerCase().indexOf(searchTermLowerCase) !== -1) {
          foundItems.push(allItems[i]);
        }
      }
      return foundItems;
    });
  };

  service.clear = function() {
    foundItems.splice(0, foundItems.length);
  }

  service.removeItem = function(itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.getItems = function() {
    return foundItems;
  };
}

})();
