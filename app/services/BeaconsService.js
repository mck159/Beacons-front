beaconsAdminApp.service('BeaconsService', ['$resource', '$http', 'serverUri', '$cookies', function($resource, $http, invoicesServiceUri, $cookies) {
    var BeaconResource = $resource("http://localhost:3000/api/" + 'beacon/:id',{id: "@_id"}, {update: {method : 'PUT'}});


    this.getBeacons = function () {
        console.log($cookies);
        var result;
        var beacons = BeaconResource.query(function() {
            console.log("a" + beacons);
            result = beacons;
        });

        return result;
    }
}]);