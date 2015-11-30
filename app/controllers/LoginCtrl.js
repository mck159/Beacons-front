beaconsAdminApp.controller('LoginCtrl', ['$scope', 'LoginService', '$state', function LoginCtrl($scope, LoginService, $state) {
    console.log('loginctrl');
    $scope.redirect = false;
    if(window.location.href.indexOf("redirect") != -1) {
        $scope.redirect = true;
    }

    $scope.login = function() {
        LoginService.login($scope.user, $scope.pass).then(
            function(data) {
                $state.go('beacons');
            },
            function(error) {
                var errorCode = error.data.error;
                $scope.userNotExist = false;
                $scope.userBadPassword = false;
                $scope.userUnknownProblem = false;
                switch(errorCode) {
                    case 'NOEXIST':
                        $scope.userNotExist = true;
                        break;
                    case 'BADPWD':
                        $scope.userBadPassword = true;
                        break;
                    default:
                        $scope.userUnknownProblem = true;
                }
            }
        )
    }
}]);