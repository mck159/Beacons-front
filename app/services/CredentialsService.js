beaconsAdminApp.service('CredentialsService', ['$cookies', function($cookies) {
    this.getUsername = function() {
        return $cookies.get('username');
    }
    this.setUsername = function(name) {
        $cookies.put('username', name);
    }
    this.removeUsername = function() {
        $cookies.remove('username');
    }
}]);