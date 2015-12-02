beaconsAdminApp.service('LoginService', ['$http', 'serverUri', function($http, invoicesServiceUri) {

    this.login = function (user, pass) {
        return $http.post(invoicesServiceUri.replace('api/', '') + 'auth', {login: user, pass: pass}, {withCredentials: true});
    }
}]);