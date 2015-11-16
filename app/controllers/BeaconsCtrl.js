beaconsAdminApp.controller('BeaconsCtrl', ['$scope', '$resource', '$state', 'serverUri', '$http', 'BeaconsService', function BeaconsCtrl($scope, $resource, $state, serverUri, $http, BeaconsService) {
    var BeaconResource = $resource("http://localhost:3000/" + 'beacon/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var BeaconContentResource = $resource("http://localhost:3000/" + 'beacon/:short_id',{id: "@_id"}, {update: {method : 'PUT'}});
    var beacons = BeaconResource.query(function() {
        $scope.beacons = beacons;
    });
    $scope.deleteBeacon = function(beacon) {
        beacon.$delete({id: beacon.beacon_id});
        var beacons = BeaconResource.query(function() {
            $scope.beacons = beacons;
        });
    }

    $scope.saveBeacon = function(beacon) {
        delete  beacon.editable;
        beacon.$update({id: beacon.beacon_id}, beacon, function(data) {console.log(data)});
    }

    $scope.addBeacon = function() {
        var b = new BeaconResource();
        b.editable = true;
        b.new = true;
        $scope.beacons.push(b)

    }

    $scope.newBeacon = function(beacon) {
        delete  beacon.editable;
        delete  beacon.new;
        console.log("SAVING BEACON");
        beacon.user_id = 1;
        beacon.$save(beacon);
    }

    console.log()

    $scope.setModal = function(beacon) {
        console.log("set modal");
        $scope.beaconContent = beacon;
    }
}]);
