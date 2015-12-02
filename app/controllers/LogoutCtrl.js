beaconsAdminApp.controller('LogoutCtrl', ['$scope', '$state', '$http', 'serverUri', function LogoutCtrl($scope, $state, $http, invoicesServiceUri) {
    $http.delete(invoicesServiceUri.replace('api/', '') + 'auth', null, {withCredentials: true}).then(
        function(data) {
            $state.transitionTo('login');
        },
        function(error) {
            alert('logout error');
        }
    );
}]);