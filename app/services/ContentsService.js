beaconsAdminApp.service('BeaconsService', ['$resource', '$http', 'serverUri', function($resource, $http, invoicesServiceUri) {
    var BeaconResource = $resource("http://localhost:3000/" + 'beacon/:id',{id: "@_id"}, {update: {method : 'PUT'}});


    this.getBeacons = function () {
        var result;
        var beacons = BeaconResource.query(function() {
            console.log("a" + beacons);
            result = beacons;
        });

        return result;
    }
}]);