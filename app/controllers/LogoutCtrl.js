beaconsAdminApp.controller('LogoutCtrl', ['$scope', '$state', '$http', 'serverUri', 'CredentialsService', function LogoutCtrl($scope, $state, $http, invoicesServiceUri, CredentialsService) {
    $http.delete(invoicesServiceUri.replace('api/', '') + 'auth', null, {withCredentials: true}).then(
        function(data) {
            CredentialsService.removeUsername();
            $state.transitionTo('login');
        },
        function(error) {
            alert('logout error');
        }
    );
}]);