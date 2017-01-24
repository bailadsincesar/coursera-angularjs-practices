(function () {
    'use strict';

    angular.module('ShoppingList', [])
        .controller('ListController', ListController)
        .controller('MenuController', MenuController)
        .service('EmailValidator', EmailValidatorService)
        .service('MenuCategoriesService', MenuCategoriesService);

    ListController.$inject = ['EmailValidator'];
    function ListController(EmailValidator) {
        var self = this;

        self.error = '';
        self.contacts = [];

        self.addToList = function () {
            var promise = EmailValidator.validateEmail(self.email);

            promise
            .then(function (response) {
                self.error = response.message;
                var contact = {
                    name: self.name,
                    email: self.email
                };
                self.contacts.push(contact);

            })
            .then(function (otherResponse) {

            })
            .catch(function (errorResponse) {
                self.error = errorResponse.message;

            });
        }

    }

    EmailValidatorService.$inject = ['$q', '$timeout'];
    function EmailValidatorService($q, $timeout) {
        var self = this;

        self.validateEmail = function (email) {
            console.log('enter validation');
            var deferred = $q.defer();
            console.log('after defer');
            $timeout(function () {
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var result = {
                    message: ''
                };

                if (regex.test(email)) {
                    deferred.resolve(result)

                } else {
                    result.message = 'Invalid e-email.';
                    deferred.reject(result);
                }

            }, 2000);

            return deferred.promise;

        }
    }


    MenuController.$inject = ['$scope', 'MenuCategoriesService'];
    function MenuController($scope, MenuCategoriesService) {
        var promise = MenuCategoriesService.getMenuCategories();

        promise.then(function (response) {
            console.log(response.data);
            $scope.categories = response.data;

        }).catch(function (error) {
            console.log(error.message);

        });
    }


    MenuCategoriesService.$inject = ['$http'];
    function MenuCategoriesService($http) {
        var self = this;

        self.getMenuCategories = function () {
            var response = $http({
                method: 'GET', //default is GET
                url: 'http://davids-restaurant.herokuapp.com/categories.json', //the only mandatory

            });

            // $http returns a promise, so response is a promise
            return response;
        }
    }


})();