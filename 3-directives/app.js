(function () {
    'use strict';

    angular.module('App', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listItemDescription', ListItemDescription)
    .directive('listItem', ListItem);

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;

        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();

        list.name = '';
        list.quantity = '';

        list.addItem = function () {
            shoppingList.addItem(list.name, list.quantity);
        }
    }

    function ShoppingListService() {
        var service = this;

        var items = [];

        service.addItem = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            items.push(item);
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
    }

    function ShoppingListFactory() {
        var factory = function () {
            return new ShoppingListService();
        };

        return factory;
    }

    function ListItemDescription() {
        var ddo = {
            template: '{{ item.quantity }} of {{ item.name }}'
        };

        return ddo;
    }

    function ListItem() {
        var ddo = {
            templateUrl: 'listItem.html'
        };

        return ddo;
    }



})();