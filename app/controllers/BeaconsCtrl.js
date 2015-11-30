beaconsAdminApp.controller('BeaconsCtrl', ['$scope', '$resource', '$state', 'serverUri', '$http', 'BeaconsService', 'Page', function BeaconsCtrl($scope, $resource, $state, serverUri, $http, BeaconsService, Page) {
    Page.setTitle("Beacons");
    var BeaconResource = $resource("http://localhost:3000/api/" + 'beacon/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var RulesResource = $resource("http://localhost:3000/api/" + 'rule/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var beacons = BeaconResource.query(function() {
        $scope.beacons = beacons;
    });
    var ContentsResource = $resource("http://localhost:3000/api/" + 'content/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var contents = ContentsResource.query(function() {
        $scope.contents = contents;
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

    $scope.setModal = function(beacon) {
        var rules = RulesResource.query(function() {
            $scope.rules = rules;
        });
        $scope.currentBeacon = beacon;
    }

    $scope.deleteRule = function(rule) {
        rule.$delete({id: rule.rule_id});
        var rules = RulesResource.query(function() {
            $scope.rules = rules;
        });
    }

    $scope.saveRule = function(rule) {
        delete  rule.editable;
        rule.$update({id: rule.rule_id}, rule, function(data) {console.log(data)});
    }

    $scope.addRule = function() {
        var r = new RulesResource();
        r.editable = true;
        r.new = true;
        $scope.rules.push(r)

    }

    $scope.newRule = function(rule) {
        delete  rule.editable;
        delete  rule.new;
        rule.beacon_id = $scope.currentBeacon.beacon_id;
        console.log("SAVING RULE");
        rule.user_id = 1;
        rule.$save(rule);
    }
}]);
