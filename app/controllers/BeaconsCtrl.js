beaconsAdminApp.controller('BeaconsCtrl', ['$scope', '$resource', '$state', 'serverUri', '$http', 'BeaconsService', 'RulesService', 'Page', function BeaconsCtrl($scope, $resource, $state, serverUri, $http, BeaconsService, RulesService, Page) {
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

    $scope.ruleDaysOfWeek = {}


    $scope.refreshBeacons = function() {
        var beacons = BeaconResource.query(function() {
            $scope.beacons = beacons;
        });
    }

    $scope.deleteBeacon = function(beacon) {
        beacon.$delete({id: beacon.beacon_id});
        $scope.refreshBeacons();
    }

    $scope.saveBeacon = function(beacon) {
        delete  beacon.editable;
        beacon.$update({id: beacon.beacon_id}, beacon, function(data) {console.log(data)});
        $scope.refreshBeacons();
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
        $scope.refreshBeacons();
    }

    $scope.setDates = function(dayOfWeek) {
        $scope.ruleDaysOfWeek[dayOfWeek] = {};
        $scope.ruleDaysOfWeek[dayOfWeek].from = new Date();
        $scope.ruleDaysOfWeek[dayOfWeek].to = new Date();
    }

    $scope.setModal = function(beacon) {
        $scope.rules = RulesService.getRules();
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
        $scope.addRuleMode = true;

    }

    $scope.newRule = function(rule) {
        console.log(rule);
        console.log($scope.ruleDaysOfWeek);
        rule.beacon_id = $scope.currentBeacon.beacon_id;
        RulesService.newRule(rule, $scope.ruleDaysOfWeek);
    }

    $scope.dateToOpen = function(rule) {
        $scope.dateToOpened[rule] = !$scope.dateToOpened[rule];
    }

    $scope.dateFromOpen = function() {
        $scope.dateFromOpened = !$scope.dateFromOpened;
    }

    $scope.daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
}]);
