beaconsAdminApp.controller('RegisterCtrl', ['$scope', '$state', '$http', 'serverUri', 'RegisterService', function RegisterCtrl($scope, $state, $http, invoicesServiceUri, RegisterService) {
    $scope.passNoMatch = false;
    $scope.register = function() {
        if($scope.user.pass != $scope.passConfirm) {
            $scope.passNoMatch = true;
            return;gi
        } else {
            $scope.passNoMatch = false;
        }
        RegisterService.register($scope.user).then(
            function(data) {
                $state.go('login', {registerRedirect: true});
            },
            function(data) {
                alert('error registering a user');
            }
        );
    }
}]);