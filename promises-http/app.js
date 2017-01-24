(function () {
    'use strict';

    angular.module('ShoppingList', [])
        .controller('ListController', ListController)
        .service('EmailValidator', EmailValidatorService);

    ListController.$inject = ['EmailValidator'];
    function ListController(EmailValidator) {
        var self = this;

        self.error = '';
        self.contacts = [];

        self.addToList = function () {
            var promise = EmailValidator.validateEmail(self.email);

            promise.then(function (response) {
                self.error = response.message;
                var contact = {
                    name: self.name,
                    email: self.email
                };
                self.contacts.push(contact);

            }).catch(function (errorResponse) {
                self.error = errorResponse.message;

            });
        }

    }

    EmailValidatorService.$inject = ['$q', '$timeout'];
    function EmailValidatorService($q, $timeout) {
        var self = this;

        self.validateEmail = function (email) {
            var deferred = $q.defer();

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


})();