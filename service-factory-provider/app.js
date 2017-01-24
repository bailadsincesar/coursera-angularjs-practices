/**
 * Practices of Implementation of
 * Services, Factories and Providers
 */



/**
 * PROVIDER implementation
 */

(function () {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListAddController', ShoppingListAddController)
        .controller('ShoppingListShowController', ShoppingListShowController)
        .provider('ShoppingService', ShoppingServiceProvider)
        .config(Config);


    ShoppingListAddController.$inject = ['ShoppingService'];
    function ShoppingListAddController(ShoppingService) {
        this.name = "";
        this.qty  = "";
        this.error = "";

        //var ShoppingService = new ShopingService(3);

        this.addItem = function () {
            try {
                ShoppingService.addItem(this.name, this.qty);
            } catch(error) {
                this.error = error.message;
            }
        };

        this.items = ShoppingService.getItems();

        this.removeItem = function (index) {
            ShoppingService.removeItem(index);
        }
    }

    function ShoppingListServiceFactory() {
        return function (maxItems) {
            return new ShoppingListService(maxItems);
        }
    }


    function ShoppingServiceProvider() {
        var self = this;

        self.defaults = {
            maxItems: 2
        }

        this.$get = function () {
            return new ShoppingListService(self.defaults.maxItems);
        }
    }


    function ShoppingListService(maxItems) {
        var items = []; //private property

        this.addItem = function (name, qty) {
            if ((maxItems === undefined) ||
                (maxItems != undefined && items.length < maxItems)) {

                var item = {
                    name: name,
                    qty: qty
                };

                items.push(item);

                console.log('items', items);

            } else {
                throw new Error('You reached the maximum number of ' + maxItems);
            }

        };

        this.getItems = function () {
            return items;
        };

        this.removeItem = function (index) {
            items.splice(index, 1);
        };
    }

    ShoppingListShowController.$inject = ['ShoppingService'];
    function ShoppingListShowController(ShoppingService) {
        var shoppinFactory = new ShoppingService();

        this.items = shoppinFactory.getItems();

        this.removeItem = function (index) {
            shoppinFactory.removeItem(index);
        }

    }


    Config.$inject = ['ShoppingServiceProvider']
    function Config(ShoppingServiceProvider) {
        //ShoppingServiceProvider.defaults.maxItems = 1;
    }

})();


/**
 * FACTORY implementation
 */

//(function () {
//    'use strict';
//
//    angular.module('ShoppingListApp', [])
//        .controller('ShoppingListAddController', ShoppingListAddController)
//        .controller('ShoppingListShowController', ShoppingListShowController)
//        .factory('ShoppingService', ShoppingListServiceFactory);
//
//
//    ShoppingListAddController.$inject = ['ShoppingService'];
//    function ShoppingListAddController(ShopingService) {
//        this.name = "";
//        this.qty  = "";
//        this.error = "";
//
//        var shoppingListFactory = new ShopingService(3);
//
//        this.addItem = function () {
//            try {
//                shoppingListFactory.addItem(this.name, this.qty);
//            } catch(error) {
//                this.error = error.message;
//            }
//        }
//
//        this.items = shoppingListFactory.getItems();
//
//        this.removeItem = function (index) {
//            shoppingListFactory.removeItem(index);
//        }
//    }
//
//    function ShoppingListServiceFactory() {
//        return function (maxItems) {
//            return new ShoppingListService(maxItems);
//        }
//    }
//
//    function ShoppingListService(maxItems) {
//        var items = []; //private property
//
//        this.addItem = function (name, qty) {
//            if ((maxItems === undefined) ||
//                (maxItems != undefined && items.length < maxItems)) {
//
//                var item = {
//                    name: name,
//                    qty: qty
//                };
//
//                items.push(item);
//
//                console.log('items', items);
//
//            } else {
//                throw new Error('You reached the maximum number of ' + maxItems);
//            }
//
//        };
//
//        this.getItems = function () {
//            return items;
//        };
//
//        this.removeItem = function (index) {
//            items.splice(index, 1);
//        };
//    }
//
//    ShoppingListShowController.$inject = ['ShoppingService'];
//    function ShoppingListShowController(ShoppingService) {
//        var shoppinFactory = new ShoppingService();
//
//        this.items = shoppinFactory.getItems();
//
//        this.removeItem = function (index) {
//            shoppinFactory.removeItem(index);
//        }
//
//    }
//
//
//})();


/**
 * SERVICE implementation
 */

//(function () {
//    'use strict';
//
//    angular.module('ShoppingListApp', [])
//        .controller('ShoppingListAddController', ShoppingListAddController)
//        .controller('ShoppingListShowController', ShoppingListShowController)
//        .service('ShoppingService', ShoppingListService);
//
//
//    ShoppingListAddController.$inject = ['ShoppingService'];
//    function ShoppingListAddController(ShopingService) {
//        this.name = "";
//        this.qty  = "";
//
//        this.addItem = function () {
//            ShopingService.addItem(this.name, this.qty);
//        }
//    }
//
//
//    function ShoppingListService() {
//        var items = []; //private property
//
//        this.addItem = function (name, qty) {
//            var item = {
//                name: name,
//                qty: qty
//            };
//
//            items.push(item);
//
//            console.log('items', items);
//        };
//
//        this.getItems = function () {
//            return items;
//        };
//
//        this.removeItem = function (index) {
//            items.splice(index, 1);
//        };
//    }
//
//    ShoppingListShowController.$inject = ['ShoppingService'];
//    function ShoppingListShowController(ShoppingService) {
//        this.items = ShoppingService.getItems();
//
//        this.removeItem = function (index) {
//            ShoppingService.removeItem(index);
//        }
//
//    }
//
//
//})();