beaconsAdminApp.service('LoginService', ['$http', 'serverUri', function($http, invoicesServiceUri) {

    this.login = function (user, pass) {
        return $http.post(invoicesServiceUri.replace('api/', '') + 'auth', {user: user, pass: pass}, {withCredentials: true});
    }
}]);