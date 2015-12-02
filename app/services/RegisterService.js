beaconsAdminApp.service('RegisterService', ['$http', 'serverUri', function($http, invoicesServiceUri) {

    this.register = function (user) {
        return $http.post(invoicesServiceUri.replace('api/', '') + 'user', user);
    }
}]);