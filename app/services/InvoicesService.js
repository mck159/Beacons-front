beaconsAdminApp.service('ResourcesService', ['$http', 'serverUri', function($http, invoicesServiceUri) {

    this.getBeacons = function () {
        var invoice = $resource(serverUri + 'beacon');
        console.log(invoice.query(function(data) {

        }));
        return $http.get(invoicesServiceUri + 'invoice');
    }
}]);